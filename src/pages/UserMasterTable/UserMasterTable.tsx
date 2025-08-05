import React, { useState } from 'react';
import styles from './UserMasterTable.module.css'; // Adjust the path and extension if needed
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddUserPanel from 'pages/AddUserPanel/AddUserPanel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';



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
      fullName: 'Sneha Desai',
      email: 'sneha.desai@unichemlab.com',
      empCode: 'EMP002',
      department: 'HR',
      plants: ['GOA', 'Mumbai'],
      status: 'Inactive',
      
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
      plants: [ "Mumbai"],
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
      plants: ["Delhi",  "Mumbai"],
      status: "Inactive",
     
    activityLogs: {
      approver: "Admin1",
      reason: "Granted access for audit",
      dateTime: "2025-08-04 14:25",
    },
      
    },
  ]);

  const [showPanel, setShowPanel] = useState(false);
  const [panelMode, setPanelMode] = useState<'add' | 'edit'>('add');
  const [editUserIdx, setEditUserIdx] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState<any>(null);

  return (
     <div >
           <header className={styles["main-header"]}>
      <h2 className={styles["header-title"]}>User Master</h2>
      <div className={styles["header-icons"]}>
        <span className={styles["header-icon"]}><NotificationsIcon fontSize="small" /></span>
        <span className={styles["header-icon"]}><SettingsIcon fontSize="small" /></span>
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
          <button className={styles.addUser} onClick={() => {
            setPanelMode('add');
            setEditUserData(null);
            setShowPanel(true);
          }}>+ Add User</button>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <input type="text" placeholder="Search users..." />
          <div className={styles.controlButtons}>
            <button>⬇ Export</button>
            <button>⟳ Refresh</button>
          </div>
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
            <th>Central Master</th> {/* New */}
    <th>Activity Logs</th>
            <th>Actions</th>
             
            
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td><strong>{user.fullName}</strong></td>
              <td>{user.email}</td>
              <td>{user.empCode}</td>
              <td>{user.department}</td>
              <td>
                {user.plants.map((plant, i) => (
                  <span key={i} className={styles.plantBadge}>{plant}</span>
                ))}
              </td>
              
             <td>
                <span className={user.status === 'Active' ? styles.activeBadge : styles.inactiveBadge}>
                  {user.status}
                </span>
              </td>
              <td>
        <span className={user.centralMaster ? styles.active : styles.inactive}>
  {user.centralMaster ? "Yes" : "No"}
</span>
      </td>
      <td>
        <div className={styles.activityLog}>
          <div><strong>By:</strong> {user.activityLogs.approver}</div>
          <div><strong>Comment:</strong> {user.activityLogs.reason}</div>
          <div><strong>Date:</strong> {user.activityLogs.dateTime}</div>
        </div>
      </td>
              <td>
                <button className={styles.actionBtn} onClick={() => {
                  setPanelMode('edit');
                  setEditUserIdx(idx);
                  setEditUserData(users[idx]);
                  setShowPanel(true);
                }}>{FaEdit({ size: 17 })}</button>
                <button className={styles.actionBtnDelete}>{FaTrash({ size: 17 })}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        {/* Footer */}
        <div className={styles.footer}>
          <p>Showing 1 to 8 of 8 entries</p>
          <div className={styles.pagination}>
            <button disabled>{'<'}</button>
            <button className={styles.activePage}>1</button>
            <button>{'>'}</button>
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
    approver: 'Admin',
    reason: userData.comment || 'No reason provided',
    dateTime: new Date().toISOString().slice(0, 16).replace('T', ' '),
  };

  if (panelMode === 'add') {
    setUsers((prev) => [
      ...prev,
      {
        ...userData,
        centralMaster: userData.centralPermission ?? false,
        activityLogs: logDetails,
      },
    ]);
  } else if (panelMode === 'edit' && editUserIdx !== null) {
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
