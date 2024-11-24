import { useQuery, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../../axiosConfig";

const fetchDocuments = async (page, perPage, search, orderin) => {
  try {
    const url = `/documents?page=${page}&page_size=${perPage}&search=${search || ""}?ordering=${orderin}`;
    const storedEtag = localStorage.getItem(`etag-${url}`);

    const response = await axiosInstance.get("/documents", {
      params: {
        page,
        page_size: perPage,
        search: search || "",
        ordering: orderin || "",
      },
      headers: {
        ...(storedEtag && { "If-None-Match": storedEtag }),
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

const useDocuments = (page, perPage, search, orderin) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["documents", page, perPage, search, orderin],
    () => fetchDocuments(page, perPage, search, orderin),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 24,
      onSuccess: (result) => {
        if (result && result.etag) {
          localStorage.setItem(
            `/documents?page=${page}&page_size=${perPage}&search=${search}?ordering=${orderin}`,
            result.etag
          );
          queryClient.invalidateQueries([
            "documents",
            page,
            perPage,
            search,
            orderin,
          ]);
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
