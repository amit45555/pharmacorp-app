import React from "react";
import styles from "./PlantMasterTable.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const plantData = [
  {
    name: "Mumbai Plant",
    description: "Manufacturing facility in Mumbai",
    location: "Maharashtra, India",
    status: "ACTIVE",
  },
  {
    name: "Goa Plant",
    description: "Oral solid dosage facility in Goa",
    location: "Goa, India",
    status: "ACTIVE",
  },
  {
    name: "Chennai Plant",
    description: "API manufacturing facility",
    location: "Tamil Nadu, India",
    status: "ACTIVE",
  },
  {
    name: "Pune Plant",
    description: "R&D and formulation center",
    location: "Maharashtra, India",
    status: "ACTIVE",
  },
];

const PlantMasterTable: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Plant Master</h3>
        <div className={styles.actions}>
          <button className={styles.add}><AddIcon fontSize="small" /> Add New</button>
          <button className={styles.edit}><EditIcon fontSize="small" /> Edit</button>
          <button className={styles.delete}><DeleteIcon fontSize="small" /> Delete</button>
        </div>
      </div>

      <div className={styles.searchRow}>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Plant Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plantData.map((plant, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{plant.name}</td>
              <td>{plant.description}</td>
              <td>{plant.location}</td>
              <td><span className={styles.status}>{plant.status}</span></td>
              <td><VisibilityIcon style={{ color: "#4a5568" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantMasterTable;
