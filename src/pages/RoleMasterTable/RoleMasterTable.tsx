import React, { useState } from "react";
import styles from "./RoleMasterTable.module.css";
import {
  FaEdit, FaTrash, FaEye, FaTimes, FaRegClock
} from "react-icons/fa";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AddRolePanel from "../AddRolePanel/AddRolePanel"; // Use your actual import!

interface Role {
  name: string;
  description: string;
  status: string;
  activityLogs: string;
}

const initialRoles: Role[] = [
  { name: "Read Only", description: "View access to system data", status: "ACTIVE", activityLogs: "Viewed by Admin" },
  { name: "User", description: "Standard user access with edit capabilities", status: "ACTIVE", activityLogs: "Edited 2 days ago" },
  { name: "Administrator", description: "Full administrative access", status: "ACTIVE", activityLogs: "Created on Aug 1" },
  { name: "Super Admin", description: "Complete system control", status: "ACTIVE", activityLogs: "No recent actions" },
  { name: "Operator", description: "Operational access for daily tasks", status: "INACTIVE", activityLogs: "Logged in today" },
];

// ===== Activity Logs Modal Component =====
function ActivityLogModal({ open, value, onClose }: { open: boolean; value: string; onClose: () => void; }) {
  if (!open) return null;
  return (
    <div className={styles.activityLogModalOverlay}>
      <div className={styles.activityLogModal}>
        <div className={styles.activityLogModalHeader}>
          <span>Activity Logs</span>
          <button
            className={styles.activityLogModalClose}
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.activityLogModalBody}>
          {value && <div className={styles.activityLogContent}>{value}</div>}
          {!value && <div style={{ color: "#888", fontStyle: "italic" }}>No activity logs available.</div>}
        </div>
      </div>
      <div className={styles.activityLogModalBackdrop} onClick={onClose} />
    </div>
  );
}

export default function RoleMasterTable() {
  // Table data
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Add/Edit panel
  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<"add" | "edit">("add");
  const [editRoleIdx, setEditRoleIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Role>({
    name: "",
    description: "",
    status: "ACTIVE",
    activityLogs: ""
  });

  // Filter pane state (unchanged)
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterColumn, setFilterColumn] = useState<"name"|"description"|"status"|"activityLogs">("name");
  const [filterValue, setFilterValue] = useState("");

  // Activity logs modal state
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [activeLogValue, setActiveLogValue] = useState<string>("");

  // Table controls
  const handleAddRole = () => {
    setPanelMode("add");
    setEditRoleIdx(null);
    setForm({ name: "", description: "", status: "ACTIVE", activityLogs: "" });
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

  // Filter logic
  const filteredRoles = roles.filter(role => {
    if (!filterValue) return true;
    const val = filterValue.toLowerCase();
    if (filterColumn === "name") return role.name.toLowerCase().includes(val);
    if (filterColumn === "description") return role.description.toLowerCase().includes(val);
    if (filterColumn === "status") return role.status.toLowerCase().includes(val);
    if (filterColumn === "activityLogs") return role.activityLogs.toLowerCase().includes(val);
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

      {/* Filter Panel (unchanged) */}
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
                  e.target.value as "name" | "description" | "status" | "activityLogs"
                )}
              >
                <option value="name">Name</option>
                <option value="description">Description</option>
                <option value="status">Status</option>
                <option value="activityLogs">Activity Logs</option>
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
              <th style={{ textAlign: "center" }}>Activity Logs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
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
                    <span
                      className={
                        `${styles.status} ${role.status === "ACTIVE"
                          ? styles.active
                          : styles.inactive}`
                      }
                    >
                      {role.status}
                    </span>
                  </td>
                  {/* Activity Logs column with icon */}
                  <td style={{ textAlign: "center" }}>
                    <span
                      className={styles.activityLogIcon}
                      title="View Activity Logs"
                      onClick={() => {
                        setActiveLogValue(role.activityLogs);
                        setShowActivityLogModal(true);
                      }}
                      tabIndex={0}
                    >
                      <FaRegClock size={17} />
                    </span>
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

      {/* Activity Logs Modal */}
      <ActivityLogModal
        open={showActivityLogModal}
        value={activeLogValue}
        onClose={() => setShowActivityLogModal(false)}
      />

      {/* Add/Edit Panel (existing) */}
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
