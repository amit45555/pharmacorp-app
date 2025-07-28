import React from "react";
import styles from "../../pages/AdminDashboard.module.css";
import type { IconType } from "react-icons";

interface SidebarNavItem {
  key: string;
  icon: IconType;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  navItems: SidebarNavItem[];
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, navItems, onLogout }) => {
  return (
    <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : styles.sidebarClosed}`.trim()}>
      <div className={styles.logo}>
        <span style={{ fontWeight: 700, fontSize: 24 }}>PharmaCorp</span>
        <br />
        <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.7 }}>
          Access Management System
        </span>
      </div>
      <button
        className={styles.sidebarToggle}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        onClick={onToggle}
        type="button"
      >
        {open ? "←" : "→"}
      </button>
      <nav className={styles.nav} aria-label="Admin Navigation">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`${styles.navItem} ${item.active ? styles.active : ""}`}
            type="button"
            aria-label={item.label}
            title={item.label}
            tabIndex={0}
            onClick={item.onClick}
          >
            <span className={styles.navIcon}>{item.icon({ size: 20 })}</span>
            {open && <span className={styles.navText}>{item.label}</span>}
          </button>
        ))}
      </nav>
      <button className={styles.logout} onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar; 