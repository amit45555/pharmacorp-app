import React from "react";
import { Routes, Route } from "react-router-dom";
import UserInformation from "../pages/UserInformation/UserInformation";
import AccessDetails from "../pages/AccessDetails/AccessDetails";

import ReviewSubmit from "../pages/ReviewSubmit/ReviewSubmit";
import GenerateCredentials from "../pages/GenerateCredentials/GenerateCredentials";
import TrackRequest from "../pages/TrackRequest";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import MainMasterTable from "pages/MainMasterTable/MainMasterTable";

const AppRoutes: React.FC = () => (
  <Routes>
    {/* User Flow */}
    <Route path="/" element={<UserInformation />} />
    <Route path="/access-details" element={<AccessDetails />} />
    <Route path="/review-submit" element={<ReviewSubmit />} />
    <Route path="/generate-credentials" element={<GenerateCredentials />} />
    <Route path="/track-request" element={<TrackRequest />} />

    {/* Admin Flow */}

    <Route path="/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
     {/* MainMasterTable Flow */}
    
    <Route path="/MainMasterTable" element={<MainMasterTable />} />
  </Routes>
);

export default AppRoutes;
