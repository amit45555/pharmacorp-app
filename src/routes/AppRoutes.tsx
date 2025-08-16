import React from "react";
import { Routes, Route } from "react-router-dom";
import UserInformation from "../pages/UserInformation/UserInformation";
import AccessDetails from "../pages/AccessDetails/AccessDetails";
import ReviewSubmit from "../pages/ReviewSubmit/ReviewSubmit";
import GenerateCredentials from "../pages/GenerateCredentials/GenerateCredentials";
import TrackRequest from "../pages/TrackRequest";
import Login from "../pages/Login";
import ApproverDashboard from "../pages/ApproverDashboard";
import AccessRequestDetails from "../pages/AccessRequestDetails";
import SuperAdmin from "../pages/SuperAdmin/SuperAdmin";
import RoleMasterTable from "../pages/RoleMasterTable/RoleMasterTable";
import AddRoleFormPage from "../RoleMaster/AddRoleFormPage";
import EditRoleFormPage from "../RoleMaster/EditRoleFormPage";
const AppRoutes: React.FC = () => (
  <Routes>
    {/* User Flow */}
    <Route path="/user-information" element={<UserInformation />} />
    <Route path="/access-details" element={<AccessDetails />} />
    {/* Approver step views: Approver 1, 2, 3 */}
    <Route path="/approver-step/:step/:id" element={<AccessRequestDetails />} />
    <Route path="/review-submit" element={<ReviewSubmit />} />
    <Route path="/generate-credentials" element={<GenerateCredentials />} />
    <Route path="/track-request" element={<TrackRequest />} />

    {/* Approver Flow */}
    <Route path="/" element={<Login />} />
    <Route path="/approver" element={<ApproverDashboard />} />
    <Route path="/access-request/:id" element={<AccessRequestDetails />} />

    {/* SuperAdmin Flow */}
    <Route path="/superadmin" element={<SuperAdmin />} />

    {/* Role Master */}
    <Route path="/roles" element={<RoleMasterTable />} />
    <Route path="/add-role" element={<AddRoleFormPage />} />
    <Route path="/edit-role/:idx" element={<EditRoleFormPage />} />
    {/* Catch-all route for 404 */}
    <Route
      path="*"
      element={
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "#e74c3c",
            fontSize: 24,
          }}
        >
          404 - Page Not Found
        </div>
      }
    />
  </Routes>
);

export default AppRoutes;
