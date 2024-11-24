import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../axiosConfig";

const fetchDocumentById = async (uid, etag) => {
  try {
    const response = await axiosInstance.get(`/documents/${uid}`, {
      headers: {
        ...(etag && { "If-None-Match": etag }),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 304) {
      return null;
    } else {
      throw error;
    }
  }
};

const useDocument = (uid) => {
  const [etag, setEtag] = useState(null);

  const { data, isLoading, isError } = useQuery(
    ["document", uid],
    async () => {
      const data = await fetchDocumentById(uid, etag);
      return data;
    },
    {
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data && data.etag) {
          setEtag(data.etag);
          localStorage.setItem(`document-etag-${uid}`, data.etag);
        }
      },
      onError: (error) => {
        console.error("Failed to fetch document:", error);
      },
    }
  );

  return { data, isLoading, isError };
};
export default useDocument;
