import React from "react";
import { useFormContext } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import styles from "./ReviewSubmit.module.css";
import Stepper from "../../components/Stepper/Stepper";
import { formSteps, FormField } from "../../data/formFields";

const ReviewSubmit: React.FC = () => {
  const { data } = useFormContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/generate-credentials");
  };

  // Gather all fields from previous steps
  const reviewFields: FormField[] = formSteps
    .filter((step: { step: number }) => step.step === 1 || step.step === 2)
    .flatMap((step: { fields: FormField[] }) => step.fields);

  const recordData: Record<string, any> = data as Record<string, any>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PharmaCorp</h1>
      <p className={styles.subtitle}>User Access Management System</p>

      <div style={{ marginBottom: "2rem" }}>
        <Stepper
          steps={formSteps.map((s: { title: string }) => s.title)}
          currentStep={2}
        />
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Review & Submit</h2>
        {reviewFields.map((field: FormField) => (
          <div className={styles.reviewItem} key={field.name}>
            <strong>{field.label}:</strong>{" "}
            {Array.isArray(recordData[field.name]) ? (
              <ul className={styles.list}>
                {recordData[field.name].map((v: string) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            ) : (
              recordData[field.name] || <span style={{ color: "#aaa" }}>-</span>
            )}
          </div>
        ))}
        <button className={styles.submitButton} type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ReviewSubmit;
