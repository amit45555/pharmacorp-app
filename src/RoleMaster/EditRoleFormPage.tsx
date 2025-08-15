import React, { useState, useEffect } from "react";
import styles from "../RoleMaster/AddRoleFormPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRoles, Role } from "../RoleMaster/RolesContext";

export default function EditRoleFormPage() {
  const { roles, setRoles } = useRoles();
  const navigate = useNavigate();
  const { idx } = useParams<{ idx: string }>();

  const [form, setForm] = useState<Role>({
    name: "",
    description: "",
    status: "ACTIVE",
    activityLogs: ""
  });

  useEffect(() => {
    // Load role data into form
    if (idx && roles[parseInt(idx)]) {
      setForm(roles[parseInt(idx)]);
    }
  }, [idx, roles]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idx === undefined) return;
    const updated = [...roles];
    updated[parseInt(idx)] = form;
    setRoles(updated);
  navigate("/superadmin", { state: { activeTab: "role" } });
  };

  const handleCancel = () => navigate("/superadmin", { state: { activeTab: "role" } });

  return (
    <div style={{ maxWidth: 440, margin: "30px auto", padding: 24, background: "#fff", borderRadius: 10, boxShadow: "0 0 16px rgba(40,70,120,.09)" }}>
      <h2 style={{ marginBottom: 20, color: "#2563eb" }}>Edit Role</h2>
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
          <button type="submit" className={styles.saveBtn} onClick={handleSubmit}>Update</button>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
