import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import ForgotPsw from "../Authentication/ForgotPsw";
import ChangePsw from "../Authentication/ChangePsw";
import Mfa from "../Authentication/Mfa";
import Home from "../Pages/Home";
import AddProvider from "../Pages/Provider/AddProvider";
import EditProvider from "../Pages/Provider/EditProvider";
import ListProvider from "../Pages/Provider/ListProvider";
import NewRequestProvider from "../Pages/Provider/NewRequestProvider";
import AddUser from "../Pages/User/AddUser";
import EditUser from "../Pages/User/EditUser";
import ListUser from "../Pages/User/ListUser";
import NewRequestUser from "../Pages/User/NewRequestUser";
import NewUserRequest from "../Pages/UserAccessRequest/NewUserRequest";
import PendingRequest from "../Pages/UserAccessRequest/PendingRequest";
import CompletedRequest from "../Pages/UserAccessRequest/CompletedRequest";
import RejectedRequest from "../Pages/UserAccessRequest/RejectedRequest";
import ApprovedRequest from "../Pages/UserAccessRequest/ApprovedRequest";
import AllProviderRecord from "../Pages/RecordViewer/AllProviderRecord";
import AllSubscriptionRecords from "../Pages/RecordViewer/AllSubscriptionRecords";
import AllTemplateRecords from "../Pages/RecordViewer/AllTemplateRecords";
import AllUserRecord from "../Pages/RecordViewer/AllUserRecord";
import AllUserRolesRecord from "../Pages/RecordViewer/AllUserRolesRecord";
import AlertTrigger from "../Pages/RecordViewer/AlertTrigger";
import ProviderType from "../Pages/CategoryList/ProviderType";
import CommunicationType from "../Pages/CategoryList/CommunicationType";
import ReferralType from "../Pages/CategoryList/ReferralType";
import SecurityQuestionType from "../Pages/CategoryList/SecurityQuestionType";
import SexType from "../Pages/CategoryList/SexType";
import SpecilityType from "../Pages/CategoryList/SpecilityType";
import StatusType from "../Pages/CategoryList/StatusType";
import TemplateCategoryType from "../Pages/CategoryList/TemplateCategoryType";
import TitleType from "../Pages/CategoryList/TitleType";
import AdminDash from "../Pages/Analytics/AdminDash";
import KeyMetrics from "../Pages/Analytics/KeyMetrics";
import AddTemplate from "../Pages/TemplateConfiguration/AddTemplate";
import EditTemplate from "../Pages/TemplateConfiguration/EditTemplate";
import CreateSubscription from "../Pages/SubscriptionConfiguration/CreateSubscription";
import EditSubScription from "../Pages/SubscriptionConfiguration/EditSubScription";
import AddGroup from "../Pages/SubscriptionConfiguration/AddGroup";
import EditGroup from "../Pages/SubscriptionConfiguration/EditGroup";
import AddUserRole from "../Pages/UserRole/AddUserRole";
import EditUserRole from "../Pages/UserRole/EditUserRole";
import AddSecurityClass from "../Pages/SecurityClass/AddSecurityClass";
import EditSecurityClass from "../Pages/SecurityClass/EditSecurityClass";
import ArchiveCommunicationType from "../Pages/archive/ArchiveCommunicationType";
import ArchiveProviderAdministration from "../Pages/archive/ArchiveProviderAdministration";
import ArchiveProviderType from "../Pages/archive/ArchiveProviderType";
import ArchiveReferralSource from "../Pages/archive/ArchiveReferralSource";
import ArchiveSecurityQuestion from "../Pages/archive/ArchiveSecurityQuestion";
import ArchiveSex from "../Pages/archive/ArchiveSex";
import ArchiveSpecialityType from "../Pages/archive/ArchiveSpecialityType";
import ArchiveStatus from "../Pages/archive/ArchiveStatus";
import ArchiveSubscription from "../Pages/archive/ArchiveSubscription";
import ArchiveTemplate from "../Pages/archive/ArchiveTemplate";
import ArchiveTitle from "../Pages/archive/ArchiveTitle";
import ArchiveUserAccount from "../Pages/archive/ArchiveUserAccount";
import ArchiveUserRole from "../Pages/archive/ArchiveUserRole";
import ArchiveTemplateCatType from "../Pages/archive/ArchiveTemplateCatType";
import ProtectedRoute from "../ProtectedRoute";
import PreviewTemplate from "../Pages/TemplateConfiguration/Previews";
import  Preview  from "../Pages/TemplateConfiguration/PreviewTemplate";
import Eds from "../Pages/TemplateConfiguration/Eds";
import AddAdmin from "../Pages/AdminLogin/AddAdmin";
import EditAdmin from "../Pages/AdminLogin/EditAdmin";

function MainRoute() {
  return (
    <Router>
      <Routes>
        {/* For All Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPsw />} />
        <Route path="/change-password" element={<ChangePsw />} />
        <Route path="/mfa" element={<Mfa />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <AddTemplate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* For Provider Administration */}
        <Route
          path="/add_provider"
          element={
            <ProtectedRoute>
              <AddProvider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_provider"
          element={
            <ProtectedRoute>
              <EditProvider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider_list"
          element={
            <ProtectedRoute>
              <ListProvider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_provider_request"
          element={
            <ProtectedRoute>
              <NewRequestProvider />
            </ProtectedRoute>
          }
        />
        {/* For User Account */}
        <Route
          path="/add_user"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_user"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user_list"
          element={
            <ProtectedRoute>
              <ListUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_users_request"
          element={
            <ProtectedRoute>
              <NewRequestUser />
            </ProtectedRoute>
          }
        />
        {/* For Record Viewer */}
        <Route
          path="/all_provider_records"
          element={
            <ProtectedRoute>
              <AllProviderRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all_user_records"
          element={
            <ProtectedRoute>
              <AllUserRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all_subscription_records"
          element={
            <ProtectedRoute>
              <AllSubscriptionRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all_template_records"
          element={
            <ProtectedRoute>
              <AllTemplateRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all_userRoles_records"
          element={
            <ProtectedRoute>
              <AllUserRolesRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all_alertTrigger_records"
          element={
            <ProtectedRoute>
              <AlertTrigger />
            </ProtectedRoute>
          }
        />
        {/* For New Access Request */}
        <Route
          path="/new_user_request"
          element={
            <ProtectedRoute>
              <NewUserRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_pending_request"
          element={
            <ProtectedRoute>
              <PendingRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_complete_request"
          element={
            <ProtectedRoute>
              <CompletedRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_rejected_request"
          element={
            <ProtectedRoute>
              <RejectedRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new_approved_request"
          element={
            <ProtectedRoute>
              <ApprovedRequest />
            </ProtectedRoute>
          }
        />
        {/* For All Category List */}
        <Route
          path="/category_provider"
          element={
            <ProtectedRoute>
              <ProviderType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_communication"
          element={
            <ProtectedRoute>
              <CommunicationType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_referral"
          element={
            <ProtectedRoute>
              <ReferralType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_security_question"
          element={
            <ProtectedRoute>
              <SecurityQuestionType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_SexType"
          element={
            <ProtectedRoute>
              <SexType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_specility"
          element={
            <ProtectedRoute>
              <SpecilityType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_ststus"
          element={
            <ProtectedRoute>
              <StatusType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_template"
          element={
            <ProtectedRoute>
              <TemplateCategoryType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category_title"
          element={
            <ProtectedRoute>
              <TitleType />
            </ProtectedRoute>
          }
        />
        {/* For All Analytics */}
        <Route
          path="/AdminDash"
          element={
            <ProtectedRoute>
              <AdminDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/KeyMetrics"
          element={
            <ProtectedRoute>
              <KeyMetrics />
            </ProtectedRoute>
          }
        />
        {/* For All Template Configuration */}
        <Route
          path="/add_template"
          element={
            <ProtectedRoute>
              <AddTemplate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_template"
          element={
            <ProtectedRoute>
              <EditTemplate />
            </ProtectedRoute>
          }
        />
        {/* For All Template Configuration */}
        <Route
          path="/create_subscription"
          element={
            <ProtectedRoute>
              <CreateSubscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_subscription"
          element={
            <ProtectedRoute>
              <EditSubScription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add_group"
          element={
            <ProtectedRoute>
              <AddGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_group"
          element={
            <ProtectedRoute>
              <EditGroup />
            </ProtectedRoute>
          }
        />
        {/* For All Template Configuration */}
        <Route
          path="/add_userRole"
          element={
            <ProtectedRoute>
              <AddUserRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_userRole"
          element={
            <ProtectedRoute>
              <EditUserRole />
            </ProtectedRoute>
          }
        />
        {/* For All Template Configuration */}
        <Route
          path="/add_security_class"
          element={
            <ProtectedRoute>
              <AddSecurityClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit_security_class"
          element={
            <ProtectedRoute>
              <EditSecurityClass />
            </ProtectedRoute>
          }
        />
        {/* For All Archive Routes */}
        <Route
          path="/archive_communication_type"
          element={
            <ProtectedRoute>
              <ArchiveCommunicationType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveProviderAdministration"
          element={
            <ProtectedRoute>
              <ArchiveProviderAdministration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveProviderType"
          element={
            <ProtectedRoute>
              <ArchiveProviderType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveReferralSource"
          element={
            <ProtectedRoute>
              <ArchiveReferralSource />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveSecurityQuestion"
          element={
            <ProtectedRoute>
              <ArchiveSecurityQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveSex"
          element={
            <ProtectedRoute>
              <ArchiveSex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveSpecialityType"
          element={
            <ProtectedRoute>
              <ArchiveSpecialityType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveStatus"
          element={
            <ProtectedRoute>
              <ArchiveStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveSubscription"
          element={
            <ProtectedRoute>
              <ArchiveSubscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveTemplate"
          element={
            <ProtectedRoute>
              <ArchiveTemplate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveTitle"
          element={
            <ProtectedRoute>
              <ArchiveTitle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveUserAccount"
          element={
            <ProtectedRoute>
              <ArchiveUserAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveUserRole"
          element={
            <ProtectedRoute>
              <ArchiveUserRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ArchiveTemplateCatType"
          element={
            <ProtectedRoute>
              <ArchiveTemplateCatType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add_admin"
          element={
            <ProtectedRoute>
              <AddAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin_list"
          element={
            <ProtectedRoute>
              <EditAdmin />
            </ProtectedRoute>
          }
        />
         <Route path="/preview-template/:id" element={<Preview />} />
        <Route
          path="/edit-template-main/:dataId"
          element={<Eds />}
        />
      </Routes>
    </Router>
  );
}

export default MainRoute;
