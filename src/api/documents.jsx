import axiosInstance from "../../axiosConfig";

export const fetchDocuments = async (page = 1) => {
  const response = await axiosInstance.get(`/documents/?page=${page}`);
  return response.data;
};

export const fetchDocumentById = async (id) => {
  const response = await axiosInstance.get(`/documents/${id}/`);
  return response.data;
};

export const deleteDocumentById = async (id) => {
  await axiosInstance.delete(`/documents/${id}/`);
};
