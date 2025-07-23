import React, { createContext, useContext, useState } from "react";

interface FormData {
  accessTypes: string[];
  trainingStatus: string;
  equipmentId: string;
  appName: string;
  role: string;
  version: string;
}

interface FormContextType {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
}

const defaultData: FormData = {
  accessTypes: [],
  trainingStatus: "",
  equipmentId: "",
  appName: "",
  role: "",
  version: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FormData>(defaultData);

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used inside FormProvider");
  return context;
};
