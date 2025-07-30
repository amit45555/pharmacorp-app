import React, { useState } from "react";
import styles from "./MainMasterTable.module.css";
import { FaHome, FaCogs, FaBuilding, FaShieldAlt, FaUser, FaSignOutAlt, FaThList } from "react-icons/fa";

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
            {FaHome({ size: 20 })} Dashboard
          </button>

          <div className={styles["sidebar-group"]}>MASTER DATA</div>
          <button className={`${styles["nav-button"]} ${activeTab === "plant" ? styles.active : ""}`} onClick={() => setActiveTab("plant")}> 
             {FaBuilding({ size: 20 })} Plant Master
          </button>
          <button className={`${styles["nav-button"]} ${activeTab === "role" ? styles.active : ""}`} onClick={() => setActiveTab("role")}> 
            {FaShieldAlt({ size: 20 })} Role Master
          </button>
          <button className={`${styles["nav-button"]} ${activeTab === "vendor" ? styles.active : ""}`} onClick={() => setActiveTab("vendor")}> 
                {FaThList({ size: 20 })}Vendor Master
          </button>
          <button className={`${styles["nav-button"]} ${activeTab === "application" ? styles.active : ""}`} onClick={() => setActiveTab("application")}> 
                {FaCogs({ size: 20 })} Application Master
          </button>
          <button className={`${styles["nav-button"]} ${activeTab === "user" ? styles.active : ""}`} onClick={() => setActiveTab("user")}> 
            {FaUser({ size: 20 })} User Master
          </button>

          <div className={styles["sidebar-footer"]}>
            <div className={styles["admin-info"]}>
              <div className={styles.avatar}>A</div>
              <div>
                <strong>admin</strong>
                <div className={styles.subtext}>Super Admin</div>
              </div>
            </div>
            <button className={styles["logout-button"]}>{FaSignOutAlt({ size: 20 })} Logout</button>
          </div>
        </nav>
      </aside>

      <main className={styles["main-content"]}>
        <header className={styles["main-header"]}>
          <h1>System Dashboard</h1>
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
        <Card icon="📅" label="Plants" value="4" sub="+2 this month" />
        <Card icon="📊" label="Applications" value="5" sub="+3 this week" />
        <Card icon="👤" label="Active Users" value="5" sub="+5 this month" />
        <Card icon="📦" label="Workflows" value="4" sub="All active" />
      </div>
      <div className={styles["dashboard-bottom"]}>
        <div className={styles["chart-section"]}>
          <h3>System Status Distribution</h3>
          <div className={styles["donut-placeholder"]}>[Donut Chart Placeholder]</div>
          <div className={styles.legend}>
            <span className={styles["legend-item"]}>🟦 Active Applications</span>
            <span className={styles["legend-item"]}>🟨 Inactive Applications</span>
            <span className={styles["legend-item"]}>🟥 Pending Requests</span>
            <span className={styles["legend-item"]}>🟩 Approved Requests</span>
          </div>
        </div>
        <div className={styles["activity-section"]}>
          <h3>Recent Activity</h3>
          <ul className={styles["activity-list"]}>
            <li><strong>Added SAP ERP v2.1</strong> for Mumbai Plant <span>29 Jul 2025</span></li>
            <li><strong>Request REQ001</strong> for SAP ERP access <span>29 Jul 2025</span></li>
            <li><strong>Approved REQ002</strong> for QMS access <span>29 Jul 2025</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, label, value, sub }: any) => (
  <div className={styles["overview-card"]}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.info}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.sub}>{sub}</div>
    </div>
  </div>
);

export default MainMasterTable;
