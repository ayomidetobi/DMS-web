import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchDocumentById } from "../../api/documents.jsx";
import { toast } from "react-toastify";
import { Spinner } from "../../utils/Spinner.jsx";

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: document,
    isLoading,
    isError,
  } = useQuery(["document", id], () => fetchDocumentById(id), {
    onError: () => {
      toast.error("Failed to fetch document details");
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading document details</p>;

  return (
    <div className="container my-4 ">
      <div className="card">
        <div className="card-header">
          <h5>Document Details</h5>
        </div>
        <div className="card-body p-5">
          <h5 className="card-title">{document.process_number}</h5>
          <p className="card-text">
            <strong>Tribunal:</strong> {document.tribunal}
            <br />
            <strong>Date:</strong> {document.date || "N/A"}
            <br />
            <strong>Summary:</strong> {document.summary}
            <br />
            <strong>Decision:</strong> {document.decision}
            <br />
            <strong>Descriptors:</strong> {document.descriptors}
            <br />
            <strong>Main Text:</strong>
            <p>{document.main_text}</p>
          </p>
          <button
            className="btn text-primary bg-primary-subtle"
            onClick={() => navigate("/")}
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
