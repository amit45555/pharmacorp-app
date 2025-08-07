import React, { useState } from "react";
import styles from "./WorkflowBuilder.module.css";
import Button from "../../components/Common/Button";
import InputField from "../../components/Common/InputField";

const plantOptions = ["GOA-1", "GOA-2", "GOA-3", "Gaziabad"];
const corporateOptions = [
  { label: "Corporate - Administration", maxApprovers: 1 },
  { label: "Corporate - Application (SAP)", maxApprovers: 5 },
  { label: "Corporate - Application (ZingHR)", maxApprovers: 5 },
];

type Approver = { name: string; empCode: string; email: string };
type ApproverMap = {
  [key: string]: Approver[];
};

const defaultApprovers: ApproverMap = {
  "GOA-1": [
    { name: "Krishna", empCode: "10001", email: "krishna@unichemin.com" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
  ],
  "GOA-2": [
    { name: "Namrata", empCode: "10002", email: "namrata@unichemin.com" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
  ],
  "GOA-3": [
    { name: "Nehal", empCode: "10003", email: "nehal@unichemin.com" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
  ],
  Gaziabad: [
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
  ],
  "Corporate - Administration": [
    { name: "Bhaumik", empCode: "90754", email: "Bhaumik.joshi@unichemin.com" },
  ],
  "Corporate - Application (SAP)": [
    { name: "Nehal", empCode: "10003", email: "nehal@unichemin.com" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
  ],
  "Corporate - Application (ZingHR)": [
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
    { name: "", empCode: "", email: "" },
  ],
};

const WorkflowBuilder: React.FC = () => {
  const [plant, setPlant] = useState<string>("");
  const [corporate, setCorporate] = useState<string>("");
  const [approvers, setApprovers] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", empCode: "", email: "" });

  // Handle selection change
  const handlePlantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPlant(value);
    setCorporate("");
    setApprovers(defaultApprovers[value] || []);
    setEditIndex(null);
    setForm({ name: "", empCode: "", email: "" });
  };
  const handleCorporateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCorporate(value);
    setPlant("");
    setApprovers(defaultApprovers[value] || []);
    setEditIndex(null);
    setForm({ name: "", empCode: "", email: "" });
  };

  // Add/Edit/Delete Approver
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAddApprover = () => {
    const max = plant
      ? 3
      : corporateOptions.find((c) => c.label === corporate)?.maxApprovers || 1;
    if (approvers.length < max) {
      setApprovers([...approvers, form]);
      setForm({ name: "", empCode: "", email: "" });
    }
  };
  const handleEditApprover = (idx: number) => {
    setEditIndex(idx);
    setForm(approvers[idx]);
  };
  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updated = [...approvers];
      updated[editIndex] = form;
      setApprovers(updated);
      setEditIndex(null);
      setForm({ name: "", empCode: "", email: "" });
    }
  };
  const handleDeleteApprover = (idx: number) => {
    setApprovers(approvers.filter((_, i) => i !== idx));
    setEditIndex(null);
    setForm({ name: "", empCode: "", email: "" });
  };

  // Render
  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <h2 className={styles.title}>Workflow Approver Master</h2>
      </div>
      <div className={styles.selectionRow}>
        <div className={styles.selectGroup}>
          <label className={styles.label} htmlFor="plant-select">
            Plant
          </label>
          <select
            id="plant-select"
            className={styles.select}
            value={plant}
            onChange={handlePlantChange}
            disabled={!!corporate}
          >
            <option value="">Select Plant</option>
            {plantOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.selectGroup}>
          <label className={styles.label} htmlFor="corporate-select">
            Corporate/Central
          </label>
          <select
            id="corporate-select"
            className={styles.select}
            value={corporate}
            onChange={handleCorporateChange}
            disabled={!!plant}
          >
            <option value="">Select Corporate/Central</option>
            {corporateOptions.map((c) => (
              <option key={c.label} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(plant || corporate) && (
        <div className={styles.approverSection}>
          <div className={styles.approverHeader}>
            <h3 className={styles.subTitle}>Approvers</h3>
            <span className={styles.approverCount}>
              {approvers.length} /{" "}
              {plant
                ? 3
                : corporateOptions.find((c) => c.label === corporate)
                    ?.maxApprovers || 1}
            </span>
          </div>
          <table className={styles.approverTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Emp Code</th>
                <th>Email ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvers.map((a, idx) => (
                <tr key={idx} className={styles.approverRow}>
                  <td>{idx + 1}</td>
                  <td>{a.name}</td>
                  <td>{a.empCode}</td>
                  <td>{a.email}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <Button
                        style={{
                          background: "#f5f6fa",
                          color: "#222",
                          border: "1px solid #e0e0e0",
                          minWidth: 60,
                        }}
                        onClick={() => handleEditApprover(idx)}
                        type="button"
                      >
                        Edit
                      </Button>
                      <Button
                        style={{
                          background: "#fbeee0",
                          color: "#e74c3c",
                          border: "1px solid #fbeee0",
                          minWidth: 60,
                        }}
                        onClick={() => handleDeleteApprover(idx)}
                        type="button"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.formGrid}>
            <InputField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
            <InputField
              label="Emp Code"
              name="empCode"
              value={form.empCode}
              onChange={handleInputChange}
              placeholder="Enter emp code"
            />
            <InputField
              label="Email ID"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              type="email"
            />
            <div className={styles.formBtnWrap}>
              {editIndex === null ? (
                <Button
                  style={{
                    minWidth: 120,
                    background: "#222",
                    color: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onClick={handleAddApprover}
                  type="button"
                  disabled={Boolean(
                    (plant && approvers.length >= 3) ||
                      (corporate &&
                        approvers.length >=
                          (corporateOptions.find((c) => c.label === corporate)
                            ?.maxApprovers || 1))
                  )}
                >
                  + Add Approver
                </Button>
              ) : (
                <Button
                  style={{
                    minWidth: 120,
                    background: "#27ae60",
                    color: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(39,174,96,0.08)",
                  }}
                  onClick={handleSaveEdit}
                  type="button"
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;
