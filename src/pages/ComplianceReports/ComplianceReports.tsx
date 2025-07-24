import React, { useState } from "react";
import styles from "./ComplianceReports.module.css";

const mockReports = [
  {
    id: "CR-001",
    department: "Quality Control",
    application: "Laboratory Information System",
    period: "Q2 2025",
    status: "Compliant",
    lastAudit: "2025-06-15",
  },
  {
    id: "CR-002",
    department: "R&D",
    application: "Clinical Data Management",
    period: "Q2 2025",
    status: "Non-Compliant",
    lastAudit: "2025-06-10",
  },
];

const ComplianceReports: React.FC = () => {
  const [reports] = useState(mockReports);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Compliance Reports</h1>
      <div className={styles.filtersRow}>
        <input className={styles.search} placeholder="Search reports..." />
        <select className={styles.filter} defaultValue="All Departments">
          <option>All Departments</option>
        </select>
        <select className={styles.filter} defaultValue="All Applications">
          <option>All Applications</option>
        </select>
      </div>
      <table className={styles.reportsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Application</th>
            <th>Period</th>
            <th>Status</th>
            <th>Last Audit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.department}</td>
              <td>{report.application}</td>
              <td>{report.period}</td>
              <td>
                <span
                  className={
                    report.status === "Compliant"
                      ? styles.statusCompliant
                      : styles.statusNonCompliant
                  }
                >
                  {report.status}
                </span>
              </td>
              <td>{report.lastAudit}</td>
              <td>
                <button className={styles.actionBtn}>View</button>
                <button className={styles.actionBtn}>Export</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplianceReports;
