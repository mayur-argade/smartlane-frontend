import React from "react";
import "../../../../assets/css/style.css";
// import "../../../../assets/css/web.css";
import "./resetpassword.css";
import back from "../../../../assets/img/back.svg";
import lock from "../../../../assets/img/lock.svg";
import passdone from "../../../../assets/img/pass_done.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../../Devlopment/auth";
import eyeLock from "../../../../assets/img/eye-off.svg";
import eyeon from "../../../../assets/img/eye-on.png";

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswords, setShowPasswords] = React.useState(false);
  const [error, setError] = React.useState([]);

  const location = useLocation();
  const { code, email } = location.state;

  const Navigate = useNavigate();
  const handleSubmit = async () => {
    validation();
    const payload = {
      email: email,
      code: code,
      new_password: password,
    };
    const response =
      password === confirmPassword && (await resetPassword(payload));
    response.success && Navigate("/update-success");
  };
  const validation = () => {
    const e = [];
    if (!password) {
      e["password"] = "Password is required";
    }
    if (!confirmPassword) {
      e["confirmpassword"] = "Confrm Password is required";
    } else if (confirmPassword !== password) {
      e["compare"] = "New password and Confirm password not match!";
    }
    setError(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const togglePassword = () => {
    setShowPasswords((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="welcome_mainpassword yellow_bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="property_head mb-4">
              <a href="#" className="back_btn">
                <Link to={"/forgot-password"}>
                  <img src={back} />
                </Link>
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mob_head d-block">
              <h3>update your password.</h3>
              <p>Choose something memorable.</p>
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
              <div className="login_form ">
                <form action="javascript:void 0;">
                  <div className="form-group">
                    <img src={lock} />
                    <label>new password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    {showPassword ? (
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
                  <div className="form-group">
                    <img src={lock} />
                    <label>confirm new password</label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      className="form-control"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    {showPasswords ? (
                      <img
                        className="showHode_pass"
                        src={eyeon}
                        onClick={togglePassword}
                      />
                    ) : (
                      <img
                        className="showHode_pass"
                        src={eyeLock}
                        onClick={togglePassword}
                      />
                    )}
                    {error.confirmpassword && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.confirmpassword}
                      </div>
                    )}
                    {error.compare && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.compare}
                      </div>
                    )}
                  </div>
                  <div className="form-group pass_match text-center">
                    {password.length > 0 && confirmPassword.length > 0 ? (
                      password == confirmPassword ? (
                        <p>
                          That’s a match! <img src={passdone} />
                        </p>
                      ) : (
                        ""
                      )
                    ) : null}
                  </div>
                  <button
                    className={
                      !password || !confirmPassword
                        ? "btn reset_submit mt-5"
                        : "btn reset_submits btn_bg_ylw mt-5"
                    }
                    onClick={handleSubmit}
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
