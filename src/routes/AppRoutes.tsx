import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserInformation from '../pages/UserInformation/UserInformation';
import AccessDetails from '../pages/AccessDetails/AccessDetails';
import ReviewSubmit from '../pages/ReviewSubmit/ReviewSubmit';
import GenerateCredentials from '../pages/GenerateCredentials/GenerateCredentials';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<UserInformation />} />
    <Route path="/access-details" element={<AccessDetails />} />
    <Route path="/review-submit" element={<ReviewSubmit />} />
    <Route path="/generate-credentials" element={<GenerateCredentials />} />
  </Routes>
);

export default AppRoutes;
