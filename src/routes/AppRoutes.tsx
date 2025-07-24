import React from "react";
import { Routes, Route } from "react-router-dom";
import UserInformation from "../pages/UserInformation/UserInformation";
import AccessDetails from "../pages/AccessDetails/AccessDetails";

import ReviewSubmit from "../pages/ReviewSubmit/ReviewSubmit";
import GenerateCredentials from "../pages/GenerateCredentials/GenerateCredentials";
import TrackRequest from "../pages/TrackRequest";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AccessRequests from "../pages/AccessRequests/AccessRequests";
import UserManagement from "../pages/UserManagement/UserManagement";
import ComplianceReports from "../pages/ComplianceReports/ComplianceReports";
import SystemAdministration from "../pages/SystemAdministration/SystemAdministration";
import Settings from "../pages/Settings/Settings";

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
    <Route path="/admin/access-requests" element={<AccessRequests />} />
    <Route path="/admin/user-management" element={<UserManagement />} />
    <Route path="/admin/compliance-reports" element={<ComplianceReports />} />
    <Route
      path="/admin/system-administration"
      element={<SystemAdministration />}
    />
    <Route path="/admin/settings" element={<Settings />} />
  </Routes>
);

export default AppRoutes;
