import React, { useState } from "react";
import styles from "./UserManagement.module.css";

const mockUsers = [
  {
    id: "EMP001",
    name: "John Smith",
    department: "Quality Control",
    role: "Lab Analyst",
    status: "Active",
    email: "john.smith@pharmacorp.com",
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    department: "R&D",
    role: "Data Reviewer",
    status: "Inactive",
    email: "sarah.johnson@pharmacorp.com",
  },
];

const UserManagement: React.FC = () => {
  const [users] = useState(mockUsers);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      <div className={styles.filtersRow}>
        <input className={styles.search} placeholder="Search users..." />
        <select className={styles.filter} defaultValue="All Departments">
          <option>All Departments</option>
        </select>
        <select className={styles.filter} defaultValue="All Roles">
          <option>All Roles</option>
        </select>
      </div>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <span className={styles.roleBadge}>{user.role}</span>
              </td>
              <td>
                <span
                  className={
                    user.status === "Active"
                      ? styles.statusActive
                      : styles.statusInactive
                  }
                >
                  {user.status}
                </span>
              </td>
              <td>
                <button className={styles.actionBtn}>Edit</button>
                <button className={styles.actionBtn}>Reset Password</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
