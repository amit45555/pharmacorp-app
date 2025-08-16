import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ApproverDashboard.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
// Removed unused imports
import login_headTitle2 from "../assets/login_headTitle2.png";
import AccessRequests from "./AccessRequests/AccessRequests";
import UserManagement from "./UserManagement/UserManagement";
import ComplianceReports from "./ComplianceReports/ComplianceReports";
import SystemAdministration from "./SystemAdministration/SystemAdministration";
import Settings from "./Settings/Settings";
import DashboardStats from "./AdminDashboard/DashboardStats";
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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    if (location.state && location.state.activeTab) {
      return location.state.activeTab;
    }
    return "dashboard";
  });
  const [requests, setRequests] = useState(initialRequests);
  const [users, setUsers] = useState(initialUsers);
  const [reports, setReports] = useState(initialReports);
  const [health, setHealth] = useState(initialHealth);
  const [settings, setSettings] = useState(initialSettings);
  const navigate = useNavigate();
  const user = { username: "approver", role: "Approver" };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  const sidebarConfig = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      key: "requests",
      label: "Access Requests",
      icon: <ListAltIcon fontSize="small" />,
    },
    {
      key: "users",
      label: "User Management",
      icon: <PersonIcon fontSize="small" />,
    },
    {
      key: "compliance",
      label: "Compliance Reports",
      icon: <AssignmentIcon fontSize="small" />,
    },
    {
      key: "system",
      label: "System Administration",
      icon: <SettingsIcon fontSize="small" />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingsIcon fontSize="small" />,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <section className={styles.dashboardOverview}>
            <h2 className={styles.sectionTitle}>Dashboard Overview</h2>
            <div className={styles.statsGrid}>
              <DashboardStats />
            </div>
            <div className={styles.recentActivitySection}>
              <TaskClosureTracking />
            </div>
          </section>
        );
      case "requests":
        return (
          <section className={styles.sectionWrap}>
            <div className={styles.card}>
              <AccessRequests requests={requests} setRequests={setRequests} />
            </div>
          </section>
        );
      case "users":
        return (
          <section className={styles.sectionWrap}>
            <div className={styles.card}>
              <UserManagement users={users} setUsers={setUsers} />
            </div>
          </section>
        );
      case "compliance":
        return (
          <section className={styles.sectionWrap}>
            <div className={styles.card}>
              <ComplianceReports reports={reports} setReports={setReports} />
            </div>
          </section>
        );
      case "system":
        return (
          <section className={styles.sectionWrap}>
            <div className={styles.card}>
              <SystemAdministration health={health} setHealth={setHealth} />
            </div>
          </section>
        );
      case "settings":
        return (
          <section className={styles.sectionWrap}>
            <div className={styles.card}>
              <Settings settings={settings} setSettings={setSettings} />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles["main-container"]}>
      <aside className={styles.sidebar}>
        <div className={styles["sidebar-header"]}>
          <img
            src={login_headTitle2}
            alt="Company logo"
            style={{ width: 250, height: 35 }}
          />
          <br />
          <span>Unichem Laboratories</span>
        </div>
        <nav>
          <div className={styles["sidebar-group"]}>OVERVIEW</div>
          {sidebarConfig.map((item) => (
            <button
              key={item.key}
              className={`${styles["nav-button"]} ${
                activeTab === item.key ? styles.active : ""
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <div className={styles["sidebar-footer"]}>
            <div className={styles["admin-info"]}>
              <div className={styles.avatar}>A</div>
              <div>
                <strong>{user ? user.username : "approver"}</strong>
                <div className={styles.subtext}>
                  {user ? user.role : "Approver"}
                </div>
              </div>
            </div>
            <button className={styles["logout-button"]} onClick={handleLogout}>
              <LogoutIcon fontSize="small" /> Logout
            </button>
          </div>
        </nav>
      </aside>
      <main className={styles["main-content"]}>
        <header className={styles["main-header"]}>
          <h2 className={styles["header-title"]}>Approver Dashboard</h2>
          <div className={styles["header-icons"]}>
            <span className={styles["header-icon"]}>
              <NotificationsIcon fontSize="small" />
            </span>
            <span className={styles["header-icon"]}>
              <SettingsIcon fontSize="small" />
            </span>
          </div>
        </header>
        <div className={styles.pageContent}>{renderContent()}</div>
      </main>
    </div>
  );
};

export default ApproverDashboard;
