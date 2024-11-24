import { toast } from "react-toastify";

const showDeleteConfirmation = (onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this document?</p>
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-secondary me-2" onClick={closeToast}>
            No
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              onConfirm();
              closeToast();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};

export default showDeleteConfirmation;
