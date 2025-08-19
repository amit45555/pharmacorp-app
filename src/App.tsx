import React from "react";
import "./App.module.css";
import { FormProvider } from "./context/FormContext";
import { AuthProvider } from "./context/AuthContext";
import { RolesProvider } from "./RoleMaster/RolesContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ApplicationsProvider } from "./context/ApplicationsContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <RolesProvider>
          <UserProvider>
            <BrowserRouter>
              <ApplicationsProvider>
                <AppRoutes />
              </ApplicationsProvider>
            </BrowserRouter>
          </UserProvider>
        </RolesProvider>
      </FormProvider>
    </AuthProvider>
  );
};

export default App;
