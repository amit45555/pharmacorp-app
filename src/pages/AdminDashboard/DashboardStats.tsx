import React from "react";
import styles from "../AdminDashboard.module.css";

const DashboardStats: React.FC = () => {
  // In a real app, fetch these from API
  const stats = [
    {
      label: "Total Requests",
      value: 156,
      change: "+12% from last month",
      icon: "📄",
      color: "#5ac9d8",
    },
    {
      label: "Pending Requests",
      value: 23,
      change: "5 require attention",
      icon: "⏳",
      color: "#ff9800",
    },
    {
      label: "Approved Requests",
      value: 98,
      change: "+8% this week",
      icon: "✅",
      color: "#28a745",
    },
    {
      label: "Active Users",
      value: 145,
      change: "3 new today",
      icon: "👤",
      color: "#007f86",
    },
  ];
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat) => (
        <div className={styles.statCard} key={stat.label}>
          <div style={{ fontSize: 32, marginBottom: 8, color: stat.color }}>
            {stat.icon}
          </div>
          <div style={{ fontWeight: 600 }}>{stat.label}</div>
          <div className={styles.statValue}>{stat.value}</div>
          <div className={styles.statSub}>{stat.change}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
