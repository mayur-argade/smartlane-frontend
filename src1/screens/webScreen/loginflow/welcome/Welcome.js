import React from "react";
import "../../../../assets/css/web.css";
import "../account-confirm/newaccount.css"
import propell from "../../../../../src/assets/web-img/propell.svg"
import port from "../../../../assets/web-img/port.png";
// import loginbg from "../../../../assets/web-img/login_bg.png";
import loginbg from "../../../../images/slideweb.png";
import { Link } from "react-router-dom";
import { Signin } from "../../../../component/googleSignin/signin";
const Welcome = () => {
  return (
    <div className="web_login_main">
      <div className="login_type " style={{ flexDirection: "column" }}>
   <img src={propell} style={{height:'60px'}} />
        <div className="wb_login_btn" style={{ padding: "120px 0" }}>
          <Signin />
          <Link to={"/register"}>
            <a href="#" className="btn all_btn">
              Sign up with email
            </a>
          </Link>
        </div>
        <p className="bottom_tag">
          Already have an account?{" "}
          <Link to={"/welcome-login"}>
            <a href="#"> Login</a>
          </Link>
        </p>
      </div>
      <div className="login_deta main_content_wr">
        <div className="tab_body">
          <div className="tab_content_wr">
            <div className="circle_graph pt-3">
              <div className="progressBar">
                <div className="circle_content">
                  <div className="portfolio_no">
                    <span>3</span>
                    <img src={port} alt="port.png" className="ms-1 mb-2" />
                  </div>
                  <div className="portfolio_value">Portfolio Value</div>
                  <div className="value">£1.257 M</div>
                  <div className="roi">
                    <span className="roi_text">ROI</span>5.7%
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="progress_data_wr">
                <div>
                  <div>
                    <span className="color_div blackDiv"></span>
                    <span>
                      <span className="yellow_text">Debt</span>£942,750
                    </span>
                  </div>
                  <div>25%</div>
                </div>
                <div>
                  <div>
                    <span className="color_div yellowDiv"></span>
                    <span>
                      <span className="yellow_text">Net Equity</span>£314,250
                    </span>
                  </div>
                  <div>75%</div>
                </div>
                <div className="income_wr" style={{ marginLeft: "-10px" }}>
                  <span className="yellow_text">Monthly Net Income</span>
                  <span>£5,950</span>
                </div>
              </div>
            </div>
          </div>
          <p>Real-time data.</p>
        </div>
        <img className="login_bg welslide" src={loginbg} data-aos="fade-left"
                data-aos-duration="3000"/>
        <img className="login_bg welslideone" src={loginbg} data-aos="fade-right"
                data-aos-duration="3000"/>
        <img className="login_bg welslidetwo" src={loginbg} data-aos="fade-left"
                data-aos-duration="3000"/>
      </div>
    </div>
  );
};

export default Welcome;
