import React, { useContext } from "react";
import VendorMasterForm from "./VendorMasterForm";
import { VendorUser } from "./VendorMasterTable";
import { useNavigate, useLocation } from "react-router-dom";
import { VendorContext } from "../../context/VendorContext";

const AddVendorFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || null;
  const mode = location.state?.mode || "add";
  const { addVendor } = useContext(VendorContext);

  // Save handler: add vendor directly (VendorUser)
  const handleSave = (vendor: VendorUser) => {
    addVendor(vendor);
    navigate("/vendors");
  };

  return (
    <div className="formContainer">
      <VendorMasterForm
        onClose={() => navigate("/superadmin")}
        onSave={handleSave}
        initialData={initialData}
        mode={mode}
      />
    </div>
  );
};

export default AddVendorFormPage;
