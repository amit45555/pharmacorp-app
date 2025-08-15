import React, { useState } from "react";
import styles from "../pages/ConfirmLoginModal/ConfirmLoginModal.module.css";

interface ConfirmLoginModalProps {
  username: string;
  onConfirm: (username: string, password: string) => void;
  onCancel: () => void;
}

const ConfirmLoginModal = ({ username, onConfirm, onCancel }: ConfirmLoginModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }
    setError("");
    onConfirm(username, password);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Admin Confirmation</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            disabled
            style={{ background: "#f3f3f3", color: "#888" }}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
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
