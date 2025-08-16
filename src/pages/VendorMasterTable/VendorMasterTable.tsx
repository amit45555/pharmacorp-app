import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VendorMasterTable.module.css";
// ...existing code...
import { VendorContext } from "../../context/VendorContext";
import { FaEdit, FaTrash, FaRegClock } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

// Unified type for vendor users
export type VendorUser = {
  id?: number;
  username?: string;
  password?: string;
  role?: string;
  permissions?: string[];
  fullName: string;
  email: string;
  empCode: string;
  department: string;
  status: string;
  plants: string[];
  centralPermission: boolean;
  comment: string;
  corporateAccessEnabled: boolean;
  activityLogs?: any[];
};

const VendorMasterTable: React.FC = () => {
  const navigate = useNavigate();
  const { vendors, updateVendor } = useContext(VendorContext);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [activeLogValue, setActiveLogValue] = useState<any[]>([]);

  const handleAdd = () => {
    navigate("/add-vendor", {
      state: {
        initialData: null,
        mode: "add",
      },
    });
  };

  const handleEdit = () => {
    if (selectedRow === null) return;
    const user = vendors[selectedRow];
    navigate(`/edit-vendor/${selectedRow}`, {
      state: {
        initialData: {
          fullName: user.fullName,
          email: user.email,
          empCode: user.empCode,
          department: user.department,
          status: user.status,
          plants: user.plants,
          centralPermission: user.centralPermission,
          comment: user.comment,
          corporateAccessEnabled: user.corporateAccessEnabled,
          permissions: { vendor: user.permissions || [] },
        },
        mode: "edit",
      },
    });
  };

  const handleDelete = () => {
    if (selectedRow === null) return;
    // Remove vendor from context
    // ...existing code...
    updateVendor({ ...vendors[selectedRow], status: "Inactive" });
    setSelectedRow(null);
  };

  const handleSelectRow = (idx: number) => {
    setSelectedRow(idx === selectedRow ? null : idx);
  };

  // Remove unused handleSave and editUser

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(18);
    doc.text("Vendor Master Table", 14, 18);
    const headers = [
      [
        "Full Name",
        "Email",
        "Employee Code",
        "Department",
        "Status",
        "Plants",
        "Central Permission",
        "Corporate Access",
        "Comment",
      ],
    ];
    const rows = vendors.map((user) => [
      user.fullName,
      user.email,
      user.empCode,
      user.department,
      user.status,
      user.plants.join(", "),
      user.centralPermission ? "Yes" : "No",
      user.corporateAccessEnabled ? "Enabled" : "Disabled",
      user.comment,
    ]);
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
        fillColor: [33, 118, 210],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 245, 255] },
      margin: { left: 14, right: 14 },
      tableWidth: "auto",
    });
    doc.save("vendor-master-table.pdf");
  };

  return (
    <div className={styles.container}>
      {/* Top header */}
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>Vendor Master</h2>
        <div className={styles["header-icons"]}>
          <span className={styles["header-icon"]}>PDF</span>
        </div>
      </header>

      {/* Table controls */}
      <div className={styles.headerTopRow}>
        <div className={styles.actionHeaderRow}>
          <button className={styles.addBtn} onClick={handleAdd}>
            + Add Vendor
          </button>
          <button className={styles.filterBtn} disabled>
            🔍 Filter
          </button>
          <button
            className={`${styles.btn} ${styles.editBtn}`}
            disabled={selectedRow === null}
            onClick={handleEdit}
            title="Edit selected vendor"
          >
            <FaEdit size={14} /> Edit
          </button>
          <button
            className={`${styles.btn} ${styles.deleteBtn}`}
            disabled={selectedRow === null}
            onClick={handleDelete}
            title="Delete selected vendor"
          >
            <FaTrash size={14} /> Delete
          </button>
          <button
            className={`${styles.btn} ${styles.exportPdfBtn}`}
            onClick={handleDownloadPdf}
            aria-label="Export table to PDF"
            type="button"
          >
            <span role="img" aria-label="Export PDF" style={{ fontSize: 18 }}>
              🗎
            </span>
            PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.roleTableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Employee Code</th>
              <th>Department</th>
              <th>Status</th>
              <th>Plants</th>
              <th>Central Permission</th>
              <th>Corporate Access</th>
              <th>Comment</th>
              <th style={{ textAlign: "center" }}>Activity Logs</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ textAlign: "center", color: "#888" }}>
                  No vendors found.
                </td>
              </tr>
            ) : (
              vendors.map((user, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      className={styles.radioInput}
                      type="radio"
                      checked={selectedRow === idx}
                      onChange={() => handleSelectRow(idx)}
                      aria-label={`Select ${user.fullName}`}
                    />
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.empCode}</td>
                  <td>{user.department}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        user.status === "Active"
                          ? styles.active
                          : styles.inactive
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.plants?.join(", ")}</td>
                  <td>{user.centralPermission ? "Yes" : "No"}</td>
                  <td>
                    {user.corporateAccessEnabled ? "Enabled" : "Disabled"}
                  </td>
                  <td>{user.comment}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      className={styles.activityLogIcon}
                      title="View Activity Logs"
                      onClick={() => {
                        setActiveLogValue(user.activityLogs || []);
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

      {/* Activity Log Modal */}
      {showActivityLogModal && (
        <div className={styles.activityLogModalOverlay}>
          <div className={styles.activityLogModal}>
            <div className={styles.activityLogModalHeader}>
              <span>Activity Logs</span>
              <button
                className={styles.activityLogModalClose}
                onClick={() => setShowActivityLogModal(false)}
                title="Close"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className={styles.activityLogModalBody}>
              {activeLogValue.length > 0 ? (
                activeLogValue.map((log, idx) => (
                  <div key={idx} className={styles.activityLogContent}>
                    <strong>{log.action}</strong> - {log.user || log.approver}{" "}
                    <span>
                      (
                      {log.dateTime
                        ? log.dateTime
                        : log.time
                        ? format(
                            typeof log.time === "string"
                              ? new Date(log.time)
                              : log.time,
                            "dd/MM/yyyy HH:mm"
                          )
                        : ""}
                      )
                    </span>
                    <div style={{ fontSize: 13, color: "#888" }}>
                      {log.reason}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: "#888", fontStyle: "italic" }}>
                  No activity logs available.
                </div>
              )}
            </div>
          </div>
          <div
            className={styles.activityLogModalBackdrop}
            onClick={() => setShowActivityLogModal(false)}
          />
        </div>
      )}

      {/* Add/Edit Panel removed: now handled by route navigation */}
    </div>
  );
};

// ...existing code...
export default VendorMasterTable;
