import React, { useState, useEffect, useRef } from "react";
import styles from "./UserMasterTable.module.css"; // Adjust the path and extension if needed
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
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
      centralMaster: ["Role Master"], // ✅ based on selected checkboxes

      activityLogs: [
        {
          action: "Edit",
          oldValue: "Role: User",
          newValue: "Role: Admin",
          approver: "Admin1",
          dateTime: "2025-08-04 14:25",
          reason: "Role upgraded for audit",
        },
        {
          action: "Delete",
          oldValue: "Status: Active",
          newValue: "Status: Deleted",
          approver: "Admin2",
          dateTime: "2025-08-05 10:10",
          reason: "User left organization",
        },
        {
          action: "View",
          oldValue: "-",
          newValue: "-",
          approver: "Admin3",
          dateTime: "2025-08-06 09:00",
          reason: "Viewed for compliance check",
        },
      ],
    },
    {
      fullName: "Sneha Desai",
      email: "sneha.desai@unichemlab.com",
      empCode: "EMP002",
      department: "HR",
      plants: ["GOA", "Mumbai"],
      status: "Inactive",
      centralMaster: ["Role Master", "Plant Master"], // ✅ based on selected checkboxes

      activityLogs: [
        {
          action: "Edit",
          oldValue: "Department: HR",
          newValue: "Department: Admin",
          approver: "Admin2",
          dateTime: "2025-08-01 10:10",
          reason: "Transferred department",
        },
        {
          action: "View",
          oldValue: "-",
          newValue: "-",
          approver: "Admin1",
          dateTime: "2025-08-02 11:00",
          reason: "Viewed for access review",
        },
      ],
    },
    {
      fullName: "Amit Nagpure",
      email: "amit.nagpure@unichem.com",
      empCode: "EMP003",
      department: "Finance",
      plants: ["Mumbai"],
      status: "Active",
      centralMaster: ["Plant Master"], // ✅ based on selected checkboxes

      activityLogs: [
        {
          action: "Edit",
          oldValue: "Central Master: No",
          newValue: "Central Master: Yes",
          approver: "Admin1",
          dateTime: "2025-08-04 14:25",
          reason: "Granted central access",
        },
        {
          action: "Delete",
          oldValue: "Status: Active",
          newValue: "Status: Deleted",
          approver: "Admin2",
          dateTime: "2025-08-05 10:10",
          reason: "User removed",
        },
      ],
    },
    {
      fullName: "Pankaj Patel",
      email: "pankaj.patel@unichem.com",
      empCode: "EMP004",
      department: "QA",
      plants: ["Delhi", "Mumbai"],
      status: "Inactive",
      centralMaster: ["Role Master", "Plant Master"], // ✅ based on selected checkboxes

      activityLogs: [
        {
          action: "View",
          oldValue: "-",
          newValue: "-",
          approver: "Admin1",
          dateTime: "2025-08-04 14:25",
          reason: "Viewed for audit",
        },
      ],
    },
  ]);

  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<"add" | "edit">("add");
  const [editUserIdx, setEditUserIdx] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState<any>(null);
  // Activity log modal state
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityLogsUser, setActivityLogsUser] = useState<any>(null);

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
      case "empCode":
        return user.empCode?.toLowerCase().includes(value); // ✅ FIXED
      case "department":
        return user.department?.toLowerCase().includes(value);
      case "plants":
        return user.plants?.some((plant: string) =>
          plant.toLowerCase().includes(value)
        ); // ✅ FIXED
      case "status":
        return user.status?.toLowerCase().includes(value);
      default:
        return true;
    }
  });

  const centralModules = [
    "Role Master",
    "Vendor Master",
    "Plant Master",
    "Application Master",
    "Approval Workflow",
  ];

  const getEnabledCentralModules = (permissions: {
    [key: string]: string[];
  }) => {
    return centralModules.filter((mod) => permissions[mod]?.length > 0);
  };

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
                      <option value="empCode">Employee Code</option>
                      <option value="department">Department</option>
                      <option value="plants">Assigned Plants</option>
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

          <div
            style={{
              maxHeight: 500,
              overflowY: "auto",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(11,99,206,0.08)",
              height: "100",
            }}
          >
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
                      {Array.isArray(user.centralMaster) &&
                      user.centralMaster.length > 0 ? (
                        user.centralMaster.map((mod: string, index: number) => (
                          <span key={index} className={styles.plantBadge}>
                            {mod}
                          </span>
                        ))
                      ) : (
                        <span className={styles.inactive}>-</span>
                      )}
                    </td>

                    <td>
                      <button
                        className={styles.actionBtn}
                        title="View Activity Logs"
                        onClick={() => {
                          setActivityLogsUser(user);
                          setShowActivityModal(true);
                        }}
                      >
                        {FaRegClock({ size: 17 })}
                      </button>
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
          </div>
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
      {/* Activity Logs Modal */}
      {showActivityModal && activityLogsUser && (
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
              >
                ×
              </button>
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
                Username:{" "}
                <span style={{ color: "#0b63ce" }}>
                  {activityLogsUser.fullName}
                </span>
              </span>
              &nbsp; | &nbsp;
              <span>
                Emp ID:{" "}
                <span style={{ color: "#0b63ce" }}>
                  {activityLogsUser.empCode}
                </span>
              </span>
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
              <table className={styles.userTable} style={{ minWidth: 900 }}>
                <thead>
                  <tr>
                    <th>Action Performed</th>
                    <th>Old Change</th>
                    <th>New Change</th>
                    <th>Action Performed By</th>
                    <th>Date/Time (IST)</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(activityLogsUser.activityLogs)
                    ? activityLogsUser.activityLogs
                    : [activityLogsUser.activityLogs]
                  ).map((log: any, i: number) => {
                    // Format date to IST dd/mm/yy HH:mm
                    let dateObj = new Date(log.dateTime || log.timestamp);
                    let istDate = new Date(
                      dateObj.getTime() + 5.5 * 60 * 60 * 1000
                    );
                    let day = String(istDate.getDate()).padStart(2, "0");
                    let month = String(istDate.getMonth() + 1).padStart(2, "0");
                    let year = String(istDate.getFullYear()).slice(-2);
                    let hours = String(istDate.getHours()).padStart(2, "0");
                    let minutes = String(istDate.getMinutes()).padStart(2, "0");
                    let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                    return (
                      <tr key={i}>
                        <td>{log.action || "-"}</td>
                        <td>
                          {log.oldValue !== undefined ? log.oldValue : "-"}
                        </td>
                        <td>
                          {log.newValue !== undefined ? log.newValue : "-"}
                        </td>
                        <td>{log.approver || "-"}</td>
                        <td>
                          {log.dateTime || log.timestamp ? formattedDate : "-"}
                        </td>
                        <td>{log.reason || log.comment || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
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
                      centralMaster: getEnabledCentralModules(
                        userData.permissions
                      ),
                      activityLogs: [
                        {
                          action: "Add",
                          oldValue: "-",
                          newValue: JSON.stringify({
                            department: userData.department,
                            plants: userData.plants,
                            status: userData.status,
                            centralMaster: getEnabledCentralModules(
                              userData.permissions
                            ),
                          }),
                          approver: logDetails.approver,
                          dateTime: logDetails.dateTime,
                          reason: logDetails.reason,
                        },
                      ],
                    },
                  ]);
                } else if (panelMode === "edit" && editUserIdx !== null) {
                  setUsers((prev) =>
                    prev.map((u, i) => {
                      if (i !== editUserIdx) return u;
                      const newCentralMaster = getEnabledCentralModules(
                        userData.permissions
                      );
                      let logs = Array.isArray(u.activityLogs)
                        ? [...u.activityLogs]
                        : [];

                      // Compare only allowed fields
                      if (u.department !== userData.department) {
                        logs.push({
                          action: "Edit department",
                          oldValue: u.department,
                          newValue: userData.department,
                          approver: logDetails.approver,
                          dateTime: logDetails.dateTime,
                          reason: logDetails.reason,
                        });
                      }
                      if (u.status !== userData.status) {
                        logs.push({
                          action: "Edit status",
                          oldValue: u.status,
                          newValue: userData.status,
                          approver: logDetails.approver,
                          dateTime: logDetails.dateTime,
                          reason: logDetails.reason,
                        });
                      }
                      if (u.plants.join(", ") !== userData.plants.join(", ")) {
                        logs.push({
                          action: "Edit plants",
                          oldValue: u.plants.join(", "),
                          newValue: userData.plants.join(", "),
                          approver: logDetails.approver,
                          dateTime: logDetails.dateTime,
                          reason: logDetails.reason,
                        });
                      }
                      if (
                        u.centralMaster.join(", ") !==
                        newCentralMaster.join(", ")
                      ) {
                        logs.push({
                          action: "Edit centralMaster",
                          oldValue: u.centralMaster.join(", "),
                          newValue: newCentralMaster.join(", "),
                          approver: logDetails.approver,
                          dateTime: logDetails.dateTime,
                          reason: logDetails.reason,
                        });
                      }

                      return {
                        ...userData,
                        centralMaster: newCentralMaster,
                        activityLogs: logs,
                      };
                    })
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
