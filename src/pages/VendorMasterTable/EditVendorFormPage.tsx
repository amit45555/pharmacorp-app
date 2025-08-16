import React, { useContext } from "react";
import AddUserPanel, { UserForm } from "../AddUserPanel/AddUserPanel";
import { useNavigate, useLocation } from "react-router-dom";
import { VendorContext } from "../../context/VendorContext";

const EditVendorFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || null;
  const mode = "edit";
  const { updateVendor } = useContext(VendorContext);

  // Save handler updates vendor and navigates back
  const handleSave = (user: UserForm) => {
    updateVendor({
      ...user,
      permissions: user.permissions.vendor || [],
    });
    navigate("/vendors");
  };

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: "40px auto" }}>
      <AddUserPanel
        onClose={() => navigate("/vendors")}
        onSave={handleSave}
        initialData={initialData}
        mode={mode}
      />
    </div>
  );
};

export default EditVendorFormPage;
