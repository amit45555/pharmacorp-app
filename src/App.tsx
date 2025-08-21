import React from "react";
import "./App.module.css";
import { BrowserRouter } from "react-router-dom";

import { FormProvider } from "./context/FormContext";
import { AuthProvider } from "./context/AuthContext";
import { RolesProvider } from "./RoleMaster/RolesContext";
import { UserProvider } from "./context/UserContext";
import { ApplicationsProvider } from "./context/ApplicationsContext";

import AppRoutes from "./routes/AppRoutes";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <RolesProvider>
          <UserProvider>
            <ApplicationsProvider>
              <BrowserRouter>
                {/* Main App Routes */}
                <AppRoutes />

                {/* Vercel Integrations */}
                <SpeedInsights />
                <Analytics />
              </BrowserRouter>
            </ApplicationsProvider>
          </UserProvider>
        </RolesProvider>
      </FormProvider>
    </AuthProvider>
  );
};

export default App;
