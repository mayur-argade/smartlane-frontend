import React, { useState } from "react";
import "../../../../assets/css/web.css";
import mail from "../../../../assets/img/mail.svg";
import lock from "../../../../assets/img/lock.svg";
import user from "../../../../assets/img/user.svg";
import landlord from "../../../../assets/img/landlord.svg";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../../../../Devlopment/auth";
import eyeLock from "../../../../assets/img/eye-off.svg";
import eyeon from "../../../../assets/img/eye-on.png";
import newarrow from "../../../../images/newarrow.svg";
import { Backdrop, CircularProgress } from "@mui/material";

const WebRegister = () => {
  const [userType, setUserType] = useState("landlord");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [type] = useState(1);
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!validation()) {
      setOpen(true);
      const payload = {
        full_name: fullName,
        email: email,
        password: password,
        user_type: userType,
      };
      const response = await Register(payload);
      response.success &&
        navigate("/verification", { state: { type: type, email: email } });
      setOpen(false);
    }
  };

  const validation = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    let a = false;
    const e = [];
    if (!userType) {
      a = true;
      e["userType"] = "Please select useType";
    }
    if (!fullName) {
      e["fullName"] = "Full Name is required";
      a = true;
    }
    if (!email) {
      e["email"] = "Email is required";
      a = true;
    } else if (emailRegex.test(email) === false) {
      e["email"] = "Please enter valid email";
      a = true;
    }

    if (!password) {
      e["password"] = "Password is required";
      a = true;
    } else if (!passwordRegex.test(password)) {
      a = true;
      e["password"] =
        "Pick a strong password including at least one uppercase letter, one lowercase letter and one number. It must be a minimum of 8 characters";
    }
    setError(e);
    return a;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="welcome_main pb-5 fullheight">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mob_head d-block marginzeroauto headingaccount">
              <h3>unlock instant portfolio insights.</h3>
              <p>Create your account.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lead_slide leadslidewidth"></div>
      <div className="main_lead_board marginzeroauto borderRadius mainleadboard commonmaxwidth">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12">
              <div className="login_form">
                <form action="javascript: void(0)">
                  <div className="form-group">
                    <span className="Dropss">
                      <img src={newarrow} className="Dropsss" />
                    </span>
                    <label>USER TYPE</label>
                    <img src={landlord} />
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option>Landlord</option>
                    </select>
                    {error.userType && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.userType}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <img src={user} />
                    <label>FULL NAME</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {error.fullName && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.fullName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <img src={mail} />
                    <label>EMAIL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {password ? (
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
                  <button
                    className={
                      !userType || !fullName || !email || !password
                        ? "login_submit"
                        : " login_submits"
                    }
                    onClick={handleSubmit}
                  >
                    Sign up
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
                    Already have an account?{" "}
                    <Link to={"/welcome-login"}>
                      <a href="#">Login</a>
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

export default WebRegister;
