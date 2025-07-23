// src/pages/UserInformation/UserInformation.tsx
import styles from './UserInformation.module.css';
import { useNavigate } from 'react-router-dom';
import React,{ useState } from 'react';

const UserInformation: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', empCode: '', location: '', department: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2>User Information</h2>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
      <input name="empCode" placeholder="Employee Code" onChange={handleChange} value={form.empCode} />
      <input name="location" placeholder="Location" onChange={handleChange} value={form.location} />
      <input name="department" placeholder="Department" onChange={handleChange} value={form.department} />
      <button onClick={() => navigate('/access-details')}>Next</button>
    </div>
  );
};

export default UserInformation;
