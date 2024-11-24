// src/hooks/useDeleteDocument.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteDocumentById } from "../api/documents";

const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteDocumentById, {
    onSuccess: () => {
      toast.success("Document deleted successfully");
      queryClient.invalidateQueries(["documents"]);
    },
    onError: () => {
      toast.error("Failed to delete document");
    },
  });
};

export default useDeleteDocument;
