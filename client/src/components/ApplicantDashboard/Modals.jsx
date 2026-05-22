import {
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./Modals.css";

export const AddApplicantModal = ({
  show,
  value,
  onChange,
  onSave,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="modal-title">Add Applicant</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="mt-4">
          <label className="input-label">Name</label>
          <input
            type="text"
            className="form-control applicant-input"
            value={value}
            onChange={onChange}
          />
        </div>

        <div className="d-flex justify-content-end mt-5 gap-3">
          <button className="btn save-btn" onClick={onSave}>
            <FaCheck className="me-2" /> Save
          </button>
          <button className="btn cancel-btn" onClick={onClose}>
            <FaTimes className="me-2" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const AddDocumentModal = ({
  show,
  value,
  onChange,
  onSave,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="modal-title">Add Document</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="mt-4">
          <label className="input-label">Document Name</label>
          <input
            type="text"
            className="form-control applicant-input"
            value={value}
            onChange={onChange}
          />
        </div>

        <div className="d-flex justify-content-end mt-5 gap-3">
          <button className="btn save-btn" onClick={onSave}>
            <FaCheck className="me-2" /> Save
          </button>
          <button className="btn cancel-btn" onClick={onClose}>
            <FaTimes className="me-2" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
