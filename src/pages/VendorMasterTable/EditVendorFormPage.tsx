import React, { useContext } from "react";
import VendorMasterForm from "./VendorMasterForm";
import { VendorUser } from "./VendorMasterTable";
import { useNavigate, useLocation } from "react-router-dom";
import { VendorContext } from "../../context/VendorContext";

const EditVendorFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || null;
  const mode = "edit";
  const { updateVendor } = useContext(VendorContext);

  // Save handler updates vendor and navigates back
  const handleSave = (vendor: VendorUser) => {
    updateVendor(vendor);
    navigate("/vendors");
  };

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: "40px auto" }}>
      <VendorMasterForm
        onClose={() => navigate("/superadmin")}
        onSave={handleSave}
        initialData={initialData}
        mode={mode}
      />
    </div>
  );
};

export default EditVendorFormPage;
