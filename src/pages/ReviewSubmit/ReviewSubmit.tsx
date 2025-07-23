import React, { useEffect, useState } from "react";
import { useFormContext } from "../../context/FormContext";
import { checkUserActiveStatus } from "../../utils/zingApi";
import { useNavigate } from "react-router-dom";
import styles from "./ReviewSubmit.module.css";
import Stepper from "../../components/Stepper/Stepper";
import { formSteps, FormField } from "../../data/formFields";

const ReviewSubmit: React.FC = () => {
  const { data } = useFormContext();
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<
    "active" | "inactive" | "checking"
  >("checking");

  useEffect(() => {
    const checkStatus = async () => {
      setUserStatus("checking");
      const status = await checkUserActiveStatus(data.employeeCode || "");
      setUserStatus(status);
    };
    checkStatus();
    // eslint-disable-next-line
  }, [data.employeeCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/generate-credentials");
  };

  // Gather all fields from previous steps
  const reviewFields: FormField[] = formSteps.flatMap((step) => step.fields);

  // Add credential info if present in context (simulate as extra fields)
  const credentialFields = [
    { name: "userId", label: "User ID" },
    { name: "password", label: "Generated Password" },
    { name: "requestId", label: "Request ID" },
    { name: "approvedAt", label: "Approved At" },
    { name: "validUntil", label: "Valid Until" },
  ];

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
        {/* Zing HR status check */}
        {userStatus === "inactive" && (
          <div style={{ color: "#c00", marginBottom: 12, fontWeight: 500 }}>
            Warning: This user is marked as <b>inactive</b> in Zing HR. You
            cannot submit a request for an inactive user.
          </div>
        )}
        <h2 className={styles.formTitle}>Review & Submit</h2>
        {/* Request Status */}
        <div style={{ marginBottom: "1.2rem" }}>
          <strong>Status:</strong> {recordData.requestStatus || "draft"}
        </div>
        {/* Logs Timeline */}
        {Array.isArray(recordData.logs) && recordData.logs.length > 0 && (
          <div style={{ marginBottom: "1.2rem" }}>
            <strong>Logs:</strong>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {recordData.logs.map((log: any, idx: number) => (
                <li key={idx} style={{ fontSize: 13, color: "#555" }}>
                  <span style={{ color: "#888", fontSize: 12 }}>
                    {new Date(log.timestamp).toLocaleString()}:
                  </span>{" "}
                  {log.message}
                </li>
              ))}
            </ul>
          </div>
        )}
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
        {/* Show credential info if present */}
        {credentialFields.map((field) =>
          recordData[field.name] ? (
            <div className={styles.reviewItem} key={field.name}>
              <strong>{field.label}:</strong>{" "}
              {field.name === "password" ? "••••••••" : recordData[field.name]}
            </div>
          ) : null
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={userStatus === "inactive" || userStatus === "checking"}
          >
            {userStatus === "checking"
              ? "Checking user status..."
              : "Submit Request"}
          </button>
          <button
            type="button"
            className={styles.submitButton}
            style={{
              background: "#eee",
              color: "#007f86",
              border: "1.5px solid #5ac9d8",
            }}
            onClick={() => navigate("/track-request")}
          >
            Track Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewSubmit;
