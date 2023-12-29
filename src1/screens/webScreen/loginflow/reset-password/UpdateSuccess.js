import React from "react";
import "../../../../assets/css/web.css";
import keyPerson from "../../../../assets/img/Key_Person.svg";
import keyhole from "../../../../assets/img/Keyhole.png";
import { Link } from "react-router-dom";

const WebUpdateSuccess = () => {
  return (
    <div className="welcome_main bg-black  fullheight">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="updt_head pt-5 headingaccount marginzeroauto">
              <h1>update successful!</h1>
              <div className="sub_title">
                <p>You’re ready to log in again.</p>
              </div>
            </div>
            <div className="update_key updatekeypadding">
              <img src={keyPerson} />
            </div>
            <div className="marginzeroauto loginbuttonpaddingbottom loginbuttonmaxwidth">
              <Link to={"/login"}>
                <button className="btn login_submits btn_bg_ylw">Login</button>
              </Link>
            </div>
          </div>
          <div className="welcom_bottom marginzeroauto welcomeKeyholebottom">
            <img className="welcomeKeyholebottomimage" src={keyhole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebUpdateSuccess;
