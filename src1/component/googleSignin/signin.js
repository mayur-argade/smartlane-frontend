import React, { useContext } from "react";
import { auth, provider } from "./config";
import { useNavigate } from "react-router-dom";
import { socialLogin } from "../../Devlopment/auth";
import google from "../../assets/img/google.svg";
import PropTypes from "prop-types";
import { setToken } from "../../Helper/Storage";
import { UserContext } from "../../context";
import { signInWithPopup } from "@firebase/auth";

export const Signin = ({ loginpage }) => {
  // const [userData, setUserData] = React.useState("");
  const navigate = useNavigate();

  const setUserType = useContext(UserContext);

  const handleClick = async () => {
    await signInWithPopup(auth, provider).then((data) => {
      // setUserData(data?.user);
      handleSubmit(data?.user);
    });
  };

  const handleSubmit = async (data) => {
    const payload = {
      full_name: data?.reloadUserInfo?.displayName,
      email: data?.reloadUserInfo?.email,
      user_type: "landlord",
      social_loginId: data?.reloadUserInfo?.localId,
    };
    const response = await socialLogin(payload);

    setToken(response.tokenInfo.token);
    let userObject = JSON.stringify(response.data);
    localStorage.setItem("@userData", userObject);
    setUserType?.updateUserType(response?.data?.user_type || "");
    response?.data?.user_type === "landlord" &&
      navigate("/dashboard", { state: { type: 1 } });
  };

  return (
    <div>
      {loginpage ? (
        <a onClick={handleClick} className="btn wb_login_google">
          <img src={google} /> Login with Google
        </a>
      ) : (
        <a onClick={handleClick} className="btn wb_login_google">
          <img src={google} /> Sign up with Google
        </a>
      )}
    </div>
  );
};
Signin.propTypes = {
  loginpage: PropTypes.any,
};
