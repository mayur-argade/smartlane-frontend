import React from "react";
import "../../../../assets/css/web.css";
import port from "../../../../assets/web-img/port.png";
// import Union2 from "../../../../assets/web-img/Union2.svg";
import welcome from "../../../../assets/web-img/welcome_back.svg";
import propell from "../../../../assets/web-img/propell.svg";
import { Link } from "react-router-dom";
import { Signin } from "../../../../component/googleSignin/signin";
import loginbg from "../../../../images/slideweb.png";


const WebWelcomeBack = () => {
  return (
    <div className="web_login_main bgblackcolor1e1e1e">
      <div className="login_deta main_content_wr blackbgcolor000">
        <div className="tab_body p-2 mt-2">
          <div
            className="tab_content_wr pt-3 pb-3"
            style={{ position: "relative" }}
          >
            <div className="circle_graph pt-3">
              <div className="progressBar progressbaryellowborder">
                <div className="circle_content">
                  <div className="portfolio_no">
                    <span>3</span>
                    <img src={port} alt="port.png" />
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
                  <div>75%</div>
                </div>
                <div>
                  <div>
                    <span className="color_div yellowDiv"></span>
                    <span>
                      <span className="yellow_text">Net Equity</span>£314,250
                    </span>
                  </div>
                  <div>25%</div>
                </div>
                <div className="income_wr" style={{ marginLeft: "-10px" }}>
                  <span className="yellow_text">Monthly Net Income</span>
                  <span>£5,950</span>
                </div>
              </div>
            </div>
            <img
              className="threelineimg"
              src={loginbg}
              style={{
                position: "absolute",
                zIndex: "-2",
                top: "15%",
                left: "-50px",
                maxWidth: "391px",
              }}
              data-aos="fade-left"
                data-aos-duration="3000"
            />
            <img
              className="threelineimg"
              src={loginbg}
              style={{
                position: "absolute",
                zIndex: "-2",   
                maxWidth: "391px",
                marginTop:"33px"
              }}
              data-aos="fade-right"
                data-aos-duration="3000"
            />
            <img
              className="threelineimg"
              src={loginbg}
              style={{
                position: "absolute",
                zIndex: "-2", 
                maxWidth: "391px",
                marginTop:"50px",
                marginLeft:"30px"
              }}
              data-aos="fade-left"
                data-aos-duration="3000"
            />
            <img className="login_bg welocomebackimg mt-3" src={welcome} />
          </div>
        </div>
      </div>

      <div className="login_type" style={{ flexDirection: "column" }}>
        <img src={propell} style={{height:'60px'}} />
        <div className="wb_login_btn" style={{ padding: "120px 0" }}>
          <Signin loginpage={"login"} />
          <Link to={"/login"}>
            <a href="#" className="btn all_btn">
              Login with email
            </a>
          </Link>
        </div>
        <p className="bottom_tag">
          Don’t have an account yet?
          <Link to={"/welcome-signup"}>
            <a href="#"> Sign up</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default WebWelcomeBack;
