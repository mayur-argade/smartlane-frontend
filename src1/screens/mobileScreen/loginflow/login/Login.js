import React, { useContext } from "react";
import "../../../../assets/css/style.css";
import "./login.css";
import back from "../../../../assets/img/back.svg";
import mail from "../../../../assets/img/mail.svg";
import lock from "../../../../assets/img/lock.svg";
import eyeLock from "../../../../assets/img/eye-off.svg";
import eyeon from "../../../../assets/img/eye-on.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserLogin } from "../../../../Devlopment/auth";
import { Backdrop, CircularProgress } from "@mui/material";
import { UserContext } from "../../../../context";

const Login = () => {
  const setUserType = useContext(UserContext);
  const [userData, setUserData] = React.useState({});
  const [error, setError] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleChange = async (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async () => {
    if (!validation()) {
      setOpen(true);
      const response = await UserLogin(userData);
      setUserType?.updateUserType(response?.data?.user_type || "");
      response?.success && navigate("/dashboard");
      setOpen(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validation = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let a = false;
    const e = [];
    if (!userData.email) {
      a = true;
      e["email"] = "Email is required";
    }
    if (!userData.password) {
      a = true;
      e["password"] = "Password is required";
    } else if (emailRegex.test(userData.email) === false) {
      a = true;
      e["email"] = "Please enter a valid email";
    }
    setError(e);
    return a;
  };
  return (
    <div className="welcome_mainlogin">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="property_head mb-4">
              <a href="#" className="back_btn">
                <Link to={"/"}>
                  <img src={back} />
                </Link>
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mob_head d-block lgn_head">
              <h3>your portfolio awaits.</h3>
              <p>Enter your details below.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lead_slide"></div>
      <div className="main_lead_board Nfd_md">
        <div className="cover_mb"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="login_form lg_frm_main">
                <form action="javascript:void 0">
                  <div className="form-group">
                    <img src={mail} />
                    <label>EMAIL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      onChange={handleChange}
                    />
                    {error.email && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.email}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <img src={lock} />
                    <label>password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      onChange={handleChange}
                    />
                    {userData?.password ? (
                      showPassword ? (
                        <img
                          className="showHode_pass"
                          src={eyeon}
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <img
                          className="showHode_pass"
                          src={eyeLock}
                          onClick={togglePasswordVisibility}
                        />
                      )
                    ) : (
                      ""
                    )}
                    {error.password && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.password}
                      </div>
                    )}
                  </div>
                  <div className="form-group frgt_passwrd w-100">
                    <Link to={"/forgot-password"}>
                      <a href="#">Forgot Password?</a>
                    </Link>
                  </div>
                  <button
                    className={
                      !userData.email || !userData.password
                        ? "btn login_submit"
                        : "btn login_submits"
                    }
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                    onClick={() => setOpen(false)}
                  >
                    <CircularProgress style={{ color: "#F9D75D" }} />
                  </Backdrop>
                </form>
                <div className="login_last_msg pt-3">
                  <p>
                    Don’t have an account yet?
                    <Link to={"/"}>
                      <a href="#"> Sign up</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
