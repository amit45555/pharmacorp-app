import React from "react";
import styles from "./PlantMasterTable.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { FaEdit, FaTrash,} from "react-icons/fa";
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

const PlantMasterTable: React.FC = () => {
  return (
     <div >
       <header className={styles["main-header"]}>
  <h2 className={styles["header-title"]}>Plant Master</h2>
  <div className={styles["header-icons"]}>
    <span className={styles["header-icon"]}><NotificationsIcon fontSize="small" /></span>
    <span className={styles["header-icon"]}><SettingsIcon fontSize="small" /></span>
  </div>
</header>
<div className={styles.headerTopRow}>
        <div className={styles.actionHeaderRow}>
          <button className={styles.addUserBtn}>+ Add New</button>
          <button
                      className={styles.filterBtn}
                    >
                      🔍 Filter
                    </button>
          <button className={`${styles.btn} ${styles.editBtn}`}><FaEdit size={14} /> Edit</button>
          <button className={`${styles.btn} ${styles.deleteBtn}`}><FaTrash size={14} /> Delete</button>
          <button
                className={`${styles.btn} ${styles.exportPdfBtn}`} 
                
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
 
    <div className={styles.container}>
      

       <div  style={{
              maxHeight: 500,
              overflowY: "auto",
              borderRadius: 8,
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.06)",

              height: "100",
            }}>

      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Plant Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plantData.map((plant, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{plant.name}</td>
              <td>{plant.description}</td>
              <td>{plant.location}</td>
              <td><span className={styles.status}>{plant.status}</span></td>
              <td><VisibilityIcon style={{ color: "#4a5568" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};

export default PlantMasterTable;
