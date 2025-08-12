import React from "react";
import { Routes, Route } from "react-router-dom";
import UserInformation from "../pages/UserInformation/UserInformation";
import AccessDetails from "../pages/AccessDetails/AccessDetails";

import ReviewSubmit from "../pages/ReviewSubmit/ReviewSubmit";
import GenerateCredentials from "../pages/GenerateCredentials/GenerateCredentials";
import TrackRequest from "../pages/TrackRequest";
import Login from "../pages/Login";
import ApproverDashboard from "../pages/ApproverDashboard";
import SuperAdmin from "pages/SuperAdmin/SuperAdmin";

const AppRoutes: React.FC = () => (
  <Routes>
    {/* User Flow */}
    <Route path="/" element={<UserInformation />} />
    <Route path="/access-details" element={<AccessDetails />} />
    <Route path="/review-submit" element={<ReviewSubmit />} />
    <Route path="/generate-credentials" element={<GenerateCredentials />} />
    <Route path="/track-request" element={<TrackRequest />} />

    {/* Admin Flow */}

    <Route path="/login" element={<Login />} />
    <Route path="/approver" element={<ApproverDashboard />} />
    {/* MainMasterTable Flow */}

    <Route path="/superadmin" element={<SuperAdmin />} />
  </Routes>
);

export default AppRoutes;
