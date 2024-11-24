import PropTypes from "prop-types";

const DocumentInformation = ({ document }) => (
  <div className="card-body p-5">
    <h5 className="card-title">{document.process_number}</h5>
    <div className="card-text">
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
    </div>
  </div>
);

DocumentInformation.propTypes = {
  document: PropTypes.shape({
    process_number: PropTypes.string.isRequired,
    tribunal: PropTypes.string.isRequired,
    date: PropTypes.string,
    summary: PropTypes.string,
    decision: PropTypes.string,
    descriptors: PropTypes.string,
  }).isRequired,
};

export default DocumentInformation;
