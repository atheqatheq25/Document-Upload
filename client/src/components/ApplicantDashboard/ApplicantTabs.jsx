import { FaTrash } from "react-icons/fa";
import "./ApplicantTabs.css";

const ApplicantTabs = ({
  applicants,
  activeApplicantId,
  onSelectApplicant,
  onDeleteApplicant,
}) => {
  return (
    <div className="applicant-tabs">
      {applicants.map((applicant) => (
        <div
          key={applicant.id}
          className={`applicant-tab ${
            activeApplicantId === applicant.id ? "active-tab" : ""
          }`}
          onClick={() => onSelectApplicant(applicant.id)}
        >
          <span className="applicant-name">{applicant.name}</span>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteApplicant(applicant.id);
            }}
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ApplicantTabs;
