import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../axiosConfig";

const fetchDocumentById = async (uid) => {
  try {
    const url = `/documents/${uid}`;
    const storedEtag = localStorage.getItem(`etag-${url}`);

    const response = await axiosInstance.get(url, {
      headers: {
        ...(storedEtag && { "If-None-Match": storedEtag }),
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 304) {
      // If not modified, return null so we use cached data
      return null;
    } else {
      throw error;
    }
  }
};

const useDocument = (uid) => {
  const { data, isLoading, isError } = useQuery(
    ["document", uid],
    () => fetchDocumentById(uid),
    {
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      onSuccess: (result) => {
        if (result && result.etag) {
          // Store ETag with a unique key based on the request URL
          localStorage.setItem(`/documents/${uid}`, result.etag);
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
