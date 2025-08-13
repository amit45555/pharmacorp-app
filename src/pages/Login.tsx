import React, { useState } from "react";
import loginHeadTitle from "../assets/login_headTitle.png";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";

// Animated gradient wave background for a clean, premium look
const AnimatedBackground = () => (
  <div className={styles.animatedBg} aria-hidden="true">
    <svg
      className={styles.waveSvg}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="loginWaveGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f7fa" />
          <stop offset="60%" stopColor="#5ac9d8" />
          <stop offset="100%" stopColor="#007f86" />
        </linearGradient>
      </defs>
      <path
        d="M0,160L60,170C120,180,240,200,360,197.3C480,195,600,169,720,154.7C840,140,960,138,1080,154.7C1200,171,1320,213,1380,234.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        fill="url(#loginWaveGradient)"
        opacity="0.9"
      ></path>
    </svg>
    <div className={styles.gradientOverlay}></div>
  </div>
);

// Logo heading with centered image and improved design
const LogoHeading = () => (
  <div className={styles.logoHeading}>
    <div className={styles.logoRow}>
      <img
        src={loginHeadTitle}
        alt="IDAMS LITE"
        className={styles.logoLiteImg}
        style={{
          height: "3.4rem",
          marginLeft: "0.6em",
          verticalAlign: "middle",
        }}
      />
    </div>
    <div className={styles.logoUam}>User Access Management</div>
    <div className={styles.logoModule}>(UAM) Module</div>
  </div>
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
    <div className={styles.container}>
      <AnimatedBackground />
      <main className={styles.loginMain}>
        <LogoHeading />
        <form
          className={styles.loginCard}
          onSubmit={handleSubmit}
          aria-label="Login form"
        >
          <div className={styles.loginTitle}>Login</div>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>
              Username
            </label>
            <input
              id="username"
              className={styles.input}
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
              aria-required="true"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              aria-required="true"
            />
          </div>
          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}
          <button
            className={styles.loginButton}
            type="submit"
            aria-label="Login"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
