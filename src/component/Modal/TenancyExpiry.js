import React from "react";
import "../../assets/css/style.css";
import frame from "../../assets/img/Frame.svg";

const TenancyExpiry = () => {
  return (
    <div className="">
      <div className="main_lead_board mainleadboared">
        <div className="container">
          <div className="closetabcross">
            <a>
              <img src={frame} />
            </a>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="passcode_head">
                <h4 className="colorclasswhite">Tenancy Expiry.</h4>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_form pt-3">
                <form action="">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group formgroupinputcontainer">
                    <label></label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label></label>
                    <input
                      className="formgroupinputmain form-control"
                      type="password"
                    />
                  </div>
                  <div className="form-group">
                    <label></label>
                    <input
                      className="formgroupinputmain form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label></label>
                    <input
                      className="formgroupinputmain form-control"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label></label>
                    <input
                      className="formgroupinputmain form-control"
                      type="text"
                    />
                  </div>
                  <a href="#" className="btn all_property">
                    Save
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenancyExpiry;
