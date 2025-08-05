import React from "react";
import styles from "./ApplicationMasterTable.module.css";
import { Eye } from "lucide-react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

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
  return (
    <div >
       <header className={styles["main-header"]}>
  <h2 className={styles["header-title"]}>Application Master</h2>
  <div className={styles["header-icons"]}>
    <span className={styles["header-icon"]}><NotificationsIcon fontSize="small" /></span>
    <span className={styles["header-icon"]}><SettingsIcon fontSize="small" /></span>
  </div>
</header>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Application Master</h2>
        <input className={styles.searchInput} type="text" placeholder="Search..." />
        <div className={styles.actions}>
          <button className={styles.addButton}>+ Add New</button>
          <button className={styles.editButton}>✎ Edit</button>
          <button className={styles.deleteButton}>🗑 Delete</button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
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
            {applications.map((app, idx) => (
              <tr key={idx}>
                <td><input type="checkbox" /></td>
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
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
