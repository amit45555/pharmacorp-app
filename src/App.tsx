import React from "react";
import "./App.module.css";
import { FormProvider } from "./context/FormContext";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <FormProvider>
      <AppRoutes />
    </FormProvider>
  );
};

export default App;
