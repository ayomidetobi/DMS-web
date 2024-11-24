import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { useNavigate, Navigate } from "react-router-dom";

import useDeleteDocument from "../../hooks/useDeleteDocument";
import useDocuments from "../../hooks/useDocuments";
import showDeleteConfirmation from "../../utils/DeleteConfirmation";
import { Spinner } from "../../utils/Spinner";

import { getColumns } from "./DocumentTable";
const DocumentList = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteDocument();

  const { data, isLoading, isError } = useDocuments(page, perPage);
  const handleDeleteDocument = (documentId) => {
    showDeleteConfirmation(() => deleteMutation.mutate(documentId));
  };

  const columns = getColumns(navigate, handleDeleteDocument);

  if (isError) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">Court Rulings</h1>
      <div className="mx-auto">
        <DataTable
          columns={columns}
          data={isLoading ? [] : data.results}
          pagination
          paginationServer
          paginationTotalRows={isLoading ? 0 : data.count}
          highlightOnHover
          striped
          progressPending={isLoading}
          progressComponent={<Spinner />}
          onChangePage={(newPage) => setPage(newPage)}
          onChangeRowsPerPage={(newPerPage) => {
            setPage(1);
            queryClient.invalidateQueries(["documents", newPerPage]);
          }}
          onRowClicked={(row) => navigate(`/document/${row.uid}`)}
        />
      </div>
    </div>
  );
};

export default DocumentList;
