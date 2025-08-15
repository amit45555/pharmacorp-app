import React, { useState } from "react";
import ConfirmLoginModal from "../components/Common/ConfirmLoginModal";
import styles from "../RoleMaster/AddRoleFormPage.module.css";
import { useNavigate } from "react-router-dom";
import { useRoles } from "../RoleMaster/RolesContext";
import type { Role } from "../RoleMaster/RolesContext";
export default function AddRoleFormPage() {
  const { roles, setRoles } = useRoles();
  const navigate = useNavigate();

    const [form, setForm] = useState<Role>({
    name: "",
    description: "",
    status: "ACTIVE",
    activityLogs: ""
  });


  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // Modal state
  const [showModal, setShowModal] = useState(false);
  // Get logged-in username from localStorage
  const username = localStorage.getItem("username") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); // Show admin confirmation modal
  };

  // Called after admin confirms
  const handleConfirmLogin = (data: Record<string, string>) => {
    // For demo: check userId matches logged-in username and password is not empty
    if (data.username === username && data.password) {
      setRoles([...roles, form]);
      setShowModal(false);
      navigate("/superadmin", { state: { activeTab: "role" } });
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  
  // Update cancel to go back to SuperAdmin with sidebar selected
  const handleCancel = () => navigate("/superadmin", { state: { activeTab: "role" } });

  return (
    <div style={{ maxWidth: 440, margin: "30px auto", padding: 24, background: "#fff", borderRadius: 10, boxShadow: "0 0 16px rgba(40,70,120,.09)" }}>
      <h2 style={{ marginBottom: 20, color: "#2563eb" }}>Add Role</h2>
      <form className={styles.roleForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Role Name</label>
          <input name="name" value={form.name} onChange={handleFormChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <input name="description" value={form.description} onChange={handleFormChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleFormChange}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.saveBtn}>
            Add
          </button>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      {showModal && (
        <ConfirmLoginModal
          title="Confirm Add Role"
          description="Please confirm adding this role by entering your password."
          username={username}
          onConfirm={handleConfirmLogin}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
