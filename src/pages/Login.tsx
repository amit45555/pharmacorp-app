import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";

// Inline SVG for wave background
const WaveBackground = () => (
  <svg viewBox="0 0 1440 320" className={styles.waveBg}>
    <defs>
      <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5ac9d8" />
        <stop offset="100%" stopColor="#e0f7fa" />
      </linearGradient>
    </defs>
    <path
      fill="url(#waveGradient)"
      fillOpacity="1"
      d="M0,160L60,170C120,180,240,200,360,197.3C480,195,600,169,720,154.7C840,140,960,138,1080,154.7C1200,171,1320,213,1380,234.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
    ></path>
  </svg>
);

// Pixel-perfect logo heading matching the provided image
const LogoHeading = () => (
  <>
    <div className={styles.idamsHeading}>
      <span className={styles.idamsI}>
        <span className={styles.idamsDot}></span>
        <span
          style={{
            fontFamily: "Arial Black, Arial, sans-serif",
            fontStyle: "italic",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          i
        </span>
      </span>
      <span className={styles.idamsBody}>DAMS</span>
      <span className={styles.idamsLite}>LITE</span>
    </div>
    <div className={styles.uamTitle}>User Access Management</div>
    <div className={styles.uamSubtitle}>(UAM) Module</div>
  </>
);

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Find user in mockUsers
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      // Store user info in localStorage if needed
      localStorage.setItem("role", foundUser.role);
      localStorage.setItem("username", foundUser.username);
      // Route based on role, but plantAdmin always goes to /superAdmin
      if (foundUser.role === "plantAdmin") {
        navigate("/superAdmin");
      } else {
        switch (foundUser.role) {
          case "superAdmin":
            navigate("/superAdmin");
            break;
          case "approver":
            navigate("/approver");
            break;
          case "user":
            navigate("/userForm");
            break;
          default:
            navigate("/");
        }
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={`${styles.container} ${styles.containerBg}`}>
      <WaveBackground />
      <div className={styles.loginWrapper}>
        <LogoHeading />
        <form
          className={`${styles.card} ${styles.loginCard}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.loginTitle}>Login</div>
          <input
            className={`${styles.input} ${styles.inputCustom}`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            className={`${styles.input} ${styles.inputCustom}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button
            className={`${styles.button} ${styles.buttonCustom}`}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
