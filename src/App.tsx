import React from "react";
import "./App.module.css";
import { FormProvider } from "./context/FormContext";
import { AuthProvider } from "./context/AuthContext";
import { RolesProvider } from "./RoleMaster/RolesContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <RolesProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </RolesProvider>
      </FormProvider>
    </AuthProvider>
  );
};

export default App;
