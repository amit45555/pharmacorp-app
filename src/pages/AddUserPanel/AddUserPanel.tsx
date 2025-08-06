import React, { useState } from "react";
import styles from "./AddUserPanel.module.css";
import ConfirmLoginModal from "pages/ConfirmLoginModal/ConfirmLoginModal";

const plants = ["GOA", "GOA-1", "Mumbai", "Delhi", "Bangalore"];
const modules = [
  "Central",
  "Role Master",
  "Vendor Master",
  "Plant Master",
  "Application Master",
  "Approval Workflow",
];
const permissions = ["Add", "Edit", "View", "Delete"];

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
  centralPermission: boolean;
  comment: string;
  corporateAccessEnabled: boolean;

};

interface AddUserPanelProps {
  onClose: () => void;
  onSave: (user: UserForm) => void;
  initialData?: UserForm | null;
  mode?: "add" | "edit";
}

const AddUserPanel = ({
  onClose,
  onSave,
  initialData = null,
  mode = "add",
}: AddUserPanelProps) => {
  const [form, setForm] = useState<UserForm>(() => {
  const base: UserForm = initialData ?? {
    fullName: "",
    email: "",
    empCode: "",
    department: "",
    status: "Active",
    plants: [],
    permissions: {},
    centralPermission: false,
    comment: "",
    corporateAccessEnabled: false,
  };

  const safePermissions: { [key: string]: string[] } = base.permissions || {};
  const permissionsWithAllModules = modules.reduce((acc, mod) => {
    acc[mod] = safePermissions[mod] || [];
    return acc;
  }, {} as { [key: string]: string[] });

  return { ...base, permissions: permissionsWithAllModules };
});


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

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); // show login modal before saving
  };

  const handleConfirmLogin = (userId: string, password: string) => {
    if (userId === "admin" && password === "password123") {
      onSave(form); // save only after successful login
      setShowModal(false);
      onClose(); // close panel
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <form className={styles.panel} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>
            {mode === "edit" ? `Edit User - ${form.fullName}` : "Add New User"}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.form}>
          <label className={styles.formLabel}>User Details</label>
          <div className={styles.grid}>
            <div>
              <label>Full Name *</label>
              <input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
            <div>
              <label>Email *</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label>Employee Code *</label>
              <input
                value={form.empCode}
                onChange={(e) => setForm({ ...form, empCode: e.target.value })}
              />
            </div>
            <div>
              <label>Department *</label>
              <select
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              >
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
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className={styles.formLabel}>Plant Selection</label>
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
             
{form.plants.map((plant) => (
  <div key={plant} className={`${styles.plantTableWrapper} ${styles.fadeIn}`}>
    <label className={styles.sectionTitle}>Module Permissions for {plant}</label>
    <div className={styles.table}>
      <div className={styles.rowHeader}>
        <span>Module Name</span>
        {permissions.map((perm) => (
          <span key={perm}>{perm}</span>
        ))}
      </div>
     {["Role Master", "Vendor Master", "Plant Master", "Application Master", "Approval Workflow"].map((mod) => {
  const moduleKey = `${plant}-${mod}`;
  return (
    <div className={styles.row} key={moduleKey}>
      <span>{mod}</span>
      {permissions.map((perm) => {
        const isApprovalWorkflow = mod === "Approval Workflow";
        const isDisabled = isApprovalWorkflow && (perm === "Add" || perm === "Delete");

        return (
          <input
            key={perm}
            type="checkbox"
            checked={form.permissions[moduleKey]?.includes(perm) || false}
            disabled={isDisabled}
            onChange={() =>
              !isDisabled && handlePermissionToggle(moduleKey, perm)
            }
          />
        );
      })}
    </div>
  );
})}

    </div>
  </div>
))}

<div>
  <label className={styles.formLabel}>Corporate Access</label>
  <div className={styles.centralTable}>
    <div className={styles.rowCheckbox}>
      <input
        type="checkbox"
        id="corporateAccess"
        checked={form.corporateAccessEnabled}
        onChange={(e) =>
          setForm({
            ...form,
            corporateAccessEnabled: e.target.checked,
          })
        }
      />
      <label htmlFor="corporateAccess">Enable Corporate Access</label>
    </div>
  </div>
</div>

{form.corporateAccessEnabled && (
  <div className={`${styles.centralSection} ${styles.fadeIn}`}>
    <label className={styles.sectionTitle}>Module Permissions for Corporate Access</label>
    <div className={styles.table}>
      <div className={styles.rowHeader}>
        <span>Module Name</span>
        {permissions.map((perm) => (
          <span key={perm}>{perm}</span>
        ))}
      </div>
      {["Role Master", "Vendor Master", "Plant Master", "Application Master", "Approval Workflow"].map((mod) => (
        <div className={styles.row} key={`corporate-${mod}`}>
          <span>{mod}</span>
          {permissions.map((perm) => (
            <input
              key={perm}
              type="checkbox"
              checked={form.permissions[`corporate-${mod}`]?.includes(perm) || false}
              onChange={() => handlePermissionToggle(`corporate-${mod}`, perm)}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
)}


          <div>
            <label className={styles.formLabel}>Central Master Permission</label>
            <div className={styles.centralTable}>
              <div className={styles.rowCheckbox}>
                <input
                  type="checkbox"
                  id="centralPermission"
                  checked={form.centralPermission}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      centralPermission: e.target.checked,
                    })
                  }
                />
                <label htmlFor="centralPermission">
                  Enable Central Master Permission
                </label>
              </div>
            </div>
          </div>

         {form.centralPermission && (
  <div className={`${styles.centralSection} ${styles.fadeIn}`}>
    <label className={styles.sectionTitle}>Module Permissions for Central Master</label>
    <div className={styles.table}>
      <div className={styles.rowHeader}>
        <span>Module Name</span>
        {permissions.map((perm) => (
          <span key={perm}>{perm}</span>
        ))}
      </div>
      {["Role Master", "Vendor Master", "Plant Master", "Application Master", "Approval Workflow"].map((mod) => (
        <div className={styles.row} key={`central-${mod}`}>
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
)}


          <div className={styles.commentBox}>
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              placeholder="Enter comment here..."
              value={form.comment}
              onChange={(e) =>
                setForm({ ...form, comment: e.target.value })
              }
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              {mode === "edit" ? "Update User" : "Save User"}
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Modal moved inside JSX return */}
      {showModal && (
        <ConfirmLoginModal
          onConfirm={handleConfirmLogin}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default AddUserPanel;
