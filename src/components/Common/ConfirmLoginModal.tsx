import React, { useState } from "react";
import styles from "./ConfirmLoginModal.module.css";


interface ConfirmLoginModalProps {
  title?: string;
  description?: string;
  username?: string;
  fields?: Array<{
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
  }>;
  activityType?: string;
  onConfirm: (data: Record<string, string>) => void;
  onCancel: () => void;
}


const ConfirmLoginModal = ({
  title = "Admin Confirmation",
  description = "Please confirm your action by entering the required details.",
  username,
  fields = [
    { name: "password", label: "Password", type: "password", required: true, placeholder: "Enter Password" }
  ],
  activityType,
  onConfirm,
  onCancel
}: ConfirmLoginModalProps) => {
  const [form, setForm] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach(f => { initial[f.name] = ""; });
    if (username) initial.username = username;
    return initial;
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const field of fields) {
      if (field.required && !form[field.name]) {
        setError(`${field.label} is required`);
        return;
      }
    }
    setError("");
    // Optionally add activityType for logging
    const data = { ...form };
    if (activityType) data.activityType = activityType;
    onConfirm(data);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{description}</p>
        <form onSubmit={handleSubmit}>
          {username && (
            <>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                disabled
                style={{ background: "#f3f3f3", color: "#888" }}
              />
            </>
          )}
          {fields.map(field => (
            <React.Fragment key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                autoFocus={field.name === "password"}
              />
            </React.Fragment>
          ))}
          {error && <div style={{ color: "#e74c3c", marginTop: 6 }}>{error}</div>}
          <div className={styles.actions} style={{ marginTop: 18 }}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.submitBtn}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmLoginModal;
