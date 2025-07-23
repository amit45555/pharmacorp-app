import React from "react";
import { useFormContext } from "../../context/FormContext";
import styles from "./ReviewSubmit.module.css";

const ReviewSubmit: React.FC = () => {
  const { data } = useFormContext();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PharmaCorp</h1>
      <p className={styles.subtitle}>User Access Management System</p>

      <div className={styles.stepper}>
        <div className={`${styles.step} ${styles.completed}`}>1</div>
        <div className={`${styles.step} ${styles.completed}`}>2</div>
        <div className={`${styles.step} ${styles.active}`}>3</div>
        <div className={styles.step}>4</div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.formTitle}>Review & Submit</h2>
        <div className={styles.reviewItem}>
          <strong>Access Request Types:</strong>
          <ul className={styles.list}>
            {data.accessTypes.map((type: string) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
        <div className={styles.reviewItem}>
          <strong>Training Status:</strong> {data.trainingStatus}
        </div>
        <div className={styles.reviewItem}>
          <strong>Equipment ID:</strong> {data.equipmentId}
        </div>
        <div className={styles.reviewItem}>
          <strong>Application Name:</strong> {data.appName}
        </div>
        <div className={styles.reviewItem}>
          <strong>Role:</strong> {data.role}
        </div>
        <div className={styles.reviewItem}>
          <strong>Version:</strong> {data.version}
        </div>
        <button className={styles.submitButton}>Submit Request</button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
