import React from "react";
import "../../../../assets/css/web.css";
import mail from "../../../../assets/img/mail.svg";
import { useNavigate } from "react-router-dom";
import { ForgetPassword } from "../../../../Devlopment/auth";
import { Backdrop, CircularProgress } from "@mui/material";

const WebForgotPassword = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async () => {
    validation();
    setOpen(true);
    const payload = {
      email: email,
    };
    const response = await ForgetPassword(payload);
    response.success &&
      Navigate("/verification", { state: { type: 2, email: email } });
    setOpen(false);
  };
  const validation = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const e = [];

    if (!email) {
      e["email"] = "Email is required";
    } else if (emailRegex.test(email) === false) {
      e["email"] = "Please enter a valid email";
    }
    setError(e);
  };
  return (
    <div className="welcome_mains yellow_bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mob_head d-block marginzeroauto headingaccount">
              <h3>recover your password.</h3>
              <p>Please enter your email below.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lead_slide mainleadwidthsmall "></div>
      <div className="main_lead_board borderRadius marginzeroauto commonmaxwidth heightmainleadborder">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="login_form otp_form mt-4">
                <form action="javascript: void(0)">
                  <div className="form-group">
                    <img src={mail} />
                    <label>EMAIL</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control inputpaddings"
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
                  <button
                    className={
                      !email
                        ? "btn login_submit btn_bg_ylw"
                        : "btn login_submits btn_bg_ylw"
                    }
                    onClick={handleSubmit}
                  >
                    Continue
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebForgotPassword;
