import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../../axiosConfig";

const fetchDocuments = async (page, perPage, etag, search) => {
  try {
    const response = await axiosInstance.get("/documents", {
      params: {
        page,
        page_size: perPage,
        search: search || "",
      },
      headers: {
        ...(etag && { "If-None-Match": etag }),
      },
    });

    const receivedETag = response.headers["etag"];
    return { data: response.data, etag: receivedETag };
  } catch (error) {
    if (error.response && error.response.status === 304) {
      return null;
    } else {
      throw error;
    }
  }
};

const useDocuments = (page, perPage) => {
  const queryClient = useQueryClient();
  const [etag, setEtag] = useState(
    localStorage.getItem(`documents-etag-page-${page}`) || null
  );

  const { data, isLoading, isError } = useQuery(
    ["documents", page, perPage],
    async () => {
      const result = await fetchDocuments(page, perPage, etag);
      return result ? result.data : null;
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 24,
      onSuccess: (result) => {
        if (result && result.etag) {
          setEtag(result.etag);
          localStorage.setItem(`documents-etag-page-${page}`, result.etag);
          queryClient.invalidateQueries(["documents", page, perPage]);
        }
      },
      onError: (error) => {
        console.error("Failed to fetch documents:", error);
      },
    }
  );

  return { data, isLoading, isError };
};

export default useDocuments;
