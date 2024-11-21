import React, { useEffect, useState } from "react";
import { fetchDocuments, deleteDocumentById } from "../../api/documents";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import DataTable from "react-data-table-component";
import { Spinner } from "../../utils/Spinner";
const DocumentList = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const { data, isLoading, isError } = useQuery(
    ["documents", page],
    () => fetchDocuments(page),
    { keepPreviousData: true }
  );
  const deleteMutation = useMutation(deleteDocumentById, {
    onSuccess: () => {
      toast.success("Document deleted successfully");
      queryClient.invalidateQueries("documents");
    },
    onError: () => {
      toast.error("Failed to delete document");
    },
  });

  const columns = [
    {
      name: "Process Number",
      selector: (row) => row.process_number,
      sortable: true,
    },
    {
      name: "Tribunal",
      selector: (row) => row.tribunal,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date || "N/A",
      sortable: true,
    },
    {
      name: "Decision",
      selector: (row) => row.decision || "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          <button
            className="btn-icon bg-primary-subtle text-primary"
            title="view"
            onClick={() => navigate(`/document/${row.id}`)}
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className="btn-icon bg-danger-subtle text-danger"
            title="delete"
            onClick={() => deleteMutation.mutate(row.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading documents</p>;

  return (
    <div className="container">
      <h1 className="my-4 text-center">Court Rulings</h1>
      <div className="mx-auto">
        <DataTable
          columns={columns}
          data={data.results}
          pagination
          paginationServer
          paginationTotalRows={data.count}
          onChangePage={(page) => setPage(page)}
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default DocumentList;
