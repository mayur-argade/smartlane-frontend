// import React from 'react'
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { setToken, setUserData } from "../../Helper/Storage";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";

// ############################################## User Register   #######################################################

const Register = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.Register);
  if (response.success) {
    setUserData(response.data);
    setToken(response.tokenInfo.token);
    localStorage.setItem("@userData", JSON.stringify(response.data));
  }
  toast(response?.msg);
  return response;
};

// ########################################### add user ###################################################

const AddNewuser = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.UserAdd);
  toast(response?.msg);
  return response;
};

// ############################################## User Login   #######################################################

const UserLogin = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.Login);
  if (response.success) {
    setUserData(response.data);
    setToken(response.tokenInfo.token);
    localStorage.setItem("@userData", JSON.stringify(response.data));
    toast(response?.msg);
  } else {
    toast(response?.msg);
  }
  return response;
};

// ############################################## Forget Password   #######################################################

const ForgetPassword = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.ForgotPassword);
  if (response.success) {
    toast(response?.msg);
  } else {
    toast(response?.msg);
  }
  return response;
};

// ############################################## OTP Verification   #######################################################

const optVerification = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.VerifyOTP);
  toast(response?.msg);
  return response;
};

// ############################################## Resend OTP   #######################################################

const resendotp = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.ResendOTP);
  toast(response?.msg);
  return response;
};

// ############################################## Reset Password   #######################################################

const resetPassword = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.ResetPassword);
  toast(response?.msg);
  return response;
};

const socialLogin = async (data) => {
  console.log(data)
  const response = await ApiServices("POST", data, ApiEndPoints.SocialLogin);
  if (response.success) {
    setUserData(response.data);
    setToken(response.tokenInfo.token);
    console.log(response)
    localStorage.setItem("@userData", JSON.stringify(response.data));
  }
  else{
    console.log(response)
  }
  return response;
};

// ############################################## PropTypes   #######################################################

AddNewuser.propTypes = {
  data: PropTypes.object,
};
Register.propTypes = {
  data: PropTypes.object,
};

UserLogin.propTypes = {
  data: PropTypes.object,
};

ForgetPassword.propTypes = {
  data: PropTypes.object,
};

optVerification.propTypes = {
  data: PropTypes.object,
};
resetPassword.propTypes = {
  data: PropTypes.object,
};
socialLogin.propTypes = {
  data: PropTypes.object,
};

export {
  Register,
  UserLogin,
  ForgetPassword,
  optVerification,
  resetPassword,
  resendotp,
  AddNewuser,
  socialLogin,
};
