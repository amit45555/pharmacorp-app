import styles from './ReviewSubmit.module.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const ReviewSubmit: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2>Review & Submit</h2>
      <p>Confirm the details before submission.</p>
      <button onClick={() => navigate('/generate-credentials')}>Submit</button>
    </div>
  );
};

export default ReviewSubmit;
