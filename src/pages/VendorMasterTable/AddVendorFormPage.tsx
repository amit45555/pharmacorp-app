import React, { useContext } from "react";
import VendorMasterForm, { VendorForm } from "./VendorMasterForm";
import { useNavigate, useLocation } from "react-router-dom";
import { VendorContext } from "../../context/VendorContext";

const AddVendorFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.initialData || null;
  const mode = location.state?.mode || "add";
  const { addVendor } = useContext(VendorContext);

  // Save handler maps VendorForm to VendorUser and updates vendor list
  const handleSave = (vendor: VendorForm) => {
    const newVendor = {
      empCode: vendor.empCode,
      fullName: vendor.vendorName,
      email: vendor.email,
      department: "", // You may want to add a department field to the form
      status: "Active", // Default status
      plants: [], // Default empty array
      centralPermission: false,
      comment: "",
      corporateAccessEnabled: false,
      activityLogs: [],
      // Optionally add other fields from VendorUser type if needed
      // You can also add vendor-specific fields as custom properties
    };
    addVendor(newVendor);
    navigate("/superadmin");
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
