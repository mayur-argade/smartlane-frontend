import React from "react";
import "../../../../assets/css/style.css";
// import "../../../../assets/css/web.css";
import "./welcome.css";
import welcome from "../../../../assets/img/welcome_arrow.png";
import keyhole from "../../../../assets/img/Keyhole.png";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div
      className="welcome_main custome_welcome"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>welcome to Propell.</h1>
            <div className="sub_title">
              <p>Tell us why you’re here.</p>
              <div className="welcom_arrow">
                <img src={welcome} />
              </div>
            </div>
            <div className="welcom_btns">
              {/* <a href="#" className="btn"> */}
              <Link to={"/register"} className="btn">
                I’m a landlord
              </Link>
              {/* </a> */}
              <a href="#" className="btn">
                I’m a tenant
              </a>
            </div>
          </div>
          {/* <div className="welcom_bottom logosingup">
            <img src={keyhole} className="logosingupimg mt-5" />
          </div> */}
          <div className="bottomlogo">
            <img src={keyhole} style={{ width: "20%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
