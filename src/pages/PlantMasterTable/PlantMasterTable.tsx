import React from "react";
import styles from "./PlantMasterTable.module.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "../../components/Common/ConfirmDeleteModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaRegClock } from "react-icons/fa6";

const plantData = [
  {
    name: "Mumbai Plant",
    description: "Manufacturing facility in Mumbai",
    location: "Maharashtra, India",
    status: "ACTIVE",
  },
  {
    name: "Goa Plant",
    description: "Oral solid dosage facility in Goa",
    location: "Goa, India",
    status: "ACTIVE",
  },
  {
    name: "Chennai Plant",
    description: "API manufacturing facility",
    location: "Tamil Nadu, India",
    status: "ACTIVE",
  },
  {
    name: "Pune Plant",
    description: "R&D and formulation center",
    location: "Maharashtra, India",
    status: "ACTIVE",
  },
];

// Dummy activity logs for demonstration
const dummyActivityLogs = [
  {
    action: "add",
    oldValue: "-",
    newValue: "Mumbai Plant added",
    performedBy: "admin",
    approvedBy: "superadmin",
    approvalStatus: "Approved",
    dateTime: "2025-08-20 10:30:00",
    comments: "Initial creation.",
  },
  {
    action: "edit",
    oldValue: "Goa Plant (status: INACTIVE)",
    newValue: "Goa Plant (status: ACTIVE)",
    performedBy: "plantadmin",
    approvedBy: "superadmin",
    approvalStatus: "Approved",
    dateTime: "2025-08-21 09:00:00",
    comments: "Activated plant.",
  },
  {
    action: "delete",
    oldValue: "Chennai Plant",
    newValue: "-",
    performedBy: "admin",
    approvedBy: "superadmin",
    approvalStatus: "Rejected",
    dateTime: "2025-08-19 15:45:00",
    comments: "Deletion not allowed.",
  },
];

const PlantMasterTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [data, setData] = React.useState(plantData);
  const [showActivityModal, setShowActivityModal] = React.useState(false);
  const [activityLogs] = React.useState(dummyActivityLogs);
  const [approverFilter, setApproverFilter] = React.useState("");
  const [activityPlant, setActivityPlant] = React.useState<any>(null);

  const handleDelete = () => setShowDeleteModal(true);
  const confirmDelete = () => {
    if (selectedRow === null) return;
    const updated = [...data];
    updated.splice(selectedRow, 1);
    setData(updated);
    setSelectedRow(null);
    setShowDeleteModal(false);
  };

  // PDF Export Handler for Plant Table
  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const fileName = `PlantMasterTable_${yyyy}-${mm}-${dd}.pdf`;
    const headers = [["Plant Name", "Description", "Location", "Status"]];
    const rows = data.map((plant) => [
      plant.name,
      plant.description,
      plant.location,
      plant.status,
    ]);
    doc.setFontSize(18);
    doc.text("Plant Master Table", 14, 18);
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

  // PDF Export Handler for Activity Log
  const handleExportActivityPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const fileName = `PlantActivityLog_${yyyy}-${mm}-${dd}.pdf`;
    const headers = [
      [
        "Action",
        "Old Value",
        "New Value",
        "Action Performed By",
        "Approved/Rejected By",
        "Approval Status",
        "Date/Time (IST)",
        "Comments",
      ],
    ];
    const filteredLogs = activityLogs.filter(
      (log) =>
        !approverFilter ||
        (log.approvedBy || "")
          .toLowerCase()
          .includes(approverFilter.toLowerCase())
    );
    const rows = filteredLogs.map((log) => [
      log.action,
      log.oldValue,
      log.newValue,
      log.performedBy,
      log.approvedBy,
      log.approvalStatus,
      log.dateTime,
      log.comments,
    ]);
    doc.setFontSize(18);
    doc.text("Plant Activity Log", 14, 18);
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

  // Get activity logs for a specific plant (dummy logic)
  const getPlantActivityLogs = (plantName: string) => {
    // In real app, filter logs by plantName or plantId
    return activityLogs.filter(
      (log) =>
        log.oldValue.includes(plantName) || log.newValue.includes(plantName)
    );
  };

  return (
    <div>
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>Plant Master</h2>
        <div className={styles["header-icons"]}>
          <span className={styles["header-icon"]}>
            <NotificationsIcon fontSize="small" />
          </span>
          <span className={styles["header-icon"]}>
            <SettingsIcon fontSize="small" />
          </span>
        </div>
      </header>
      <div className={styles.headerTopRow}>
        <div className={styles.actionHeaderRow}>
          <button className={styles.addUserBtn}>+ Add New</button>
          <button className={styles.filterBtn}>🔍 Filter</button>
          <button className={`${styles.btn} ${styles.editBtn}`}>
            <FaEdit size={14} /> Edit
          </button>
          <button
            className={`${styles.btn} ${styles.deleteBtn}`}
            disabled={selectedRow === null}
            onClick={handleDelete}
            title="Delete selected plant"
          >
            <FaTrash size={14} /> Delete
          </button>
          <button
            className={`${styles.btn} ${styles.exportPdfBtn}`}
            aria-label="Export table to PDF"
            type="button"
            onClick={handleExportPDF}
          >
            <span role="img" aria-label="Export PDF" style={{ fontSize: 18 }}>
              🗎
            </span>
            PDF
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div
          style={{
            maxHeight: 500,
            overflowY: "auto",
            borderRadius: 8,
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
            marginTop: "50px",
            height: "100",
          }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Plant Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Status</th>
                <th>Activity Logs</th>
              </tr>
            </thead>
            <tbody>
              {data.map((plant, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedRow(index)}
                  style={{
                    background: selectedRow === index ? "#f0f4ff" : undefined,
                  }}
                >
                  <td>
                    <input
                      type="radio"
                      className={styles.radioInput}
                      checked={selectedRow === index}
                      onChange={() => setSelectedRow(index)}
                    />
                  </td>
                  <td>{plant.name}</td>
                  <td>{plant.description}</td>
                  <td>{plant.location}</td>
                  <td>
                    <span className={styles.status}>{plant.status}</span>
                  </td>
                  <td>
                    <span
                      style={{ cursor: "pointer", color: "#0b63ce" }}
                      title="View Activity Log"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivityPlant({
                          name: plant.name,
                          logs: getPlantActivityLogs(plant.name),
                        });
                        setApproverFilter("");
                        setShowActivityModal(true);
                      }}
                    >
                      <FaRegClock size={18} />
                    </span>
                  </td>
                </tr>
              ))}
              <ConfirmDeleteModal
                open={showDeleteModal}
                name={
                  selectedRow !== null && data[selectedRow]
                    ? data[selectedRow].name
                    : "plant"
                }
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log Modal */}
      {showActivityModal && activityPlant && (
        <div
          className={styles.panelOverlay}
          style={{ zIndex: 2000, background: "rgba(0,0,0,0.18)" }}
        >
          <div
            className={styles.panelWrapper}
            style={{
              maxWidth: 1000,
              width: "95%",
              left: "53%",
              transform: "translateX(-50%)",
              position: "fixed",
              top: 176,
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(11,99,206,0.18)",
              padding: "24px 18px 18px 18px",
              display: "flex",
              flexDirection: "column",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 20 }}>Activity Log</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  className={styles.exportPdfBtn}
                  onClick={handleExportActivityPDF}
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
                  style={{
                    background: "#e3e9f7",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                  onClick={() => setShowActivityModal(false)}
                  aria-label="Close activity log"
                >
                  ×
                </button>
              </div>
            </div>
            <div
              style={{
                marginBottom: 12,
                fontWeight: 500,
                fontSize: 15,
                color: "#333",
              }}
            >
              <span>
                Plant:{" "}
                <span style={{ color: "#0b63ce" }}>{activityPlant.name}</span>
              </span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <input
                type="text"
                placeholder="Filter by Approved/Rejected By"
                value={approverFilter}
                onChange={(e) => setApproverFilter(e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 14,
                  width: 220,
                  marginRight: 12,
                }}
              />
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
              <table className={styles.table} style={{ minWidth: 1100 }}>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Old Value</th>
                    <th>New Value</th>
                    <th>Action Performed By</th>
                    <th>Approved/Rejected By</th>
                    <th>Approval Status</th>
                    <th>Date/Time (IST)</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {(activityPlant.logs || [])
                    .filter(
                      (log: any) =>
                        !approverFilter ||
                        (log.approvedBy || "")
                          .toLowerCase()
                          .includes(approverFilter.toLowerCase())
                    )
                    .map((log: any, i: number) => (
                      <tr key={i}>
                        <td>{log.action}</td>
                        <td>{log.oldValue}</td>
                        <td>{log.newValue}</td>
                        <td>{log.performedBy}</td>
                        <td>{log.approvedBy}</td>
                        <td>{log.approvalStatus}</td>
                        <td>{log.dateTime}</td>
                        <td>{log.comments}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantMasterTable;
