import React, { useState } from "react";
import styles from "./AccessRequests.module.css";

const mockRequests = [
  {
    id: "TCO01",
    user: "John Smith",
    employeeCode: "EMP001",
    plant: "Manufacturing Site A",
    department: "Quality Control",
    application: "Laboratory Information System v2.1.3",
    equipmentId: "LAB-INS-001",
    role: "Lab Analyst",
    accessStatus: "Granted",
    requestStatus: "Closed",
  },
  {
    id: "TCO02",
    user: "Sarah Johnson",
    employeeCode: "EMP002",
    plant: "Research Facility B",
    department: "R&D",
    application: "Clinical Data Management v1.8.2",
    equipmentId: "CDM-SYS-002",
    role: "Data Reviewer",
    accessStatus: "Granted",
    requestStatus: "Closed",
  },
];

const AccessRequests: React.FC = () => {
  const [requests] = useState(mockRequests);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Access Requests Management</h1>
      <div className={styles.filtersRow}>
        <input className={styles.search} placeholder="Search requests..." />
        <select className={styles.filter} defaultValue="All Departments">
          <option>All Departments</option>
        </select>
        <select className={styles.filter} defaultValue="All Plants">
          <option>All Plants</option>
        </select>
      </div>
      <table className={styles.requestsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Requested For/By</th>
            <th>Employee Code</th>
            <th>Plant</th>
            <th>Department</th>
            <th>Application</th>
            <th>Equipment ID</th>
            <th>Role</th>
            <th>Access Status</th>
            <th>Request Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.user}</td>
              <td>{req.employeeCode}</td>
              <td>{req.plant}</td>
              <td>{req.department}</td>
              <td>
                <b>{req.application.split(" v")[0]}</b>
                <div style={{ fontSize: 12, color: "#888" }}>{`v${
                  req.application.split(" v")[1]
                }`}</div>
              </td>
              <td>{req.equipmentId}</td>
              <td>{req.role}</td>
              <td>
                <span className={styles.statusGranted}>{req.accessStatus}</span>
              </td>
              <td>
                <span className={styles.statusClosed}>{req.requestStatus}</span>
              </td>
              <td>
                <button className={styles.approveBtn}>Approve</button>
                <button className={styles.rejectBtn}>Reject</button>
                <button className={styles.detailsBtn}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessRequests;
