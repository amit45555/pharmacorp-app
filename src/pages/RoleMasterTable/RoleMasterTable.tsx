import React, { useState } from "react";
import styles from "./RoleMasterTable.module.css";
import {  FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const rolesData = [
  { name: "Read Only", description: "View access to system data", status: "ACTIVE" },
  { name: "User", description: "Standard user access with edit capabilities", status: "ACTIVE" },
  { name: "Administrator", description: "Full administrative access", status: "ACTIVE" },
  { name: "Super Admin", description: "Complete system control", status: "ACTIVE" },
  { name: "Operator", description: "Operational access for daily tasks", status: "ACTIVE" },
];

export default function RoleMasterTable() {
  const [filters, setFilters] = useState({ name: "", description: "", status: "" });
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [filterColumn, setFilterColumn] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  const filteredRoles = rolesData.filter((role) => {
    let match = true;
    if (filters.name) match = match && role.name.toLowerCase().includes(filters.name.toLowerCase());
    if (filters.description) match = match && role.description.toLowerCase().includes(filters.description.toLowerCase());
    if (filters.status) match = match && role.status.toLowerCase() === filters.status.toLowerCase();

    if (filterValue) {
      if (filterColumn === "name") match = match && role.name.toLowerCase().includes(filterValue.toLowerCase());
      if (filterColumn === "description") match = match && role.description.toLowerCase().includes(filterValue.toLowerCase());
      if (filterColumn === "status") match = match && role.status.toLowerCase().includes(filterValue.toLowerCase());
    }
    return match;
  });

 

  const toggleActions = (idx: number) => {
    setExpandedRow((prev) => (prev === idx ? null : idx));
  };

  const applyAdvancedFilter = () => {
    setShowAdvancedFilter(false);
  };

  const clearAdvancedFilter = () => {
    setFilterColumn("name");
    setFilterValue("");
    setShowAdvancedFilter(false); // also hide when cleared
  };

  return (
    <div>
      {/* Header */}
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

      <div className={styles.headerTopRow}>
          <h2>Role Master</h2>

         
           <button
      className={styles.addUserBtn}
      // attach your addRole handler here
      onClick={() => {/* handle add role modal/dialog */}}
    >
      + Add Role
    </button>
        </div>
        <div>

         {/* Filter button */}
          <button
            className={styles.filterBtn}
            onClick={() => setShowAdvancedFilter((prev) => !prev)}
          >
            🔍 Filter
          </button>
        </div>
      {/* Table */}
      <div className={styles.roleTableContainer}>
        

        {/* Advanced Filter Panel */}
        {showAdvancedFilter && (
          <div className={styles.advancedFilter}>
            <div className={styles.filterHeader}>
              <h4>Advanced Filter</h4>

             <span
                      onClick={() => setShowAdvancedFilter(false)}
                      title="Close Filter"
                      className={styles.closeIcon}
                    >
                       {FaTimes({ size: 17 })}
                    </span>

             
            </div>

            <div className={styles.filterRowBox}>
              <label>Column</label>
              <select value={filterColumn} onChange={(e) => setFilterColumn(e.target.value)}>
                <option value="name">Name</option>
                <option value="description">Description</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className={styles.filterRowBox}>
              <label>Value</label>
              <input
                type="text"
                placeholder={`Enter ${filterColumn}`}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            <div className={styles.filterActions}>
              <button onClick={applyAdvancedFilter} className={styles.applyBtn}>Apply</button>
              <button onClick={clearAdvancedFilter} className={styles.clearBtn}>Clear</button>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRoles.map((role, idx) => (
              <tr key={idx}>
                <td><input type="checkbox" /></td>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <span className={`${styles.status} ${styles.active}`}>
                    {role.status}
                  </span>
                </td>
                <td>
                  {expandedRow === idx ? (
                    <div className={styles.inlineMenu}>
                     
                      <button className={`${styles.btn} ${styles.gray}`}>
                        {FaEdit({ size: 14 })} Edit
                      </button>
                      <button className={`${styles.btn} ${styles.red}`}>
                        {FaTrash({ size: 14 })} Delete
                      </button>
                      <button className={`${styles.btn} ${styles.blue}`}>
                         {FaEye({ size: 14 })} View
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => toggleActions(idx)}
                      title="Show Actions"
                      className={styles.icon}
                    >
                       {FaEye({ size: 17 })}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
