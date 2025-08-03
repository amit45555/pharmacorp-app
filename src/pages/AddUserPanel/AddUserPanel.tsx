import React, { useState } from 'react';
import styles from './AddUserPanel.module.css';

const plants = ['GOA', 'GOA-1', 'Mumbai', 'Delhi', 'Bangalore'];
const modules = ['Central', 'Role Master', 'Vendor Master', 'Plant Master', 'Application Master', 'Approval Workflow'];
const permissions = ['Add', 'Edit', 'View', 'Delete'];

type UserForm = {
  fullName: string;
  email: string;
  empCode: string;
  department: string;
  status: string;
  plants: string[];
  permissions: {
    [key: string]: string[];
  };
};

interface AddUserPanelProps {
  onClose: () => void;
  onSave: (user: UserForm) => void;
  initialData?: UserForm | null;
  mode?: 'add' | 'edit';
}

const AddUserPanel = ({ onClose, onSave, initialData = null, mode = 'add' }: AddUserPanelProps) => {
  const [form, setForm] = useState<UserForm>(
    initialData || {
      fullName: '',
      email: '',
      empCode: '',
      department: '',
      status: 'Active',
      plants: [],
      permissions: {},
    }
  );

  const handleCheckboxChange = (plant: string) => {
    setForm((prev) => ({
      ...prev,
      plants: prev.plants.includes(plant)
        ? prev.plants.filter((p) => p !== plant)
        : [...prev.plants, plant],
    }));
  };

  const handlePermissionToggle = (module: string, action: string) => {
    setForm((prev) => {
      const current = prev.permissions[module] || [];
      const updated = current.includes(action)
        ? current.filter((a) => a !== action)
        : [...current, action];
      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [module]: updated,
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>{mode === 'edit' ? `Edit User - ${form.fullName}` : 'Add New User'}</h2>
        <button type="button" className={styles.closeBtn} onClick={onClose}>×</button>
      </div>

      <div className={styles.form}>
        {/* User Details */}
        <div className={styles.grid}>
          <div>
            <label>Full Name *</label>
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </div>
          <div>
            <label>Email *</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label>Employee Code *</label>
            <input value={form.empCode} onChange={(e) => setForm({ ...form, empCode: e.target.value })} />
          </div>
          <div>
            <label>Department *</label>
            <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="QA">QA</option>
              <option value="HR">HR</option>
              <option value="Production">Production</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div>
            <label>Status *</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Plant Selection */}
        <div>
          <label>Plant Selection</label>
          <div className={styles.plants}>
            {plants.map((plant) => (
              <label key={plant}>
                <input
                  type="checkbox"
                  checked={form.plants.includes(plant)}
                  onChange={() => handleCheckboxChange(plant)}
                />
                {plant}
              </label>
            ))}
          </div>
        </div>

        {/* Module Permissions */}
        <div>
          <label>Module Permissions</label>
          <div className={styles.table}>
            <div className={styles.rowHeader}>
              <span>Module Name</span>
              {permissions.map((perm) => <span key={perm}>{perm}</span>)}
            </div>
            {modules.map((mod) => (
              <div className={styles.row} key={mod}>
                <span>{mod}</span>
                {permissions.map((perm) => (
                  <input
                    key={perm}
                    type="checkbox"
                    checked={form.permissions[mod]?.includes(perm) || false}
                    onChange={() => handlePermissionToggle(mod, perm)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={styles.saveBtn}>
            {mode === 'edit' ? 'Update User' : 'Save User'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddUserPanel;
