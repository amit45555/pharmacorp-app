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
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

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

  // Filter pane state
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterColumn, setFilterColumn] = useState<"name"|"description"|"status"|"activityLogs">("name");
  const [filterValue, setFilterValue] = useState("");

  // Activity logs modal state
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [activeLogValue, setActiveLogValue] = useState<string>("");

  // Handle Add/Edit/Delete controls
  const handleAddRole = () => {
    setPanelMode("add");
    setEditRoleIdx(null);
    setForm({ name: "", description: "", status: "ACTIVE", activityLogs: "" });
    setShowPanel(true);
  };
  const handleEditRole = () => {
    if (selectedRow === null) return;
    setPanelMode("edit");
    setEditRoleIdx(selectedRow);
    setForm({ ...roles[selectedRow] });
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

  const handleDeleteRole = () => {
    if (selectedRow === null) return;
    const updated = [...roles];
    updated.splice(selectedRow, 1);
    setRoles(updated);
    setSelectedRow(null);
  };

  // Row selection logic
  const handleSelectRow = (idx: number) => {
    setSelectedRow(idx === selectedRow ? null : idx);
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

  // Show info modal for "View"
  const handleViewRole = () => {
    if (selectedRow === null) return;
    alert(`Role Details:\n\nName: ${roles[selectedRow].name}\nDescription: ${roles[selectedRow].description}\nStatus: ${roles[selectedRow].status}\nActivity Logs: ${roles[selectedRow].activityLogs}`);
  };

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
        <div className={styles.actionHeaderRow}>
         <button className={styles.addUserBtn} onClick={handleAddRole}>
          + Add Role
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => setShowFilterPanel(true)}
        >
          🔍 Filter
        </button>
       
        {/*---------- Actions Row (header wide controls) ----------*/}
      
          <button
            className={`${styles.btn} ${styles.editBtn}`}
            disabled={selectedRow === null}
            onClick={handleEditRole}
            title="Edit selected role"
          >
            <FaEdit size={14} /> Edit
          </button>
          <button
            className={`${styles.btn} ${styles.deleteBtn}`}
            disabled={selectedRow === null}
            onClick={handleDeleteRole}
            title="Delete selected role"
           
          >
            <FaTrash size={14} /> Delete
          </button>
         
        </div>
        {/*-------------------------------------------------------*/}
      </div>

      {/* Filter Panel (unchanged) */}
{showFilterPanel && (
  <div className={styles.advancedFilterOverlay}>
    <div className={styles.advancedFilterPanel}>
      <div className={styles.advancedFilterHeader}>
        <span>Advanced Filter</span>
        <button
          type="button"
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
      <div className="filterActions">
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
              <th></th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Activity Logs</th>
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
                  {/* Select row checkbox */}
                  <td>
                    <input
                      type="radio"
                      checked={selectedRow === idx}
                      onChange={() => handleSelectRow(idx)}
                      aria-label={`Select ${role.name}`}
                    />
                  </td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ActivityLogModal
        open={showActivityLogModal}
        value={activeLogValue}
        onClose={() => setShowActivityLogModal(false)}
      />

      {/* Add/Edit Panel */}
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
