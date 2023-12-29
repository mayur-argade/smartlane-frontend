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

const NewPropertyOwnershipSecond = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [error, setError] = React.useState([]);
  const [userInput, setUserInput] = React.useState({});
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

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validation();
    userInput?.finish_quality &&
      userInput?.internal_area &&
      userInput?.no_of_bathrooms &&
      userInput?.no_of_bedrooms &&

      navigate("/newproperty-ownership-third", {
        state: { ...data, OwnerShip: { ...data?.OwnerShip, ...userInput } },
      });
  };

  const validation = () => {
    const e = [];
    if (!userInput.finish_quality) {
      e["finish_quality"] = "Finish Quality is required";
    }
    if (!userInput.internal_area) {
      e["internal_area"] = "Internal Area (SQ FT) is required";
    }
    if (!userInput.no_of_bathrooms) {
      e["no_of_bathrooms"] = "No of Bathrooms is required";
    }
    if (!userInput.no_of_bedrooms) {
      e["no_of_bedrooms"] = "No of Bedrooms is required";
    }
    setError(e);
  };
  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/newproperty-ownership"
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
                  New Property: Ownership
                </h3>
                <p>Enter as many details as you can.</p>
              </div>
              <div className="roi_progres mt-3">
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "65%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_form owbnership_frm pt-5">
                <form action="/action_page.php">
                  <div className="form-group">
                    <label>FINISH QUALITY</label>
                    <select onChange={handleChanges} name="finish_quality">
                      <option hidden></option>
                      <option value="very_high">Very High</option>
                      <option value="high">High</option>
                      <option value="average">Average</option>
                      <option value="below_average">Below Average</option>
                      <option value="unmodernised">Unmodernised</option>
                    </select>
                    {error.finish_quality && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.finish_quality}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <span className="PGuro text-white"></span>
                    <label>INTERNAL AREA (SQ FT)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="internal_area"
                      value={userInput.internal_area && userInput.internal_area}
                      onChange={handleChange}
                      autoComplete="off"
                      style={{ paddingLeft: "63px" }}
                    />
                    {error.internal_area && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.internal_area}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>NO. OF BEDROOMS</label>
                    <select onChange={handleChanges} name="no_of_bedrooms">
                      <option hidden></option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5+</option>
                    </select>
                    {error.no_of_bedrooms && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.no_of_bedrooms}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>NO. OF BATHROOMS</label>
                    <select onChange={handleChanges} name="no_of_bathrooms">
                      <option hidden></option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5+</option>
                    </select>
                    {error.no_of_bathrooms && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.no_of_bathrooms}
                      </div>
                    )}
                  </div>

                  {/* <Link
                    to={"/newproperty-insurance"}
                    state={{
                      ...data,
                      OwnerShip: userInput,
                    }}
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

export default NewPropertyOwnershipSecond;
