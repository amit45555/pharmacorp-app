// src/pages/UserInformation/UserInformation.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInformation.module.css";

const UserInformation: React.FC = () => {
  const [requestType, setRequestType] = useState("Self");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Optionally validate form here...

    // Redirect to the next step (e.g., Access Details page)
    navigate("/access-details");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PharmaCorp</h1>
      <p className={styles.subtitle}>User Access Management System</p>

      <div className={styles.stepper}>
        <div className={`${styles.step} ${styles.active}`}>1</div>
        <div className={styles.step}>2</div>
        <div className={styles.step}>3</div>
        <div className={styles.step}>4</div>
      </div>

      <h2 className={styles.formTitle}>User Information & Request Type</h2>
      <p className={styles.instruction}>
        Please provide basic user information and specify the request type.
      </p>

      <div className={styles.requestType}>
        {["Self", "Others", "Vendor/OEM"].map((type) => (
          <button
            key={type}
            type="button"
            className={`${styles.requestButton} ${
              requestType === type ? styles.selected : ""
            }`}
            onClick={() => setRequestType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>User Name *</label>
        <input type="text" placeholder="Start typing to search directory..." required />

        <label>Employee Code *</label>
        <input type="text" placeholder="Enter or search employee code" required />

        <label>Location *</label>
        <input type="text" placeholder="Start typing location..." required />

        <label>Department *</label>
        <input type="text" placeholder="Start typing department..." required />

        <button type="submit" className={styles.continueButton}>
          Continue ⤵
        </button>
      </form>
    </div>
  );
};

export default UserInformation;
