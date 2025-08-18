import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VendorMasterTable.module.css";
import { VendorContext } from "../../context/VendorContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

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
  // PDF Export for Main Table
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
    const rows = (vendors && vendors.length > 0 ? vendors : sampleVendors).map(
      (user) => [
        user.fullName,
        user.email,
        user.empCode,
        user.department,
        user.status,
        user.plants.join(", "),
        user.centralPermission ? "Yes" : "No",
        user.corporateAccessEnabled ? "Enabled" : "Disabled",
        user.comment,
      ]
    );
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
  const navigate = useNavigate();
  const { vendors, updateVendor } = useContext(VendorContext);
  // Sample vendor data for testing activity log
  const sampleVendors = [
    {
      fullName: "Acme Pharma Pvt Ltd",
      email: "contact@acmepharma.com",
      empCode: "VEND001",
      department: "Procurement",
      status: "Active",
      plants: ["GOA", "Mumbai"],
      centralPermission: true,
      comment: "Preferred vendor for chemicals",
      corporateAccessEnabled: true,
      activityLogs: [
        {
          action: "Add",
          oldValue: "-",
          newValue: "Vendor Added",
          approver: "Admin1",
          dateTime: "2025-08-10T09:30:00",
          reason: "New vendor onboarded",
        },
        {
          action: "Edit",
          oldValue: "Department: Procurement",
          newValue: "Department: Supply Chain",
          approver: "Admin2",
          dateTime: "2025-08-12T11:15:00",
          reason: "Department updated for new contract",
        },
        {
          action: "Delete",
          oldValue: "Status: Active",
          newValue: "Status: Inactive",
          approver: "SuperAdmin",
          dateTime: "2025-08-15T14:45:00",
          reason: "Vendor removed due to compliance issue",
        },
      ],
    },
    {
      fullName: "Zenith Labs",
      email: "info@zenithlabs.com",
      empCode: "VEND002",
      department: "Quality Assurance",
      status: "Inactive",
      plants: ["Delhi"],
      centralPermission: false,
      comment: "Quality vendor, currently inactive",
      corporateAccessEnabled: false,
      activityLogs: [
        {
          action: "Add",
          oldValue: "-",
          newValue: "Vendor Added",
          approver: "Admin1",
          dateTime: "2025-08-05T10:00:00",
          reason: "Added for QA supplies",
        },
        {
          action: "Edit",
          oldValue: "Status: Active",
          newValue: "Status: Inactive",
          approver: "Admin2",
          dateTime: "2025-08-16T16:20:00",
          reason: "Vendor marked inactive after contract end",
        },
      ],
    },
  ];
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [activeLogValue, setActiveLogValue] = useState<any[]>([]);

  // PDF Export for Activity Log
  const handleExportActivityLogPdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const fileName = `VendorActivityLog_${yyyy}-${mm}-${dd}.pdf`;
    const headers = [
      [
        "Action",
        "Old Value",
        "New Value",
        "Approved By/Rejected By",
        "Date/Time (IST)",
        "Comments",
      ],
    ];
    const rows = (activeLogValue || []).map((log) => {
      let dateObj = new Date(log.dateTime || "");
      let istDate = new Date(dateObj.getTime() + 5.5 * 60 * 60 * 1000);
      let day = String(istDate.getDate()).padStart(2, "0");
      let month = String(istDate.getMonth() + 1).padStart(2, "0");
      let year = String(istDate.getFullYear()).slice(-2);
      let hours = String(istDate.getHours()).padStart(2, "0");
      let minutes = String(istDate.getMinutes()).padStart(2, "0");
      let formattedDate = log.dateTime
        ? `${day}/${month}/${year} ${hours}:${minutes}`
        : "-";
      return [
        log.action || "-",
        log.oldValue !== undefined ? log.oldValue : "-",
        log.newValue !== undefined ? log.newValue : "-",
        log.approver || log.user || "-",
        formattedDate,
        log.reason || "-",
      ];
    });
    doc.setFontSize(18);
    doc.text("Vendor Activity Log", 14, 18);
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
    doc.save(fileName);
  };

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
    updateVendor({ ...vendors[selectedRow], status: "Inactive" });
    setSelectedRow(null);
  };

  const handleSelectRow = (idx: number) => {
    setSelectedRow(idx === selectedRow ? null : idx);
  };

  const handleShowActivityLog = (logs: any[]) => {
    setActiveLogValue(Array.isArray(logs) ? logs : []);
    setShowActivityLogModal(true);
  };

  const vendorList = vendors && vendors.length > 0 ? vendors : sampleVendors;

  return (
    <div>
      {/* Top header */}
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>Vendor Master</h2>
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
          <button className={styles.addUserBtn} onClick={handleAdd}>
            + Add New
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
            {vendorList.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ textAlign: "center", color: "#888" }}>
                  No vendors found.
                </td>
              </tr>
            ) : (
              vendorList.map((user, idx) => (
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
                    <button
                      className={styles.actionBtn}
                      title="View Activity Logs"
                      onClick={() =>
                        handleShowActivityLog(
                          Array.isArray(user.activityLogs)
                            ? user.activityLogs
                            : []
                        )
                      }
                    >
                      <FaRegClock size={17} style={{ color: "#0b63ce" }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Activity Log Modal */}
      {showActivityLogModal && (
        <div className={styles.activityOverlay}>
          <div className={styles.activityModal}>
            <div className={styles.activityHeader}>
              <span className={styles.activityTitle}>Activity Log</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  className={styles.exportPdfBtn}
                  onClick={handleExportActivityLogPdf}
                  aria-label="Export activity log to PDF"
                  type="button"
                >
                  <span
                    role="img"
                    aria-label="Export PDF"
                    style={{ fontSize: 18 }}
                  >
                    🗎
                  </span>
                  Export PDF
                </button>
                <button
                  className={styles.activityCloseBtn}
                  onClick={() => setShowActivityLogModal(false)}
                  aria-label="Close activity log"
                >
                  ×
                </button>
              </div>
            </div>
            <div
              style={{
                overflowY: "auto",
                maxHeight: 350,
                minWidth: "100%",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(11,99,206,0.08)",
              }}
            >
              <table
                className={styles.activityLogTable}
                style={{ minWidth: 900 }}
              >
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Old Value</th>
                    <th>New Value</th>
                    <th>Approved By/Rejected By</th>
                    <th>Date/Time (IST)</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {activeLogValue.map((log, i) => {
                    let dateObj = new Date(log.dateTime || "");
                    let istDate = new Date(
                      dateObj.getTime() + 5.5 * 60 * 60 * 1000
                    );
                    let day = String(istDate.getDate()).padStart(2, "0");
                    let month = String(istDate.getMonth() + 1).padStart(2, "0");
                    let year = String(istDate.getFullYear()).slice(-2);
                    let hours = String(istDate.getHours()).padStart(2, "0");
                    let minutes = String(istDate.getMinutes()).padStart(2, "0");
                    let formattedDate = log.dateTime
                      ? `${day}/${month}/${year} ${hours}:${minutes}`
                      : "-";
                    return (
                      <tr key={i}>
                        <td>{log.action || "-"}</td>
                        <td>
                          {log.oldValue !== undefined ? log.oldValue : "-"}
                        </td>
                        <td>
                          {log.newValue !== undefined ? log.newValue : "-"}
                        </td>
                        <td>{log.approver || log.user || "-"}</td>
                        <td>{formattedDate}</td>
                        <td>{log.reason || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Panel removed: now handled by route navigation */}
    </div>
  );
};

export default VendorMasterTable;
