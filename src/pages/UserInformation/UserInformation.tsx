import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInformation.module.css";
import Stepper from "../../components/Stepper/Stepper";
import { formSteps } from "../../data/formFields";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { useFormContext } from "../../context/FormContext";
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';




const UserInformation: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData } = useFormContext();
  const [values, setValues] = useState<Record<string, any>>(data);

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData((prev) => ({ ...prev, ...values }));
    navigate("/access-details");
  };

  // For demo: inject hardcoded options for all fields to simulate DB/API
  const stepConfig = {
    ...formSteps[0],
    fields: formSteps[0].fields.map((field) => {
      if (field.name === "userName") {
        return {
          ...field,
          type: "select" as const,
          options: [
            "Amit Kumar",
            "Priya Sharma",
            "Rahul Singh",
            "Neha Patel",
            "Vikas Gupta",
          ],
          required: true,
        };
      }
      if (field.name === "employeeCode") {
        return {
          ...field,
          type: "select" as const,
          options: ["EMP001", "EMP002", "EMP003", "EMP004", "EMP005"],
          required: true,
        };
      }
      if (field.name === "department") {
        return {
          ...field,
          type: "select" as const,
          options: ["IT", "HR", "Finance", "Operations", "Sales"],
          required: true,
        };
      }
      if (field.name === "location") {
        return {
          ...field,
          type: "select" as const,
          options: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
          required: true,
        };
      }
      return { ...field, required: true };
    }),
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>PharmaCorp</h1>
        <p className={styles.subtitle}>User Access Management System</p>
        <div style={{ marginBottom: "2rem", marginTop: "4rem", borderBottom: "1px solid #ccc" }}>
          <Stepper steps={formSteps.map((s) => s.title)} currentStep={0} />
        </div>
        <div className={styles.formTitleCenter}>
        <h2 className={styles.formTitle}>{stepConfig.title} & Request Type</h2>
         <p className={styles.subTitle}>{stepConfig.subTitle}</p>
        </div>


      
<div className={styles.requestTypeSection}>
  <label className={styles.requestLabel}>Request for/by *</label>
  <div className={styles.optionGroup}>
    <div
      className={`${styles.optionCard} ${values.requestType === "Self" ? styles.selected : ""}`}
      onClick={() => handleChange("requestType", "Self")}
    >
      <PersonIcon className={styles.icon} />
      <span>Self</span>
    </div>
    <div
      className={`${styles.optionCard} ${values.requestType === "Others" ? styles.selected : ""}`}
      onClick={() => handleChange("requestType", "Others")}
    >
      <PeopleIcon className={styles.icon} />
      <span>Others</span>
    </div>
    <div
      className={`${styles.optionCard} ${values.requestType === "Vendor/OEM" ? styles.selected : ""}`}
      onClick={() => handleChange("requestType", "Vendor/OEM")}
    >
      <BusinessIcon className={styles.icon} />
      <span>Vendor/OEM</span>
    </div>
  </div>
</div>




        <form className={styles.form} onSubmit={handleSubmit} autoComplete="on">
         


          <DynamicForm
            fields={stepConfig.fields}
            values={values}
            onChange={handleChange}
          />
          <button type="submit" className={styles.continueButton}>
            Continue 
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInformation;
