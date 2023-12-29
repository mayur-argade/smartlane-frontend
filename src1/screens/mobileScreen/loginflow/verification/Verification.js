import React, { useState } from "react";
import "../../../../assets/css/style.css";
import "./verification.css";
import back from "../../../../assets/img/back.svg";
import OtpInput from "react18-input-otp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { optVerification, resendotp } from "../../../../Devlopment/auth";

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { type, email } = location.state;

  const handleSubmit = async () => {
    const payload = {
      code: otp,
      email: email,
    };
    const response = await optVerification(payload);
    response.success && type == 1 && navigate("/account-confirm");
    response.success &&
      type == 2 &&
      navigate(type == 1 ? "/account-confirm" : "/reset-password", {
        state: { code: otp, email: email },
      });
    window.location.reload();
  };
  const resendOTP = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
    };
    await resendotp(payload);
  };

  return (
    <div
      className="welcome_mainpassword yellow_bg"
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="property_head mb-4">
              <a href="#" className="back_btn">
                <Link to={type == 1 ? "/register" : "/forgot-password"}>
                  <img src={back} />
                </Link>
              </a>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mob_head d-block">
              {type == 1 ? (
                <h3>double checking all is in order.</h3>
              ) : (
                <h3>recover your password.</h3>
              )}

              <p>
                Please enter the code we sent to{" "}
                <span className="resize">{email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lead_slide"></div>
      <div className="main_lead_board verification_board">
        <div className="cover_box"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="login_form otp_form">
                <form action="javascript:void 0;">
                  <div className="otp_inputs d-flex">
                    <OtpInput
                      value={otp}
                      isInputNum
                      onChange={(otp) => setOtp(otp)}
                      numInputs={4}
                      containerStyle={{ justifyContent: "space-between" }}
                      inputStyle={{
                        backgroundColor: "black",
                        color: "white",
                        width: "100%",
                        height: "60px",
                        margin: "8px",
                        padding: "10px",
                        border: `1px solid black`,
                        borderRadius: 16,
                        fontSize: "24px",
                      }}
                    />
                  </div>
                  <button
                    className={
                      otp.length < 4
                        ? "btn otp_submit mt-3"
                        : "btn otp_submits mt-3"
                    }
                    onClick={handleSubmit}
                    disabled={otp.length < 4}
                  >
                    Continue
                  </button>
                </form>
                <div className="login_last_msg pt-4">
                  <p>
                    Didn’t get an email?{" "}
                    <a
                      href=""
                      onClick={resendOTP}
                      style={{ fontWeight: "700" }}
                    >
                      Resend code
                    </a>
                  </p>
                  <p className="mt-5">
                    {type == 1 ? (
                      <a href="/register" style={{ fontWeight: "700" }}>
                        Change my email
                      </a>
                    ) : (
                      <a href="/forgot-password" style={{ fontWeight: "700" }}>
                        Change my email
                      </a>
                    )}
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

export default Verification;
