// src/components/documents/columnsConfig.js
export const getColumns = (navigate, showDeleteConfirmation) => [
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
          onClick={() => navigate(`/document/${row.uid}`)}
        >
          <i className="bi bi-eye"></i>
        </button>
        <button
          className="btn-icon bg-danger-subtle text-danger"
          title="delete"
          onClick={() => showDeleteConfirmation(row.uid)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    ),
  },
];
