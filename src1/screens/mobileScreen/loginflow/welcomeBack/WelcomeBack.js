import React from "react";
import "../../../../assets/css/style.css";
// import "../../../../assets/css/web.css";
import loginhome from "../../../../assets/img/login_home.svg";
import propell from "../../../../assets/web-img/propell.svg";
// import google from "../../../../assets/img/google.svg";
import { Link } from "react-router-dom";
import "./welcomback.css";
import { Signin } from "../../../../component/googleSignin/signin";

const WelcomeBack = () => {
  return (
    <div className="welcome_main" style={{ backgroundColor: "#000" }}>
      <div
        className="login_head text-right"
        data-aos="fade-right"
        data-aos-duration="2000"
        style={{ display:"flex",justifyContent:"flex-end" }}
      >
        <div style={{width:"150px", }}>
        <img src={propell} style={{width:"100%"}} />

        </div>
      </div>

      <div
        className="login_head text-right login_home"
        data-aos="fade-left"
        data-aos-duration="2000"
      >
        <img src={loginhome} />
        {/* <img src={gif} width="400" /> */}
      </div>
      <div className="lead_slide"></div>
      <div className="main_lead_board login_page_mainBoard">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="login_google">
                {/* <a href="#" className="login_btn1"> */}
                {/* <img
                    src={google}
                    width="31"
                    height="32"
                    style={{ marginLeft: "-20px" }}
                  /> */}
                <Signin loginpage={"login"} />
                {/* <span className="ms-3">Login with Google</span> */}
                {/* </a> */}
                <Link to={"/login"}>
                  <a
                    href="#"
                    className="all_property mt-4 btn"
                    style={{ fontSize: "24px" }}
                  >
                    Login with Email
                  </a>
                </Link>
              </div>
              <div
                className="login_last_msg pt-3"
                style={{ paddingBottom: "25%" }}
              >
                <p>
                  Don’t have an account yet?
                  <Link to={"/welcome-signup"}>
                    <a> Sign up</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBack;
