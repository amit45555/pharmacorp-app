import AccessRequests from "./AccessRequests/AccessRequests";
import UserManagement from "./UserManagement/UserManagement";
import ComplianceReports from "./ComplianceReports/ComplianceReports";
import SystemAdministration from "./SystemAdministration/SystemAdministration";
import Settings from "./Settings/Settings";

import React, { useState } from "react";
import styles from "./ApproverDashboard.module.css";
import { useNavigate } from "react-router-dom";
import DashboardStats from "./AdminDashboard/DashboardStats";
import { useAuth } from "../context/AuthContext";
import { can } from "../utils/rbac";
import Sidebar from "../components/Common/Sidebar";
import {
  FaChartBar,
  FaClipboardList,
  FaUsers,
  FaCheck,
  FaCog,
  FaWrench,
  FaBell,
  FaUser,
} from "react-icons/fa";
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

const ApproverDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [requests, setRequests] = useState(initialRequests);
  const [users, setUsers] = useState(initialUsers);
  const [reports, setReports] = useState(initialReports);
  const [health, setHealth] = useState(initialHealth);
  const [settings, setSettings] = useState(initialSettings);
  const { user } = useAuth();
  const role = user?.role || "admin";
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div
      className={`${styles.container} ${
        !sidebarOpen ? styles.sidebarClosed : styles.sidebarOpen
      }`.trim()}
    >
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((open) => !open)}
        navItems={[
          {
            key: "dashboard",
            icon: FaChartBar,
            label: "Dashboard",
            active: activeSection === "dashboard",
            onClick: () => setActiveSection("dashboard"),
          },
          {
            key: "requests",
            icon: FaClipboardList,
            label: "Access Requests",
            active: activeSection === "requests",
            onClick: () => setActiveSection("requests"),
          },
          {
            key: "users",
            icon: FaUsers,
            label: "User Management",
            active: activeSection === "users",
            onClick: () => setActiveSection("users"),
          },
          {
            key: "compliance",
            icon: FaCheck,
            label: "Compliance Reports",
            active: activeSection === "compliance",
            onClick: () => setActiveSection("compliance"),
          },
          {
            key: "system",
            icon: FaCog,
            label: "System Administration",
            active: activeSection === "system",
            onClick: () => setActiveSection("system"),
          },
          {
            key: "settings",
            icon: FaWrench,
            label: "Settings",
            active: activeSection === "settings",
            onClick: () => setActiveSection("settings"),
          },
        ].filter((item) => can(role, item.key + ":view"))}
        onLogout={handleLogout}
      />
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
                {FaUser({ size: 28 })}
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
                  <TaskClosureTracking />
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

export default ApproverDashboard;
