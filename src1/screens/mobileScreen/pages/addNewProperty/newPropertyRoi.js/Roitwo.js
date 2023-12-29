import React from "react";
import "../../../../../assets/css/style.css";
// import "../../../../../assets/css/web.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderForMobile } from "../../../../../component/header/Header";
import {
  formatCapilize,
  formatNumber,
} from "../../../../../util/commonFunction";

const RoiTwo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [error, setError] = React.useState([]);
  const [userInput, setUserInput] = React.useState({});
  const [number, setNumber] = React.useState({});

  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value.replace(/,/g, "");
    setUserInput((prev) => ({
      ...prev,
      [name]: formatNumber(newValue),
    }));
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setNumber({ value: numericValue });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validation();
    number?.value &&
      userInput?.ground_rent &&
      userInput?.service_charge &&
      navigate("/newproperty-mortgage", {
        state: { ...data, ROI: { ...data.ROI, ...userInput, ...number } },
      });
  };

  const validation = () => {
    const e = [];

    if (!number?.value) {
      e["management_fee"] = "Management Fee is required";
    }
    if (!userInput.ground_rent) {
      e["ground_rent"] = "Ground Rent is required";
    }
    if (!userInput.service_charge) {
      e["service_charge"] = "Service Charge is required";
    }
    setError(e);
  };

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/newproperty-roi"
        logo={mbtogel}
        title={`Hi ${formatCapilize(userName)}`}
      />
      <div className="lead_slide" style={{ marginTop: "5px" }}></div>
      <div className="main_lead_board Nfd_md">
        <div className="cover_mb"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="passcode_head">
                <h3 className="text-white" style={{ fontWeight: 700 }}>
                  New Property: ROI
                </h3>
                <p>Enter as many details as you can.</p>
              </div>
              <div className="roi_progres mt-3">
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "35%" }}
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_form pt-5">
                <form action="/action_page.php">
                  <div className="form-group">
                    <label>MANAGEMENT FEE (%)</label>
                    <input
                      inputMode="numeric"
                      autoComplete="off"
                      className="form-control"
                      name="management_fee"
                      value={number?.value}
                      onChange={handleInputChange}
                    />
                    {error.management_fee && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.management_fee}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <span className="PGuro text-white">£</span>
                    <label>GROUND RENT MONTHLY</label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="ground_rent"
                      value={userInput.ground_rent && userInput.ground_rent}
                      onChange={handleChange}
                      style={{ paddingLeft: "75px" }}
                    />
                    {error.ground_rent && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.ground_rent}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <span className="PGuro text-white">£</span>
                    <label>SERVICE CHARGE PER MONTH</label>
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="service_charge"
                      value={
                        userInput.service_charge && userInput.service_charge
                      }
                      onChange={handleChange}
                      style={{ paddingLeft: "75px" }}
                    />
                    {error.service_charge && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.service_charge}
                      </div>
                    )}
                  </div>
                  <a
                    href=""
                    onClick={handleSubmit}
                    className="btn all_property"
                  >
                    Next
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

export default RoiTwo;
