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

const NewPropertyRoi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [userInput, setUserInput] = React.useState({});
  const [error, setError] = React.useState({});
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

  const handleSubmit = (event) => {
    validation();
    event.preventDefault();

    userInput?.gross_monthly_income &&
      userInput?.mortgage_payment &&
      navigate("/newproperty-roitwo", {
        state: { ...data, ROI: userInput },
      });
  };

  const validation = () => {
    const e = [];

    if (!userInput.gross_monthly_income) {
      e["gross_monthly_income"] = "Gross Monthly Income is required";
    }
    if (!userInput.mortgage_payment) {
      e["mortgage_payment"] = "Mortgage Payment is required";
    }
    setError(e);
  };

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/postcode"
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
                    style={{ width: "20%" }}
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
                    <span className="PGuro text-white">£</span>
                    <label>MONTHLY RENT</label>
                    <input
                      name="gross_monthly_income"
                      type="text"
                      autoComplete="off"
                      value={
                        userInput.gross_monthly_income &&
                        userInput.gross_monthly_income
                      }
                      className="form-control"
                      onChange={handleChange}
                      style={{ paddingLeft: "75px" }}
                    />
                    {error.gross_monthly_income && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.gross_monthly_income}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <span className="PGuro text-white">£</span>
                    <label>MORTGAGE PAYMENT</label>
                    <input
                      name="mortgage_payment"
                      type="text"
                      autoComplete="off"
                      value={
                        userInput.mortgage_payment && userInput.mortgage_payment
                      }
                      className="form-control"
                      onChange={handleChange}
                      style={{ paddingLeft: "75px" }}
                    />
                    {error.mortgage_payment && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.mortgage_payment}
                      </div>
                    )}
                  </div>
                  {/* <Link
                    to={"/newproperty-roitwo"}
                    state={{ ...data, ROI: userInput }}
                  > */}
                  <a
                    href=""
                    onClick={handleSubmit}
                    className="btn all_property"
                  >
                    Next
                  </a>
                  {/* </Link> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPropertyRoi;
