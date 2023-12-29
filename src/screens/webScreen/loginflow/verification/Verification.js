import React from "react";
import "../../../../assets/css/web.css";
import OtpInput from "react18-input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import { optVerification, resendotp } from "../../../../Devlopment/auth";

const WebVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const { type, email } = location.state || {};

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
    <div className="welcome_mainss yellow_bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mob_head d-block headingaccount marginzeroauto">
              {type == 1 ? (
                <h3>double checking all is in order.</h3>
              ) : (
                <h3>recover your password.</h3>
              )}
              <p>
                Please enter the code we sent to
                <span className="resize"> {email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lead_slide leadslideboaderwidth"></div>
      <div className="main_lead_board commonmaxwidth borderRadius marginzeroauto entercodemainleadboardheight">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="login_form otp_form">
                <form action="javascript: void(0)">
                  {/* <div className="otp_inputs d-flex">
                    <div className="form-group">
                      <input type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                      <input type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                      <input type="text" className="form-control" />
                    </div>

                    <div className="form-group">
                      <input type="text" className="form-control" />
                    </div>
                  </div> */}
                  <div className="otp_inputs d-flex">
                    <OtpInput
                      value={otp}
                      onChange={(otp) => setOtp(otp)}
                      isInputNum
                      numInputs={4}
                      containerStyle={{ justifyContent: "space-between" }}
                      inputStyle={{
                        backgroundColor: "black",
                        color: "white",
                        width: "100%",
                        height: "70px",
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
                      href="#"
                      onClick={resendOTP}
                      style={{ fontWeight: "700" }}
                    >
                      Resend code
                    </a>
                  </p>
                  <p className="mt-5">
                    <a href="/forgot-password" style={{ fontWeight: "700" }}>
                      Change my email
                    </a>
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

export default WebVerification;
