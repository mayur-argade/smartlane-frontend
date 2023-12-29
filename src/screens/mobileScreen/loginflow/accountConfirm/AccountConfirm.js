import React from "react";
import "../../../../assets/css/style.css";
import "./accountconfirm.css";
import port from "../../../../assets/web-img/port.png";
import arrow from "../../../../assets/img/arrow-rightn.svg";
import { Link } from "react-router-dom";
// import login from "../../../../assets/img/threelineimge.svg";
import slideimg from "../../../../images/slideimg.png"

const AccountConfirm = () => {
  let type = 1;
  return (
    <div
      className="welcome_mainconfirm"
      data-aos="zoom-out"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mob_head d-block">
              <h3 className="text-center">smartlane.</h3>
              <div className="verification_main main_content_wr">
                <div className="tab_body">
                  <div className="tab_content_wr">
                    <div className="circle_graph">
                      <div className="progressBar">
                        <div className="circle_content">
                          <div className="portfolio_no">
                            <span>3</span>
                            <img
                              src={port}
                              alt="port.png"
                              className="ms-1 mb-2"
                            />
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
                              <span className="yellow_text">Net Equity</span>
                              £314,250
                            </span>
                          </div>
                          <div>25%</div>
                        </div>
                        <div className="income_wr monthly">
                          <span className="yellow_text">
                            Monthly Net Income
                          </span>
                          <span>£5,950</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <img className="loginback_groundimageaccount" src={login} /> */}
                  <img className="loginback_groundimageaccount newslide" src={slideimg} data-aos="fade-left"
                data-aos-duration="3000"/>
                  <img className="loginback_groundimageaccount newslideone" src={slideimg} data-aos="fade-right"
                data-aos-duration="3000"/>
                  <img className="loginback_groundimageaccount newslidetwo" src={slideimg} data-aos="fade-left"
                data-aos-duration="3000"/>
                </div>
              </div>
              <p className="verf_deta text-center">Real-time data.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lead_slide mt-30"></div>
      <div className="main_lead_boardconfirm">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="verft_inner">
                <h1>You’re in!</h1>
                {/* <a href=""> */}
                <Link to={"/dashboard"} state={{ type: type }}>
                  <img src={arrow} />
                </Link>
                {/* </a> */}
                <p className="text-center mt-5">
                  Your account has been activated. Click the arrow to start
                  setting up.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountConfirm;
