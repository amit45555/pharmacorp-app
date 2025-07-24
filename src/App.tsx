import React from "react";
import "./App.module.css";
import { FormProvider } from "./context/FormContext";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <AppRoutes />
      </FormProvider>
    </AuthProvider>
  );
};

export default App;
