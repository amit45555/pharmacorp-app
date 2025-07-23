import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.module.css';
import { FormProvider } from "./context/FormContext";
import UserInformation from './pages/UserInformation/UserInformation';
import AccessDetails from './pages/AccessDetails/AccessDetails';
import ReviewSubmit from './pages/ReviewSubmit/ReviewSubmit';
import GenerateCredentials from './pages/GenerateCredentials/GenerateCredentials';

const App: React.FC = () => {
  return (
     <FormProvider>
    <Routes>
      <Route path="/" element={<UserInformation />} />
      <Route path="/access-details" element={<AccessDetails />} />
      <Route path="/review-submit" element={<ReviewSubmit />} />
      <Route path="/generate-credentials" element={<GenerateCredentials />} />
    </Routes>
    </FormProvider>
  );
};

export default App;