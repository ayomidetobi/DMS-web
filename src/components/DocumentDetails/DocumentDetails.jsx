import { useParams, useNavigate, Navigate } from "react-router-dom";

import useDocument from "../../hooks/useDocument.jsx";
import { getHighlightedText } from "../../utils/HighlightEntities.jsx";
import ParsedContent from "../../utils/ParseContent.jsx";
import { Spinner } from "../../utils/Spinner.jsx";

import DocumentInformation from "./DocumentInformation.jsx";
import EntitiesList from "./EntitiesList.jsx";

const DocumentDetail = () => {
  const { uid } = useParams();
  const navigate = useNavigate();

  const { data: document, isLoading, isError } = useDocument(uid);

  if (isLoading) return <Spinner />;
  if (isError) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="container my-4 ">
      <button
        className="btn text-primary bg-primary-subtle"
        onClick={() => navigate("/")}
      >
        Back to List
      </button>
      <div className="card">
        <div className="card-header">
          <h5>Document Details</h5>
        </div>
        <div className="card-body p-5">
          <DocumentInformation document={document} />
          <ParsedContent
            mainText={document.main_text}
            entities={document.entities}
            getHighlightedText={getHighlightedText}
          />
          <EntitiesList entities={document.entities} />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
