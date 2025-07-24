import React, { useState } from "react";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import AccessRequests from "./AccessRequests/AccessRequests";
import UserManagement from "./UserManagement/UserManagement";
import ComplianceReports from "./ComplianceReports/ComplianceReports";
import SystemAdministration from "./SystemAdministration/SystemAdministration";
import Settings from "./Settings/Settings";

const AdminDashboard: React.FC = () => {
  // const [requests, setRequests] = useState<Request[]>([]);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // For demo, use mock data. Replace with API call in real app.
  //   setRequests(mockRequests);
  // }, []);

  // const handleApprove = (id: string) => {
  //   setRequests((prev) =>
  //     prev.map((req) =>
  //       req.requestId === id
  //         ? {
  //             ...req,
  //             status: "approved",
  //             logs: [
  //               ...req.logs,
  //               {
  //                 timestamp: new Date().toISOString(),
  //                 message: "Request approved by IT",
  //               },
  //             ],
  //           }
  //         : req
  //     )
  //   );
  // };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          PharmaCorp
          <br />
          <span style={{ fontSize: 12, fontWeight: 400 }}>
            Access Management System
          </span>
        </div>
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${
              activeSection === "dashboard" ? styles.active : ""
            }`}
            type="button"
            onClick={() => setActiveSection("dashboard")}
          >
            <span role="img" aria-label="Dashboard">
              📊
            </span>{" "}
            Dashboard
          </button>
          <button
            className={`${styles.navItem} ${
              activeSection === "requests" ? styles.active : ""
            }`}
            type="button"
            onClick={() => setActiveSection("requests")}
          >
            <span role="img" aria-label="Access Requests">
              📋
            </span>{" "}
            Access Requests
          </button>
          <button
            className={`${styles.navItem} ${
              activeSection === "users" ? styles.active : ""
            }`}
            type="button"
            onClick={() => setActiveSection("users")}
          >
            <span role="img" aria-label="User Management">
              👥
            </span>{" "}
            User Management
          </button>
          <button
            className={`${styles.navItem} ${
              activeSection === "compliance" ? styles.active : ""
            }`}
            type="button"
            onClick={() => setActiveSection("compliance")}
          >
            <span role="img" aria-label="Compliance Reports">
              ✅
            </span>{" "}
            Compliance Reports
          </button>
          <button
            className={`${styles.navItem} ${
              activeSection === "system" ? styles.active : ""
            }`}
            type="button"
            onClick={() => setActiveSection("system")}
          >
            <span role="img" aria-label="System Administration">
              ⚙️
            </span>{" "}
            System Administration
          </button>
          <button
            className={`${styles.navItem} ${
              activeSection === "settings" ? styles.active : ""
            }`}
            type="button"
            onClick={() => setActiveSection("settings")}
          >
            <span role="img" aria-label="Settings">
              🔧
            </span>{" "}
            Settings
          </button>
        </nav>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.searchWrap}>
            <input
              className={styles.search}
              placeholder="Search users, requests, equipment..."
            />
          </div>
          <div className={styles.profileWrap}>
            <span className={styles.profileName}>Dr. Sarah Mitchell</span>
            <span className={styles.profileRole}>System Administrator</span>
          </div>
        </header>
        {activeSection === "dashboard" && (
          <section className={styles.dashboardOverview}>
            <h2>Dashboard Overview</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div>Total Requests</div>
                <div className={styles.statValue}>156</div>
                <div className={styles.statSub}>+12% from last month</div>
              </div>
              <div className={styles.statCard}>
                <div>Pending Requests</div>
                <div className={styles.statValue}>23</div>
                <div className={styles.statSub}>5 require attention</div>
              </div>
              <div className={styles.statCard}>
                <div>Approved Requests</div>
                <div className={styles.statValue}>98</div>
                <div className={styles.statSub}>+8% this week</div>
              </div>
              <div className={styles.statCard}>
                <div>Active Users</div>
                <div className={styles.statValue}>145</div>
                <div className={styles.statSub}>3 new today</div>
              </div>
            </div>
          </section>
        )}
        {activeSection === "requests" && <AccessRequests />}
        {activeSection === "users" && <UserManagement />}
        {activeSection === "compliance" && <ComplianceReports />}
        {activeSection === "system" && <SystemAdministration />}
        {activeSection === "settings" && <Settings />}
      </main>
    </div>
  );
};

export default AdminDashboard;
