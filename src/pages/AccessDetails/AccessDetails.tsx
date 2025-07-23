import styles from './AccessDetails.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AccessDetails: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('Viewer');
  return (
    <div className={styles.container}>
      <h2>Access Details</h2>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="Viewer">Viewer</option>
        <option value="Editor">Editor</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={() => navigate('/review-submit')}>Next</button>
    </div>
  );
};

export default AccessDetails;