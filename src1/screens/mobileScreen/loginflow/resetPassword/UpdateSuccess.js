import React from "react";
import "../../../../assets/css/style.css";
// import "../../../../assets/css/web.css";
import keyperson from "../../../../assets/img/Key_Person.svg";
import Keyhole from "../../../../assets/img/Keyhole.png";
import { Link } from "react-router-dom";

const UpdateSuccess = () => {
  return (
    <div className="welcome_main bg-black">
      <div className="container" style={{ overflow: "scroll", height: "100%" }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="updt_head pt-5">
              <h1>update successful!</h1>
              <div className="sub_title">
                <p>You’re ready to log in again.</p>
              </div>
            </div>
            <div className="update_key">
              <img src={keyperson} />
            </div>
            <Link to={"/welcome-login"}>
              <button
                className="btn login_submits btn_bg_ylw "
                style={{ marginBottom: "15px" }}
              >
                Login
              </button>
            </Link>
          </div>
          <div className="bottomlogo">
            <img src={Keyhole} style={{ width: "15%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSuccess;
