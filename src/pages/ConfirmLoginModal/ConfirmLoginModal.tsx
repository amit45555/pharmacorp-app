// ConfirmLoginModal.tsx
import React, { useState } from "react";
import styles from "../ConfirmLoginModal/ConfirmLoginModal.module.css";

interface ConfirmLoginModalProps {
  onConfirm: (userId: string, password: string) => void;
  onCancel: () => void;
}

const ConfirmLoginModal = ({ onConfirm, onCancel }: ConfirmLoginModalProps) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Admin Confirmation</h3>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
          <button onClick={() => onConfirm(userId, password)} className={styles.submitBtn}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLoginModal;
