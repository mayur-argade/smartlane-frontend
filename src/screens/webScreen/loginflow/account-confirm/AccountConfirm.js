import React from "react";
import "../../../../assets/css/web.css";
import "./newaccount.css"
import port from "../../../../assets/web-img/port.png";
// import login from "../../../../assets/web-img/login_bg.png";
import login from "../../../../images/slideweb.png";
import downarrow from "../../../../images/arrow-right.svg";
import frame from "../../../../images/Frame.svg";
import { Link } from "react-router-dom";

const WebAccountConfirm = () => {
  let type = 1;
  return (
    <div className="bgcolorpurple-background">
      <div className="login_deta main_content_wr fullheight fullwidth">
        <div className="tab_body accountconfirmedwidth dropdownbackground">
          <div className="tab_content_wr">
            <div className="circle_graph pt-3">
              <div className="progressBar">
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
                <div className="income_wr">
                  <span>
                    <img
                      src={frame}
                      width="25"
                      style={{ marginRight: "4px", marginLeft: "-2px" }}
                    />
                    <span className="yellow_text ms-1">
                      {" "}
                      Monthly Net Income
                    </span>
                  </span>
                  <span>£5,950</span>
                </div>
              </div>
            </div>
          </div>{" "}
          <img className="loginback_groundimage newac" src={login} data-aos="fade-left"
                data-aos-duration="3000"/>
          <img className="loginback_groundimage newacone" src={login} data-aos="fade-right"
                data-aos-duration="3000"/>
          <img className="loginback_groundimage newactwo" src={login} data-aos="fade-left"
                data-aos-duration="3000"/>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="verft_inners account-confirmed-bottom-text">
              <h1>You’re in!</h1>
              <Link to={"/dashboard"} state={{ type: type }}>
                <img
                  src={downarrow}
                  style={{
                    backgroundColor: "#000",
                    borderRadius: "50%",
                    marginTop: "5px",
                    padding: "9px",
                  }}
                  width="55"
                />
              </Link>
            </div>
            <p className="text-center mt-5 accoutn-confirmedtextpara">
              Your account has been activated. Click the arrow to start setting
              up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAccountConfirm;
