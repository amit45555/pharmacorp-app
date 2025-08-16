import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "../RoleMasterTable/RoleMasterTable.module.css";
import { FaEdit, FaTrash, FaTimes, FaRegClock } from "react-icons/fa";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useRoles, Role } from "../../RoleMaster/RolesContext";

// ===== Activity Logs Modal Component =====
function ActivityLogModal({
  open,
  value,
  onClose,
}: {
  open: boolean;
  value: string;
  onClose: () => void;
}) {
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
          {value ? (
            Array.isArray(value)
              ? value.map((log, idx) => (
                  <div key={idx} className={styles.activityLogContent}>{log}</div>
                ))
              : value.split(/\r?\n|\r|,/).map((log, idx) => (
                  <div key={idx} className={styles.activityLogContent}>{log.trim()}</div>
                ))
          ) : (
            <div style={{ color: "#888", fontStyle: "italic" }}>
              No activity logs available.
            </div>
          )}
        </div>
      </div>
      <div className={styles.activityLogModalBackdrop} onClick={onClose} />
    </div>
  );
}

export default function RoleMasterTable() {
  const { roles, setRoles } = useRoles();
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterColumn, setFilterColumn] = useState<
    "name" | "description" | "status" | "activityLogs"
  >("name");
  const [filterValue, setFilterValue] = useState("");
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [activeLogValue, setActiveLogValue] = useState<string>("");

  const navigate = useNavigate();


  const handleAddRole = () => {
    navigate("/add-role");
  };

  // PDF Download Handler
  const handleDownloadPdf = () => {
 const doc = new jsPDF({ orientation: "landscape" });
    
    
    
  // Title
  

  // Headers as in your table/image
  const  headers = [[
    "Role Name",
    "Description",
    "Status",
    
  ]];

  // Body using your filteredRoles (for search/filter support)
  const rows = filteredRoles.map(role => [
    role.name,
    role.description,
    role.status,
   
  ]);


    // Title
    doc.setFontSize(18);
    doc.text("Role Master Table", 14, 18);

;

autoTable(doc, {
     head: headers,
      body: rows,
      startY: 28,
      styles: {
        fontSize: 11,
        cellPadding: 3,
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [11, 99, 206],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 245, 255],
      },
      margin: { left: 14, right: 14 },
      tableWidth: "auto",
    });
  doc.save("role-master-table.pdf");
};

  const handleEditRole = () => {
    
    if (selectedRow === null) return;
  navigate(`/edit-role/${selectedRow}`);
  };

  const handleDeleteRole = () => {
    if (selectedRow === null) return;
    const updated = [...roles];
    updated.splice(selectedRow, 1);
    setRoles(updated);
    setSelectedRow(null);
  };

  const handleSelectRow = (idx: number) => {
    setSelectedRow(idx === selectedRow ? null : idx);
  };

  const filteredRoles = roles.filter((role: Role) => {
    if (!filterValue) return true;
    const val = filterValue.toLowerCase();
    if (filterColumn === "name") return role.name.toLowerCase().includes(val);
    if (filterColumn === "description")
      return role.description.toLowerCase().includes(val);
    if (filterColumn === "status")
      return role.status.toLowerCase().includes(val);
    if (filterColumn === "activityLogs")
      return role.activityLogs.toLowerCase().includes(val);
    return true;
  });

  return (
    <div>
      {/* Top header */}
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>Role Master</h2>
        <div className={styles["header-icons"]}>
          <span className={styles["header-icon"]}>
            <NotificationsIcon fontSize="small" />
          </span>
          <span className={styles["header-icon"]}>
            <SettingsIcon fontSize="small" />
          </span>
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
          <button
                className={`${styles.btn} ${styles.exportPdfBtn}`} 
                 onClick={handleDownloadPdf}
                aria-label="Export table to PDF"
                type="button"
              >
                <span
                  role="img"
                  aria-label="Export PDF"
                  style={{ fontSize: 18 }}
                >
                  🗎
                </span>
                PDF
              </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className={styles.advancedFilterOverlay}>
          <div className={styles.advancedFilterPanel}>
            <div className={styles.advancedFilterHeader}>
              <span>Advanced Filter</span>
              <button
                type="button"
                onClick={() => setShowFilterPanel(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className={styles.advancedFilterRow}>
              <label>Column</label>
              <select
                value={filterColumn}
                onChange={(e) =>
                  setFilterColumn(
                    e.target.value as
                      | "name"
                      | "description"
                      | "status"
                      | "activityLogs"
                  )
                }
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
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            <div className="filterActions">
              <button
                className={styles.saveBtn}
                onClick={() => setShowFilterPanel(false)}
                type="button"
              >
                Apply
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setFilterValue("");
                  setShowFilterPanel(false);
                }}
                type="button"
              >
                Clear
              </button>
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
              filteredRoles.map((role: Role, idx: number) => (
                <tr key={idx}>
                  <td>
                    <input
                      className={styles.radioInput}
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
                        `${styles.status} ${
                          role.status === "ACTIVE"
                            ? styles.active
                            : styles.inactive
                        }`
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
    </div>
  );
}