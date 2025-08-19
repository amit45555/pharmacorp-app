import React, { useState } from "react";
import styles from "./ApplicationMasterTable.module.css";
import { useNavigate } from "react-router-dom";

export default function AddApplicationFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    version: "",
    equipmentId: "",
    computer: "",
    plant: "",
    status: "ACTIVE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save logic (API or context)
    navigate("/application-master");
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Application</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Application Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="version"
          placeholder="Version"
          value={form.version}
          onChange={handleChange}
          required
        />
        <input
          name="equipmentId"
          placeholder="Equipment ID"
          value={form.equipmentId}
          onChange={handleChange}
          required
        />
        <input
          name="computer"
          placeholder="Computer"
          value={form.computer}
          onChange={handleChange}
          required
        />
        <input
          name="plant"
          placeholder="Plant"
          value={form.plant}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/application-master")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
