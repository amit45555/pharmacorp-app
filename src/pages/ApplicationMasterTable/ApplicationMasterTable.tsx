import React from "react";
import styles from "./ApplicationMasterTable.module.css";
import { Eye } from "lucide-react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDeleteModal from "../../components/Common/ConfirmDeleteModal";
const applications = [
  {
    name: "SAP ERP",
    version: "v2.1",
    equipmentId: "EQ001",
    computer: "MUMAPP01",
    plant: "Mumbai Plant",
    status: "ACTIVE",
  },
  {
    name: "ZingHR",
    version: "v3.5",
    equipmentId: "EQ002",
    computer: "MUMAPP02",
    plant: "Mumbai Plant",
    status: "ACTIVE",
  },
  {
    name: "Manufacturing Execution System",
    version: "v1.8",
    equipmentId: "EQ003",
    computer: "GOAAPP01",
    plant: "Goa Plant",
    status: "ACTIVE",
  },
  {
    name: "Quality Management System",
    version: "v2.3",
    equipmentId: "EQ004",
    computer: "CHENAPP01",
    plant: "Chennai Plant",
    status: "ACTIVE",
  },
  {
    name: "Laboratory Information System",
    version: "v4.1",
    equipmentId: "EQ005",
    computer: "PUNAPP01",
    plant: "Pune Plant",
    status: "ACTIVE",
  },
];

export default function ApplicationMasterTable() {
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [data, setData] = React.useState(applications);
  const handleDelete = () => setShowDeleteModal(true);
  const confirmDelete = () => {
    if (selectedRow === null) return;
    const updated = [...data];
    updated.splice(selectedRow, 1);
    setData(updated);
    setSelectedRow(null);
    setShowDeleteModal(false);
  };
  return (
    <div>
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>Application Master</h2>
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
            title="Delete selected application"
          >
            <FaTrash size={14} /> Delete
          </button>
          <button
            className={`${styles.btn} ${styles.exportPdfBtn}`}
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
      <div className={styles.container}>
        <div
          style={{
            maxHeight: 500,
            overflowY: "auto",
            borderRadius: 8,

            boxShadow: "0 0 4px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
            height: "100",
          }}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Application</th>
                <th>Version</th>
                <th>Equipment ID</th>
                <th>Computer</th>
                <th>Plant</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((app, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedRow(idx)}
                  style={{
                    background: selectedRow === idx ? "#f0f4ff" : undefined,
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRow === idx}
                      onChange={() => setSelectedRow(idx)}
                    />
                  </td>
                  <td>{app.name}</td>
                  <td>{app.version}</td>
                  <td>{app.equipmentId}</td>
                  <td>{app.computer}</td>
                  <td>{app.plant}</td>
                  <td>
                    <span className={styles.status}>{app.status}</span>
                  </td>
                  <td>
                    <Eye className={styles.icon} />
                  </td>
                </tr>
              ))}
              <ConfirmDeleteModal
                open={showDeleteModal}
                name={
                  selectedRow !== null && data[selectedRow]
                    ? data[selectedRow].name
                    : "application"
                }
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
