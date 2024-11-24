import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { useNavigate, Navigate } from "react-router-dom";

import useDeleteDocument from "../../hooks/useDeleteDocument";
import useDocuments from "../../hooks/useDocuments";
import showDeleteConfirmation from "../../utils/DeleteConfirmation";
import { Spinner } from "../../utils/Spinner";

import { getColumns } from "./DocumentTable";
import OrderingDropdown from "./OrderingDropdown";
const DocumentList = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState("");
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteDocument();

  const { data, isLoading, isError } = useDocuments(
    page,
    perPage,
    "",
    ordering
  );
  const handleDeleteDocument = (documentId) => {
    showDeleteConfirmation(() => deleteMutation.mutate(documentId));
  };

  const columns = getColumns(navigate, handleDeleteDocument);

  if (isError) {
    return <Navigate to="/404" />;
  }
  const handleOrderChange = (selectedOrder) => {
    setOrdering(selectedOrder);
    setPage(1);
  };

  const orderingOptions = [
    { value: "", label: "Default" },
    { value: "date", label: "Date Ascending" },
    { value: "-date", label: "Date Descending" },
    { value: "process_number", label: "Process Number Ascending" },
    { value: "-process_number", label: "Process Number Descending" },
  ];

  return (
    <div className="container">
      <h1 className="my-4 text-center">Court Rulings</h1>
      <OrderingDropdown
        options={orderingOptions}
        selectedOrder={ordering}
        onOrderChange={handleOrderChange}
      />
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
