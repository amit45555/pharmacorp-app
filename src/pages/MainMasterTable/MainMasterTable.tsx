import React, { useState } from "react";
import styles from "./MainMasterTable.module.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FactoryIcon from '@mui/icons-material/Factory';
import SecurityIcon from '@mui/icons-material/Security';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import SyncIcon from '@mui/icons-material/Sync';
import DonutChart from "../../components/Common/DonutChart";
const MainMasterTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      // Add placeholders or actual components below:
      case "plant":
        return <div>Plant Master Table</div>;
      case "role":
        return <div>Role Master Table</div>;
      case "vendor":
        return <div>Vendor Master Table</div>;
      case "application":
        return <div>Application Master Table</div>;
      case "user":
        return <div>User Master Table</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles["main-container"]}>
      <aside className={styles.sidebar}>
        <div className={styles["sidebar-header"]}>IDAMS LITE<br /><span>Unichem Laboratories</span></div>
        <nav>
          <div className={styles["sidebar-group"]}>OVERVIEW</div>
  <button className={`${styles["nav-button"]} ${activeTab === "dashboard" ? styles.active : ""}`} onClick={() => setActiveTab("dashboard")}> 
    <DashboardIcon fontSize="small" /> Dashboard
  </button>

          <div className={styles["sidebar-group"]}>MASTER DATA</div>
  <button className={`${styles["nav-button"]} ${activeTab === "plant" ? styles.active : ""}`} onClick={() => setActiveTab("plant")}> 
     <FactoryIcon fontSize="small" /> Plant Master
  </button>
  <button className={`${styles["nav-button"]} ${activeTab === "role" ? styles.active : ""}`} onClick={() => setActiveTab("role")}> 
    <SecurityIcon fontSize="small" /> Role Master
  </button>
  <button className={`${styles["nav-button"]} ${activeTab === "vendor" ? styles.active : ""}`} onClick={() => setActiveTab("vendor")}> 
        <ListAltIcon fontSize="small" /> Vendor Master
  </button>
  <button className={`${styles["nav-button"]} ${activeTab === "application" ? styles.active : ""}`} onClick={() => setActiveTab("application")}> 
        <AppsIcon fontSize="small" /> Application Master
  </button>
  <button className={`${styles["nav-button"]} ${activeTab === "user" ? styles.active : ""}`} onClick={() => setActiveTab("user")}> 
    <PersonIcon fontSize="small" /> User Master
  </button>

          <div className={styles["sidebar-footer"]}>
            <div className={styles["admin-info"]}>
              <div className={styles.avatar}>A</div>
              <div>
                <strong>admin</strong>
                <div className={styles.subtext}>Super Admin</div>
              </div>
            </div>
  <button className={styles["logout-button"]}><LogoutIcon fontSize="small" /> Logout</button>
          </div>
        </nav>
      </aside>
       
      <main className={styles["main-content"]}>
        <header className={styles["main-header"]}>
  <h2 className={styles["header-title"]}>System Dashboard</h2>
  <div className={styles["header-icons"]}>
    <span className={styles["header-icon"]}><NotificationsIcon fontSize="small" /></span>
    <span className={styles["header-icon"]}><SettingsIcon fontSize="small" /></span>
  </div>
</header>

        {renderContent()}
      </main>
    </div>
  );
};

const DashboardView = () => {
  return (
    <div className={styles.dashboard}>
      <h2>System Overview</h2>
      <div className={styles["overview-cards"]}>
        <Card icon={<CalendarMonthIcon fontSize="medium" />} color="#1a8e3a" label="Plants" value="4" sub="+2 this month" />
        <Card icon={<AssignmentIcon fontSize="medium" />} color="#1a61d1" label="Applications" value="5" sub="+3 this week" />
        <Card icon={<GroupIcon fontSize="medium" />} color="#005b4f" label="Active Users" value="5" sub="+5 this month" />
        <Card icon={<ListAltIcon fontSize="medium" />}  color="#ff8000" label="Workflows" value="4" sub="All active" />
      </div>

      <div className={styles["dashboard-bottom"]}>
        <div className={styles["chart-section"]}>
          <h3>System Status Distribution</h3>
          <div className={styles["donut-chart-wrapper"]}>
  <DonutChart />
</div>

          <div className={styles.legend}>
            <span className={styles["legend-item"]}><span className={styles["legend-dot"]} style={{ backgroundColor: "#22c0d3" }}></span> Active Applications</span>

           
            <span className={styles["legend-item"]}>🟨 Inactive Applications</span>
            <span className={styles["legend-item"]}>🟥 Pending Requests</span>
            <span className={styles["legend-item"]}>🟩 Approved Requests</span>
            
          </div>
        </div>
        <div className={styles["activity-section"]}>
          <h3>Recent Activity</h3>
          <ul className={styles["activity-list"]}>
            <li>
              <div className={styles["activity-icon"]}><SyncIcon fontSize="small" /></div>
              <div>
                <strong>Added SAP ERP v2.1</strong> for Mumbai Plant
                <span><br/>29 Jul 2025</span>
              </div>
            </li>
            <li>
              <div className={styles["activity-icon"]}><SyncIcon fontSize="small" /></div>
              <div>
                <strong>Request REQ001</strong> for SAP ERP access
                <span><br/>29 Jul 2025</span>
              </div>
            </li>
            <li>
              <div className={styles["activity-icon"]}><SyncIcon fontSize="small" /></div>
              <div>
                <strong>Approved REQ002</strong> for QMS access
                <span><br/>29 Jul 2025</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, label, value, sub, color }: any) => (
  <div className={styles["overview-card"]}>
    <div className={styles.iconBox} style={{ backgroundColor: color }}>{icon}</div>
    <div className={styles.info}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.sub}>{sub}</div>
    </div>
  </div>
);

export default MainMasterTable;
