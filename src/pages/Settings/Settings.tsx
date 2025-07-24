import React, { useState } from "react";
import styles from "./Settings.module.css";

const initialSettings = {
  emailNotifications: true,
  smsAlerts: true,
  twoFactor: true,
  autoLock: false,
};

const Settings: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.sectionCard}>
        <div className={styles.sectionTitle}>System Configuration</div>
        <div className={styles.settingsGrid}>
          <div className={styles.settingsCol}>
            <div className={styles.label} style={{ marginBottom: 12 }}>
              Notification Settings
            </div>
            <div className={styles.settingRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                id="emailNotifications"
              />
              <label htmlFor="emailNotifications">
                Email notifications for new requests
              </label>
            </div>
            <div className={styles.settingRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                name="smsAlerts"
                checked={settings.smsAlerts}
                onChange={handleChange}
                id="smsAlerts"
              />
              <label htmlFor="smsAlerts">SMS alerts for urgent approvals</label>
            </div>
          </div>
          <div className={styles.settingsCol}>
            <div className={styles.label} style={{ marginBottom: 12 }}>
              Security Settings
            </div>
            <div className={styles.settingRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                name="twoFactor"
                checked={settings.twoFactor}
                onChange={handleChange}
                id="twoFactor"
              />
              <label htmlFor="twoFactor">
                Two-factor authentication required
              </label>
            </div>
            <div className={styles.settingRow}>
              <input
                type="checkbox"
                className={styles.checkbox}
                name="autoLock"
                checked={settings.autoLock}
                onChange={handleChange}
                id="autoLock"
              />
              <label htmlFor="autoLock">Auto-lock after 30 minutes</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
