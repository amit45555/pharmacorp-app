// src/components/Stepper/Stepper.tsx
import React from 'react';
import styles from './Stepper.module.css';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.step} ${index <= currentStep ? styles.active : ''}`}
        >
          <div className={styles.circle}>{index + 1}</div>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
