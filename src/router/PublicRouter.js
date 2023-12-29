import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//  web
import WelcomeLogin from "../screens/webScreen/loginflow/welcome/Welcome";

//  mobile
import WelcomeSignUp from "../screens/mobileScreen/loginflow/welcomesignup/WelcomeSignUp";
import WelcomeBack from "../screens/mobileScreen/loginflow/welcomeBack/WelcomeBack";
import Login from "../screens/mobileScreen/loginflow/login/Login";
import Welcome from "../screens/mobileScreen/loginflow/welcome/Welcome";
import Regiter from "../screens/mobileScreen/loginflow/register/Regiter";
import AccountConfirm from "../screens/mobileScreen/loginflow/accountConfirm/AccountConfirm";
import ForgotPassword from "../screens/mobileScreen/loginflow/forgotPassword/ForgotPassword";
import Verification from "../screens/mobileScreen/loginflow/verification/Verification";
import ResetPassword from "../screens/mobileScreen/loginflow/resetPassword/ResetPassword";
import UpdateSuccess from "../screens/mobileScreen/loginflow/resetPassword/UpdateSuccess";
import WebLogin from "../screens/webScreen/loginflow/login/Login";
import WebRegister from "../screens/webScreen/loginflow/register/Register";
import WebResetPassword from "../screens/webScreen/loginflow/reset-password/ResetPassword";
import WebForgotPassword from "../screens/webScreen/loginflow/forgot-password/ForgotPassword";
import WebWelcomeBack from "../screens/webScreen/loginflow/welcomeback/WelcomeBack";
import WebAccountConfirm from "../screens/webScreen/loginflow/account-confirm/AccountConfirm";
import WebVerification from "../screens/webScreen/loginflow/verification/Verification";
import WebUpdateSuccess from "../screens/webScreen/loginflow/reset-password/UpdateSuccess";
import MainLanding from "../component/LandinPage/MainLanding";

const PublicRouter = () => {
  return (
    <div>
      <BrowserView>
        <BrowserRouter>
          <Routes>
           <Route path="/" element={<MainLanding />} /> 
           <Route path="/home" element={<MainLanding />} /> 
          <Route path="/WelcomeLogin" element={<WelcomeLogin />} />
           <Route path="/welcome-signup" element={<WelcomeLogin />} />
            <Route path="/login" element={<WebLogin />} />
            <Route path="/register" element={<WebRegister />} />
            <Route path="/forgot-password" element={<WebForgotPassword />} />
            <Route path="/reset-password" element={<WebResetPassword />} />
            <Route path="/welcome-login" element={<WebWelcomeBack />} />
            <Route path="/account-confirm" element={<WebAccountConfirm />} />
            <Route path="/verification" element={<WebVerification />} />
            <Route path="/update-success" element={<WebUpdateSuccess />} />
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <Routes>
          {/* <Route path="/welcome" element={<MainLanding />} /> */}
            <Route path="/" element={<MainLanding />} />
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
          </Routes>
        </BrowserRouter>
      </MobileView>
    </div>
  );
};

export default PublicRouter;
