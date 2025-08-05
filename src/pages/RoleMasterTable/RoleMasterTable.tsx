import React from "react";
import styles from"./RoleMasterTable.module.css";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const roles = [
  {
    name: "Read Only",
    description: "View access to system data",
    permissions: "VIEW",
    status: "ACTIVE",
  },
  {
    name: "User",
    description: "Standard user access with edit capabilities",
    permissions: "VIEW, EDIT",
    status: "ACTIVE",
  },
  {
    name: "Administrator",
    description: "Full administrative access",
    permissions: "VIEW, EDIT, DELETE, ADMIN",
    status: "ACTIVE",
  },
  {
    name: "Super Admin",
    description: "Complete system control",
    permissions: "ALL",
    status: "ACTIVE",
  },
  {
    name: "Operator",
    description: "Operational access for daily tasks",
    permissions: "VIEW, OPERATE",
    status: "ACTIVE",
  },
];

export default function RoleMasterTable() {
  return (
    <div >
           <header className={styles["main-header"]}>
      <h2 className={styles["header-title"]}>Role Master</h2>
      <div className={styles["header-icons"]}>
        <span className={styles["header-icon"]}><NotificationsIcon fontSize="small" /></span>
        <span className={styles["header-icon"]}><SettingsIcon fontSize="small" /></span>
      </div>
    </header>
    <div className={styles.roleTableContainer}>
      <div className={styles.header}>
        <h2>Role Master</h2>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.green}`}>
            {FaPlus({ size: 20 })} Add New
          </button>
          <button className={`${styles.btn} ${styles.gray}`}>
            {FaEdit({ size: 20 })} Edit
          </button>
          <button className={`${styles.btn} ${styles.red}`}>
           {FaTrash({ size: 20 })} Delete
          </button>
        </div>
      </div>

      <div className={styles.searchContainerBox}>
        <input type="text" placeholder="Search..." className={styles.searchContainer}/>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Role Name</th>
            <th>Description</th>
            <th>Permissions</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, idx) => (
            <tr key={idx}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>{role.permissions}</td>
              <td>
                <span className={`${styles.status} ${styles.active}`}>{role.status}</span>
              </td>
              <td>
                {FaEye({ size: 20 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
