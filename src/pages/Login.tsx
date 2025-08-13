import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";

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
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Admin Login</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
