import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./AccessRequestModal.module.css";

const AccessRequestDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, step } = useParams();
  const request = location.state?.request;

  if (!request) {
    return <div className={styles.modal}>No request data found.</div>;
  }

  const handleAccept = () => {
    // TODO: Implement accept logic (API call etc.)
    alert(`Request ${id} accepted!`);
    navigate(-1);
  };

  const handleReject = () => {
    // TODO: Implement reject logic (API call etc.)
    alert(`Request ${id} rejected!`);
    navigate(-1);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
         {/* Close Cross Button */}
    <button
      className={styles.closeBtn}
      style={{
        position: "absolute",
        top: "1.2rem",
        right: "1.2rem",
        background: "#1e88e5",
        color: "#fff",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        fontSize: "1.25rem",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 2,
      }}
      aria-label="Close"
      title="Close"
      onClick={() => navigate(-1)}
    >
      &#10006;
    </button>

    

        <h2>Access Request Details {step ? `(Approver ${step})` : ""}</h2>
        <table className={styles.detailsTable}>
          <tbody>
            {Object.entries(request).map(([key, value]) => (
              <tr key={key}>
                <td className={styles.label}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </td>
                <td className={styles.value}>{String(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <button
            className={styles.closeBtn}
            style={{ background: "#43a047" }}
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className={styles.closeBtn}
            style={{ background: "#e53935" }}
            onClick={handleReject}
          >
            Reject
          </button>
        
          
        </div>
        
   
      </div>
    </div>
  );
};

export default AccessRequestDetails;
