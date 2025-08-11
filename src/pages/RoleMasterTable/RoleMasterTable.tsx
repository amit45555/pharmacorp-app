import React, { useState } from "react";
import styles from "./RoleMasterTable.module.css";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AddRolePanel from "../AddRolePanel/AddRolePanel"; // Use your actual import!

interface Role {
  name: string;
  description: string;
  status: string;
}

const initialRoles: Role[] = [
  { name: "Read Only", description: "View access to system data", status: "ACTIVE" },
  { name: "User", description: "Standard user access with edit capabilities", status: "ACTIVE" },
  { name: "Administrator", description: "Full administrative access", status: "ACTIVE" },
  { name: "Super Admin", description: "Complete system control", status: "ACTIVE" },
  { name: "Operator", description: "Operational access for daily tasks", status: "ACTIVE" },
];

export default function RoleMasterTable() {
  // Table data
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Add/Edit panel
  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<"add" | "edit">("add");
  const [editRoleIdx, setEditRoleIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Role>({ name: "", description: "", status: "ACTIVE" });

  // === 🟦 NEW FILTER PANE STATE ===
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterColumn, setFilterColumn] = useState<"name"|"description"|"status">("name");
  const [filterValue, setFilterValue] = useState("");

  // Table controls
  const handleAddRole = () => {
    setPanelMode("add");
    setEditRoleIdx(null);
    setForm({ name: "", description: "", status: "ACTIVE" });
    setShowPanel(true);
  };

  const handleEditRole = (idx: number) => {
    setPanelMode("edit");
    setEditRoleIdx(idx);
    setForm({ ...roles[idx] });
    setShowPanel(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClosePanel = () => setShowPanel(false);

  const handleSave = () => {
    if (panelMode === "add") {
      setRoles([...roles, form]);
    } else if (panelMode === "edit" && editRoleIdx !== null) {
      const updated = [...roles];
      updated[editRoleIdx] = form;
      setRoles(updated);
    }
    setShowPanel(false);
  };

  const handleDelete = (idx: number) => {
    const updated = [...roles];
    updated.splice(idx, 1);
    setRoles(updated);
    setExpandedRow(null);
  };

  // -=-=-=- 🟦 Filter logic (only column/value) -=-=-=-
  const filteredRoles = roles.filter(role => {
    if (!filterValue) return true;
    const val = filterValue.toLowerCase();

    if (filterColumn === "name") return role.name.toLowerCase().includes(val);
    if (filterColumn === "description") return role.description.toLowerCase().includes(val);
    if (filterColumn === "status") return role.status.toLowerCase().includes(val);
    return true;
  });

  return (
    <div>
      {/* Top header */}
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>Role Master</h2>
        <div className={styles["header-icons"]}>
          <span className={styles["header-icon"]}><NotificationsIcon fontSize="small" /></span>
          <span className={styles["header-icon"]}><SettingsIcon fontSize="small" /></span>
        </div>
      </header>
      
      {/* Table controls */}
      <div className={styles.headerTopRow}>
        <button
          className={styles.filterBtn}
          onClick={() => setShowFilterPanel(true)}
        >
          🔍 Filter
        </button>
        <button className={styles.addUserBtn} onClick={handleAddRole}>
          + Add Role
        </button>
      </div>

      {/* 🟩 FILTER PANEL (UI matches your screenshot) */}
      {showFilterPanel && (
        <div className={styles.advancedFilterOverlay}>
          <div className={styles.advancedFilterPanel}>
            <div className={styles.advancedFilterHeader}>
              <span>Advanced Filter</span>
              <button
                type="button"
                style={{ background: 'none', border: 'none', fontSize: 18, cursor: "pointer" }}
                onClick={() => setShowFilterPanel(false)}
                aria-label="Close"
              >✕</button>
            </div>
            <div className={styles.advancedFilterRow}>
              <label>Column</label>
              <select
                value={filterColumn}
                onChange={e => setFilterColumn(
                  e.target.value as "name" | "description" | "status"
                )}
              >
                <option value="name">Name</option>
                <option value="description">Description</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className={styles.advancedFilterRow}>
              <label>Value</label>
              <input
                type="text"
                placeholder={`Enter ${filterColumn}`}
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                className={styles.saveBtn}
                onClick={() => setShowFilterPanel(false)}
                type="button"
              >Apply</button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setFilterValue("");
                  setShowFilterPanel(false);
                }}
                type="button"
              >Clear</button>
            </div>
          </div>
          <div
            className={styles.advancedFilterBackdrop}
            onClick={() => setShowFilterPanel(false)}
          />
        </div>
      )}

      {/* Table */}
      <div className={styles.roleTableContainer}>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                  No roles found.
                </td>
              </tr>
            ) : (
              filteredRoles.map((role, idx) => (
                <tr key={idx}>
                  <td><input type="checkbox" /></td>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>
                    <span className={`${styles.status} ${styles.active}`}>{role.status}</span>
                  </td>
                  <td>
                    {expandedRow === idx ? (
                      <div className={styles.inlineMenu}>
                        <button className={`${styles.btn} ${styles.gray}`} onClick={() => handleEditRole(idx)}>
                          <FaEdit size={14} /> Edit
                        </button>
                        <button className={`${styles.btn} ${styles.red}`} onClick={() => handleDelete(idx)}>
                          <FaTrash size={14} /> Delete
                        </button>
                        <button className={`${styles.btn} ${styles.blue}`}>
                          <FaEye size={14} /> View
                        </button>
                      </div>
                    ) : (
                      <span onClick={() => setExpandedRow(idx)} title="Show Actions" className={styles.icon}>
                        <FaEye size={17} />
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Slide-in Panel */}
      <AddRolePanel
        open={showPanel}
        title={panelMode === "add" ? "Add Role" : "Edit Role"}
        onClose={handleClosePanel}
      >
        <form className={styles.roleForm} onSubmit={e => { e.preventDefault(); handleSave(); }}>
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
              {panelMode === "add" ? "Add" : "Update"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={handleClosePanel}>Cancel</button>
          </div>
        </form>
      </AddRolePanel>
    </div>
  );
}
