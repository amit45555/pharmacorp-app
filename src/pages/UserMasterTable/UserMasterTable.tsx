import React, { useState, useEffect, useRef } from "react";
import styles from "./UserMasterTable.module.css"; // Adjust the path and extension if needed
import { FaEdit, FaTrash } from "react-icons/fa";
import AddUserPanel from "pages/AddUserPanel/AddUserPanel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const UserMasterTable = () => {
  const [users, setUsers] = useState([
    {
      fullName: "Krishna Patel",
      email: "krishna.patel@unichem.com",
      empCode: "EMP001",
      department: "IT",
      plants: ["GOA", "GOA-1", "Mumbai"],
      status: "Active",
      centralMaster: true,
      activityLogs: {
        approver: "Admin1",
        reason: "Granted access for audit",
        dateTime: "2025-08-04 14:25",
      },
    },

    {
      fullName: "Sneha Desai",
      email: "sneha.desai@unichemlab.com",
      empCode: "EMP002",
      department: "HR",
      plants: ["GOA", "Mumbai"],
      status: "Inactive",

      activityLogs: {
        approver: "Admin2",
        reason: "Revoked for inactivity",
        dateTime: "2025-08-01 10:10",
      },
    },

    {
      fullName: "Amit Nagpure",
      email: "amit.nagpure@unichem.com",
      empCode: "EMP003",
      department: "Finance",
      plants: ["Mumbai"],
      status: "Active",
      centralMaster: true,
      activityLogs: {
        approver: "Admin1",
        reason: "Granted access for audit",
        dateTime: "2025-08-04 14:25",
      },
    },

    {
      fullName: "Pankaj Patel",
      email: "pankaj.patel@unichem.com",
      empCode: "EMP004",
      department: "QA",
      plants: ["Delhi", "Mumbai"],
      status: "Inactive",

      activityLogs: {
        approver: "Admin1",
        reason: "Granted access for audit",
        dateTime: "2025-08-04 14:25",
      },
    },
  ]);

  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<"add" | "edit">("add");
  const [editUserIdx, setEditUserIdx] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState<any>(null);

  // Filtering logic state/hooks
  const [filterColumn, setFilterColumn] = useState("fullName");
  const [filterValue, setFilterValue] = useState("");

  // Filter popover state
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [tempFilterColumn, setTempFilterColumn] = useState(filterColumn);
  const [tempFilterValue, setTempFilterValue] = useState(filterValue);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Close popover on outside click (using ref for robustness)
  useEffect(() => {
    if (!showFilterPopover) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setShowFilterPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilterPopover]);

  const filteredUsers = users.filter((user: any) => {
    if (!filterValue.trim()) return true;
    const value = filterValue.toLowerCase();
    switch (filterColumn) {
      case "fullName":
        return user.fullName?.toLowerCase().includes(value);
      case "email":
        return user.email?.toLowerCase().includes(value);
      case "department":
        return user.department?.toLowerCase().includes(value);
      case "status":
        return user.status?.toLowerCase().includes(value);
      default:
        return true;
    }
  });

  return (
    <div>
      <header className={styles["main-header"]}>
        <h2 className={styles["header-title"]}>User Master</h2>
        <div className={styles["header-icons"]}>
          <span className={styles["header-icon"]}>
            <NotificationsIcon fontSize="small" />
          </span>
          <span className={styles["header-icon"]}>
            <SettingsIcon fontSize="small" />
          </span>
        </div>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h2>User Management</h2>
              <p>Manage user accounts, permissions, and plant access</p>
            </div>
            <button
              className={styles.addUser}
              onClick={() => {
                setPanelMode("add");
                setEditUserData(null);
                setShowPanel(true);
              }}
            >
              + Add User
            </button>
          </div>
          {/* Professional Filter Button with Popover */}
          <div className={styles.controls}>
            <button
              className={styles.filterButton}
              onClick={() => setShowFilterPopover((prev) => !prev)}
              type="button"
            >
              <span role="img" aria-label="filter">
                🔎
              </span>{" "}
              Filter
            </button>
            {showFilterPopover && (
              <div className={styles.filterPopover} ref={popoverRef}>
                <div className={styles.filterPopoverHeader}>
                  Advanced Filter
                </div>
                <div className={styles.filterPopoverBody}>
                  <div className={styles.filterFieldRow}>
                    <label className={styles.filterLabel}>Column</label>
                    <select
                      className={styles.filterDropdown}
                      value={tempFilterColumn}
                      onChange={(e) => setTempFilterColumn(e.target.value)}
                    >
                      <option value="fullName">Name</option>
                      <option value="email">Email</option>
                      <option value="department">Department</option>
                      <option value="status">Status</option>
                    </select>
                  </div>
                  <div className={styles.filterFieldRow}>
                    <label className={styles.filterLabel}>Value</label>
                    <input
                      className={styles.filterInput}
                      type="text"
                      placeholder={`Enter ${
                        tempFilterColumn === "fullName"
                          ? "Name"
                          : tempFilterColumn.charAt(0).toUpperCase() +
                            tempFilterColumn.slice(1)
                      }`}
                      value={tempFilterValue}
                      onChange={(e) => setTempFilterValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.filterPopoverFooter}>
                  <button
                    className={styles.applyBtn}
                    onClick={() => {
                      setFilterColumn(tempFilterColumn);
                      setFilterValue(tempFilterValue);
                      setShowFilterPopover(false);
                    }}
                  >
                    Apply
                  </button>
                  <button
                    className={styles.clearBtn}
                    onClick={() => {
                      setTempFilterValue("");
                      setFilterValue("");
                      setShowFilterPopover(false);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Table */}
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Employee Code</th>
                <th>Department</th>
                <th>Assigned Plants</th>
                <th>Status</th>
                <th>Central Master</th>
                <th>Activity Logs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any, idx: number) => (
                <tr key={idx}>
                  <td>
                    <strong>{user.fullName}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.empCode}</td>
                  <td>{user.department}</td>
                  <td>
                    {user.plants.map((plant: string, i: number) => (
                      <span key={i} className={styles.plantBadge}>
                        {plant}
                      </span>
                    ))}
                  </td>
                  <td>
                    <span
                      className={
                        user.status === "Active"
                          ? styles.activeBadge
                          : styles.inactiveBadge
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        user.centralMaster ? styles.active : styles.inactive
                      }
                    >
                      {user.centralMaster ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.activityLog}>
                      <div>
                        <strong>By:</strong> {user.activityLogs.approver}
                      </div>
                      <div>
                        <strong>Comment:</strong> {user.activityLogs.reason}
                      </div>
                      <div>
                        <strong>Date:</strong> {user.activityLogs.dateTime}
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        setPanelMode("edit");
                        setEditUserIdx(idx);
                        setEditUserData(filteredUsers[idx]);
                        setShowPanel(true);
                      }}
                    >
                      {FaEdit({ size: 17 })}
                    </button>
                    <button className={styles.actionBtnDelete}>
                      {FaTrash({ size: 17 })}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer */}
          <div className={styles.footer}>
            <p>Showing 1 to 8 of 8 entries</p>
            <div className={styles.pagination}>
              <button disabled>{"<"}</button>
              <button className={styles.activePage}>1</button>
              <button>{">"}</button>
            </div>
          </div>
        </div>
      </div>
      {/* Right Slide-in Panel for Add/Edit */}
      {showPanel && (
        <div className={styles.panelOverlay}>
          <div className={styles.panelWrapper}>
            <AddUserPanel
              onClose={() => {
                setShowPanel(false);
                setEditUserIdx(null);
                setEditUserData(null);
              }}
              onSave={(userData) => {
                const logDetails = {
                  approver: "Admin",
                  reason: userData.comment || "No reason provided",
                  dateTime: new Date()
                    .toISOString()
                    .slice(0, 16)
                    .replace("T", " "),
                };

                if (panelMode === "add") {
                  setUsers((prev) => [
                    ...prev,
                    {
                      ...userData,
                      centralMaster: userData.centralPermission ?? false,
                      activityLogs: logDetails,
                    },
                  ]);
                } else if (panelMode === "edit" && editUserIdx !== null) {
                  setUsers((prev) =>
                    prev.map((u, i) =>
                      i === editUserIdx
                        ? {
                            ...userData,
                            centralMaster: userData.centralPermission ?? false,
                            activityLogs: logDetails,
                          }
                        : u
                    )
                  );
                }

                setShowPanel(false);
                setEditUserIdx(null);
                setEditUserData(null);
              }}
              initialData={editUserData}
              mode={panelMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMasterTable;
