import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import Regiter from "../screens/mobileScreen/loginflow/register/Regiter";
import Verification from "../screens/mobileScreen/loginflow/verification/Verification";
import Welcome from "../screens/mobileScreen/loginflow/welcome/Welcome";
import WelcomeBack from "../screens/mobileScreen/loginflow/welcomeBack/WelcomeBack";
import Login from "../screens/mobileScreen/loginflow/login/Login";
import ForgotPassword from "../screens/mobileScreen/loginflow/forgotPassword/ForgotPassword";
import ResetPassword from "../screens/mobileScreen/loginflow/resetPassword/ResetPassword";
import UpdateSuccess from "../screens/mobileScreen/loginflow/resetPassword/UpdateSuccess";
import AccountConfirm from "../screens/mobileScreen/loginflow/accountConfirm/AccountConfirm";
import Dashboards from "../screens/webScreen/pages/dashboard/Dashboard";
import AllProperties from "../screens/mobileScreen/pages/allProperties/AllProperties";
import PostCode from "../screens/mobileScreen/pages/addNewProperty/postcode/PostCode";
// import NewPropertyDocs from "../screens/mobileScreen/pages/addNewProperty/newPropertyDocs/NewPropertyDocs";
import NewPropertyRoi from "../screens/mobileScreen/pages/addNewProperty/newPropertyRoi.js/NewPropertyRoi";
import NewPropertyMortgage from "../screens/mobileScreen/pages/addNewProperty/newPropertyMortgage/NewPropertyMortgage";
import NewPropertyOwnership from "../screens/mobileScreen/pages/addNewProperty/newPropertyOwnership/NewPropertyOwnership";
import NewPropertyInsurance from "../screens/mobileScreen/pages/addNewProperty/newPropertyInsurance/NewPropertyInsurance";
import NewPropertyLettings from "../screens/mobileScreen/pages/addNewProperty/newPropertyLettings/NewPropertyLettings";
import RoiTwo from "../screens/mobileScreen/pages/addNewProperty/newPropertyRoi.js/Roitwo";
import WelcomeLogin from "../screens/webScreen/loginflow/welcome/Welcome";
import WelcomeSignUp from "../screens/mobileScreen/loginflow/welcomesignup/WelcomeSignUp";
import PropertyExpanded from "../screens/mobileScreen/pages/propertyExpanded/PropertyExpanded";
import PropertyDocument from "../screens/mobileScreen/pages/propertyDocument/PropertyDocument";
import PropertyDocuments from "../screens/webScreen/pages/propertyDocument/PropertyDocument";
import Property from "../screens/mobileScreen/pages/propertyDocument/property";
import LettingsDoc from "../screens/webScreen/pages/propertyDocument/letting";
import PropertyDoc from "../screens/webScreen/pages/propertyDocument/property";
import Lettings from "../screens/mobileScreen/pages/propertyDocument/lettings";
import Dashboard from "../screens/mobileScreen/pages/dashboard/Dashboard";
import PropertyList from "../screens/mobileScreen/pages/propertyExpanded/context";
import WebLogin from "../screens/webScreen/loginflow/login/Login";
import WebRegister from "../screens/webScreen/loginflow/register/Register";
import WebForgotPassword from "../screens/webScreen/loginflow/forgot-password/ForgotPassword";
import WebVerification from "../screens/webScreen/loginflow/verification/Verification";
import WebResetPassword from "../screens/webScreen/loginflow/reset-password/ResetPassword";
import WebWelcomeBack from "../screens/webScreen/loginflow/welcomeback/WelcomeBack";
import WebAccountConfirm from "../screens/webScreen/loginflow/account-confirm/AccountConfirm";
import WebUpdateSuccess from "../screens/webScreen/loginflow/reset-password/UpdateSuccess";
import NewPropertyOwnershipThird from "../screens/mobileScreen/pages/addNewProperty/newPropertyOwnership/NewPropertyOwnershipThree";
import NewPropertyOwnershipSecond from "../screens/mobileScreen/pages/addNewProperty/newPropertyOwnership/NewPropertyOwnershipTwo";
import NewPropertyLettingsFinal from "../screens/mobileScreen/pages/addNewProperty/newPropertyLettings/NewPropertyLettingFinal";
import AdminDashboard from "../screens/webScreen/Admin/dashboard";
import { UserContext } from "../context";
import PropertyOwerview from "../screens/mobileScreen/pages/propertyOwerview/PropertyOwerview";
import Ownership from "../screens/webScreen/pages/ownership/Ownership";
import Letting from "../screens/webScreen/pages/letting/Letting";

const AppRouter = () => {
  const { userType } = useContext(UserContext);

  return (
    <div>
      <BrowserView>
        <BrowserRouter>
          <Routes>
            <Route path="/welcome-signup" element={<WelcomeLogin />} />
            <Route path="/login" element={<WebLogin />} />
            <Route path="/register" element={<WebRegister />} />
            <Route path="/forgot-password" element={<WebForgotPassword />} />
            <Route path="/reset-password" element={<WebResetPassword />} />
            <Route path="/welcome-login" element={<WebWelcomeBack />} />
            <Route path="/account-confirm" element={<WebAccountConfirm />} />
            <Route path="/verification" element={<WebVerification />} />
            <Route path="/update-success" element={<WebUpdateSuccess />} />
            {userType == "landlord" && (
              <>
                <Route path="/" element={<Dashboards />} />
                <Route path="/dashboard" element={<Dashboards />} />
                <Route
                  path="/property-document"
                  element={<PropertyDocuments />}
                >
                  <Route index element={<PropertyDoc />} />
                  <Route path="property" element={<PropertyDoc />} />
                  <Route path="lettings" element={<LettingsDoc />} />
                  <Route path="property#" element={<PropertyDoc />} />
                  <Route path="lettings#" element={<LettingsDoc />} />
                </Route>
                <Route path="ownership" element={<Ownership admin={false} />} />
                <Route path="letting" element={<Letting admin={false} />} />
              </>
            )}
            {userType === "admin" && (
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/ownership" element={<Ownership admin={true} />} />
                <Route path="/letting" element={<Letting admin={true} />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <PropertyList>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/welcome-signup" element={<WelcomeSignUp />} />
              <Route path="/welcome-login" element={<WelcomeBack />} />
              <Route path="/login" element={<Login />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/register" element={<Regiter />} />
              <Route path="/account-confirm" element={<AccountConfirm />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/update-success" element={<UpdateSuccess />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/all-properties" element={<AllProperties />} />
              <Route path="/property-list/:id" element={<PropertyOwerview />} />
              <Route
                path="/property-expanded/:id"
                element={<PropertyExpanded />}
              />
              <Route path="/property-owerview" element={<PropertyOwerview />} />
              <Route
                path="/property-document/ownership/:id"
                element={<PropertyDocument />}
              >
                <Route index element={<Property />} />
              </Route>
              <Route
                path="/property-document/letting/:id"
                element={<PropertyDocument />}
              >
                <Route index element={<Lettings />} />
              </Route>
              <Route path="/postcode" element={<PostCode />} />
              {/* <Route path="/newproperty-docs" element={<NewPropertyDocs />} /> */}
              <Route path="/newproperty-roi" element={<NewPropertyRoi />} />
              <Route path="/newproperty-roitwo" element={<RoiTwo />} />
              <Route
                path="/newproperty-mortgage"
                element={<NewPropertyMortgage />}
              />
              <Route
                path="/newproperty-ownership"
                element={<NewPropertyOwnership />}
              />
              <Route
                path="/newproperty-ownership-second"
                element={<NewPropertyOwnershipSecond />}
              />
              <Route
                path="/newproperty-ownership-third"
                element={<NewPropertyOwnershipThird />}
              />
              <Route
                path="/newproperty-insurance"
                element={<NewPropertyInsurance />}
              />
              <Route
                path="/newproperty-lettings"
                element={<NewPropertyLettings />}
              />
              <Route
                path="/newproperty-lettings-final"
                element={<NewPropertyLettingsFinal />}
              />
            </Routes>
          </PropertyList>{" "}
        </BrowserRouter>
      </MobileView>
    </div>
  );
};

export default AppRouter;
