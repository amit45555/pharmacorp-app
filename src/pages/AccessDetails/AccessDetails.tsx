import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccessDetails.module.css";


const accessOptions = [
  "New user creation",
  "Modify access",
  "Activate/enable user access",
  "De-activation/disable user access",
  "Password reset",
  "Account unlock",
  "Bulk de-activation",
  "Bulk new user creation",
];

const AccessDetails: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAccessTypes, setSelectedAccessTypes] = useState<string[]>([]);
  const [trainingStatus, setTrainingStatus] = useState<string>("");

  const handleAccessTypeClick = (option: string) => {
    setSelectedAccessTypes((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here, e.g., save to context or navigate
    navigate("/review-submit");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>PharmaCorp</h1>
        <p className={styles.subtitle}>User Access Management System</p>

        <div className={styles.stepper}>
          <div className={`${styles.step} ${styles.completed}`}>1</div>
          <div className={`${styles.step} ${styles.active}`}>2</div>
          <div className={styles.step}>3</div>
          <div className={styles.step}>4</div>
        </div>

        <h2 className={styles.formTitle}>System Access Details</h2>
        <p className={styles.instruction}>
          Specify the type of access and system requirements.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Access Request Type *</label>
          <div className={styles.checkboxGrid}>
            {accessOptions.map((option) => (
              <label key={option} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={selectedAccessTypes.includes(option)}
                  onChange={() => handleAccessTypeClick(option)}
                />
                {option}
              </label>
            ))}
          </div>

          <label>Equipment/Instrument ID</label>
          <input type="text" placeholder="Enter equipment or instrument ID" />

          <label>Application/Equipment Name *</label>
          <input
            type="text"
            required
            placeholder="Start typing application name..."
          />

          <label>Role *</label>
          <select required>
            <option value="">Select role...</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="viewer">Viewer</option>
          </select>

          <label>Application Version</label>
          <select>
            <option value="">Select version...</option>
            <option value="v1">v1.0</option>
            <option value="v2">v2.0</option>
          </select>

          <label>Training Completeness *</label>
          <div className={styles.trainingOptions}>
            <button
              type="button"
              className={`${styles.trainingButton} ${
                trainingStatus === "yes" ? styles.completedTraining : ""
              }`}
              onClick={() => setTrainingStatus("yes")}
            >
              ✅ Yes - Training completed
            </button>
            <button
              type="button"
              className={`${styles.trainingButton} ${
                trainingStatus === "no" ? styles.pendingTraining : ""
              }`}
              onClick={() => setTrainingStatus("no")}
            >
              ❌ No - Training pending
            </button>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button type="submit" className={styles.continueButton}>
              Continue ⤳
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccessDetails;
