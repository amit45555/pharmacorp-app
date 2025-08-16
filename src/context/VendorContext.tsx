import React, { createContext, useState } from "react";
import { VendorUser } from "../pages/VendorMasterTable/VendorMasterTable";

interface VendorContextType {
  vendors: VendorUser[];
  addVendor: (vendor: VendorUser) => void;
  updateVendor: (vendor: VendorUser) => void;
}

export const VendorContext = createContext<VendorContextType>({
  vendors: [],
  addVendor: () => {},
  updateVendor: () => {},
});

export const VendorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vendors, setVendors] = useState<VendorUser[]>([]);

  const addVendor = (vendor: VendorUser) => {
    setVendors((prev) => [vendor, ...prev]);
  };

  const updateVendor = (vendor: VendorUser) => {
    setVendors((prev) => {
      const idx = prev.findIndex((v) => v.empCode === vendor.empCode);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = vendor;
      return updated;
    });
  };

  return (
    <VendorContext.Provider value={{ vendors, addVendor, updateVendor }}>
      {children}
    </VendorContext.Provider>
  );
};
