import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./AccessRequestModal.module.css";

const AccessRequestDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
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
        <h2>Access Request Details</h2>
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
          <button className={styles.closeBtn} onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessRequestDetails;
