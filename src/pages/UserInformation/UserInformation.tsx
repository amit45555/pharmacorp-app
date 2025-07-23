import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInformation.module.css";
import Stepper from "../../components/Stepper/Stepper";
import { formSteps } from "../../data/formFields";
import DynamicForm from "../../components/DynamicForm";
import { useFormContext } from "../../context/FormContext";

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

  const stepConfig = formSteps[0];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>PharmaCorp</h1>
        <p className={styles.subtitle}>User Access Management System</p>
        <div style={{ marginBottom: "2rem" }}>
          <Stepper steps={formSteps.map((s) => s.title)} currentStep={0} />
        </div>
        <h2 className={styles.formTitle}>{stepConfig.title}</h2>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="on">
          <DynamicForm
            fields={stepConfig.fields}
            values={values}
            onChange={handleChange}
          />
          <button type="submit" className={styles.continueButton}>
            Continue ⤵
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInformation;
