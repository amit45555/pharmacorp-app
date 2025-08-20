import React, { useState } from "react";
import styles from "./VendorMasterForm.module.css";

export interface VendorForm {
  empCode: string;
  vendorName: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  gstNumber: string;
  activityLogs?: any[];
}

interface Props {
  initialData?: VendorForm | null;
  mode: "add" | "edit";
  onSave: (vendor: VendorForm) => void;
  onClose: () => void;
}

const VendorMasterForm: React.FC<Props> = ({
  initialData,
  mode,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<VendorForm>(
    initialData || {
      empCode: "",
      vendorName: "",
      contactPerson: "",
      contactNumber: "",
      email: "",
      address: "",
      gstNumber: "",
      activityLogs: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {mode === "add" ? "Add Vendor" : "Edit Vendor"}
        </h2>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Vendor Code</label>
          <input
            className={styles.input}
            name="empCode"
            value={form.empCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Vendor Name</label>
          <input
            className={styles.input}
            name="vendorName"
            value={form.vendorName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Contact Person</label>
          <input
            className={styles.input}
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Contact Number</label>
          <input
            className={styles.input}
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <textarea
            className={styles.input}
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>GST Number</label>
          <input
            className={styles.input}
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveBtn}>
            {mode === "add" ? "Add Vendor" : "Save Changes"}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorMasterForm;
