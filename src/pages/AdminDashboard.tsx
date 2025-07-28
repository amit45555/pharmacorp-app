import AccessRequests from "./AccessRequests/AccessRequests";
import UserManagement from "./UserManagement/UserManagement";
import ComplianceReports from "./ComplianceReports/ComplianceReports";
import SystemAdministration from "./SystemAdministration/SystemAdministration";
import Settings from "./Settings/Settings";

import React, { useState } from "react";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import DashboardStats from "./AdminDashboard/DashboardStats";
import { useAuth } from "../context/AuthContext";
import { can } from "../utils/rbac";
import { FaBell, FaCircleUser } from "react-icons/fa6";
import TaskClosureTracking from "./TaskClosureTracking/TaskClosureTracking";
// --- Demo/mock data for all admin sections ---
const initialRequests = [
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

const initialUsers = [
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

const initialReports = [
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

type HealthItem = {
  name: string;
  status: "ok" | "warn" | "error";
  description?: string;
};

const initialHealth: HealthItem[] = [
  {
    name: "Database Connection",
    status: "ok",
    description: "All systems operational.",
  },
  {
    name: "Authentication Service",
    status: "ok",
    description: "No issues detected.",
  },
  {
    name: "Email Notifications",
    status: "warn",
    description: "Delayed delivery detected.",
  },
];

const initialSettings = {
  emailNotifications: true,
  smsAlerts: true,
  twoFactor: true,
  autoLock: false,
};

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [requests, setRequests] = useState(initialRequests);
  const [users, setUsers] = useState(initialUsers);
  const [reports, setReports] = useState(initialReports);
  const [health, setHealth] = useState(initialHealth);
  const [settings, setSettings] = useState(initialSettings);
  const { user } = useAuth();
  const role = user?.role || "admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span style={{ fontWeight: 700, fontSize: 24 }}>PharmaCorp</span>
          <br />
          <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.7 }}>
            Access Management System
          </span>
        </div>
        <nav className={styles.nav} aria-label="Admin Navigation">
          {/* ...existing nav buttons... */}
          {can(role, "dashboard:view") && (
            <button
              className={`${styles.navItem} ${
                activeSection === "dashboard" ? styles.active : ""
              }`}
              type="button"
              aria-label="Dashboard"
              title="Dashboard"
              tabIndex={0}
              onClick={() => setActiveSection("dashboard")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setActiveSection("dashboard")
              }
            >
              <span className={styles.navIcon}>📊</span>
              <span className={styles.navText}>Dashboard</span>
            </button>
          )}
          {can(role, "requests:view") && (
            <button
              className={`${styles.navItem} ${
                activeSection === "requests" ? styles.active : ""
              }`}
              type="button"
              aria-label="Access Requests"
              title="Access Requests"
              tabIndex={0}
              onClick={() => setActiveSection("requests")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setActiveSection("requests")
              }
            >
              <span className={styles.navIcon}>📋</span>
              <span className={styles.navText}>Access Requests</span>
            </button>
          )}
          {can(role, "users:view") && (
            <button
              className={`${styles.navItem} ${
                activeSection === "users" ? styles.active : ""
              }`}
              type="button"
              aria-label="User Management"
              title="User Management"
              tabIndex={0}
              onClick={() => setActiveSection("users")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setActiveSection("users")
              }
            >
              <span className={styles.navIcon}>👥</span>
              <span className={styles.navText}>User Management</span>
            </button>
          )}
          {can(role, "compliance:view") && (
            <button
              className={`${styles.navItem} ${
                activeSection === "compliance" ? styles.active : ""
              }`}
              type="button"
              aria-label="Compliance Reports"
              title="Compliance Reports"
              tabIndex={0}
              onClick={() => setActiveSection("compliance")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setActiveSection("compliance")
              }
            >
              <span className={styles.navIcon}>✅</span>
              <span className={styles.navText}>Compliance Reports</span>
            </button>
          )}
          {can(role, "system:view") && (
            <button
              className={`${styles.navItem} ${
                activeSection === "system" ? styles.active : ""
              }`}
              type="button"
              aria-label="System Administration"
              title="System Administration"
              tabIndex={0}
              onClick={() => setActiveSection("system")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setActiveSection("system")
              }
            >
              <span className={styles.navIcon}>⚙️</span>
              <span className={styles.navText}>System Administration</span>
            </button>
          )}
          {can(role, "settings:view") && (
            <button
              className={`${styles.navItem} ${
                activeSection === "settings" ? styles.active : ""
              }`}
              type="button"
              aria-label="Settings"
              title="Settings"
              tabIndex={0}
              onClick={() => setActiveSection("settings")}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                setActiveSection("settings")
              }
            >
              <span className={styles.navIcon}>🔧</span>
              <span className={styles.navText}>Settings</span>
            </button>
          )}
          <div className={styles.logoutDesign}>
          <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
        </div>
        </nav>
        
      </aside>
      <div className={styles.mainContent}>
        <main>
          <header className={styles.header}>
            <div className={styles.searchWrap}>
              <input
                className={styles.search}
                placeholder="Search users, requests, equipment..."
              />
            </div>
            <div
              className={styles.headerIcons}
              style={{ marginRight: 0, marginLeft: "auto", gap: 10 }}
            >
              <span
                className={styles.bellIcon}
                title="Notifications"
                style={{ marginRight: 8 }}
              >
                {FaBell({ size: 20 })}
              </span>
              <span
                className={styles.avatar}
                title="Profile"
                style={{ marginRight: 8 }}
              >
                {FaCircleUser({ size: 28 })}
              </span>
              <div className={styles.profileWrap} style={{ marginLeft: 0 }}>
                <span className={styles.profileName}>Dr. Sarah Mitchell</span>
                <span className={styles.profileRole}>System Administrator</span>
              </div>
            </div>
          </header>
          <div className={styles.pageContent}>
            {activeSection === "dashboard" && (
              <section className={styles.dashboardOverview}>
                <h2 className={styles.sectionTitle}>Dashboard Overview</h2>
                <div className={styles.statsGrid}>
                 
                  <DashboardStats />
                
                   
               </div>

                <div className={styles.recentActivitySection}>
                 
                  <TaskClosureTracking/>
                </div>
              </section>
            )}
            {activeSection === "requests" && (
              <section className={styles.sectionWrap}>
                <div className={styles.card}>
                  <AccessRequests
                    requests={requests}
                    setRequests={setRequests}
                  />
                </div>
              </section>
            )}
            {activeSection === "users" && (
              <section className={styles.sectionWrap}>
                <div className={styles.card}>
                  <UserManagement users={users} setUsers={setUsers} />
                </div>
              </section>
            )}
            {activeSection === "compliance" && (
              <section className={styles.sectionWrap}>
                <div className={styles.card}>
                  <ComplianceReports
                    reports={reports}
                    setReports={setReports}
                  />
                </div>
              </section>
            )}
            {activeSection === "system" && (
              <section className={styles.sectionWrap}>
                <div className={styles.card}>
                  <SystemAdministration health={health} setHealth={setHealth} />
                </div>
              </section>
            )}
            {activeSection === "settings" && (
              <section className={styles.sectionWrap}>
                <div className={styles.card}>
                  <Settings settings={settings} setSettings={setSettings} />
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
