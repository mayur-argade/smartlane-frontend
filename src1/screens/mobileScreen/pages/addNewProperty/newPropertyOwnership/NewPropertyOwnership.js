import React from "react";
import "../../../../../assets/css/style.css";
// import "../../../../../assets/css/web.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderForMobile } from "../../../../../component/header/Header";
import { formatCapilize } from "../../../../../util/commonFunction";

const NewPropertyOwnership = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [error, setError] = React.useState([]);
  const [userInput, setUserInput] = React.useState({});
  const [companyNumber, setCompanyNumber] = React.useState({});
  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];

  const handleChangecompany = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setCompanyNumber({ value: numericValue });
  }

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
    userInput?.type &&
      userInput?.type &&
      userInput?.property_type &&
      userInput?.construction_date &&
      navigate("/newproperty-ownership-second", {
        state: { ...data, OwnerShip: userInput, ComNum: companyNumber },
      });
  };

  const validation = () => {
    const e = [];
    if (!userInput.type) {
      e["type"] = "Type is required";
    }
    if (!userInput.property_type) {
      e["property_type"] = "Property Type is required";
    }
    if (!userInput.construction_date) {
      e["construction_date"] = "Construction Date is required";
    }
    setError(e);
  };
  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/newproperty-mortgage"
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
                    <label>TYPE</label>
                    <select onChange={handleChanges} name="type">
                      <option hidden></option>
                      <option value="personal">Personal</option>
                      <option value="ltd_company">Ltd Company</option>
                    </select>
                    {error.type && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.type}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>COMPANY NUMBER</label>
                    <input
                      inputMode="numeric"
                      value={companyNumber?.value}
                      className="form-control"
                      name="company_number"
                      autoComplete="off"
                      onChange={handleChangecompany}
                      style={{ paddingLeft: "63px" }}
                    />
                    {error.company_number && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.company_number}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>PROPERTY TYPE</label>
                    <select onChange={handleChanges} name="property_type">
                      <option hidden></option>
                      <option value="flat">Flat</option>
                      <option value="detached_house">Detached House</option>
                      <option value="terraced_house">Terraced House</option>
                      <option value="semi-detached_house">Semi Detached House</option>
                    </select>
                    {error.property_type && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.property_type}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>CONSTRUCTION DATE</label>
                    <select onChange={handleChanges} name="construction_date">
                      <option hidden></option>
                      <option value="pre_1914">Pre 1914</option>
                      <option value="1914_2000">1914 2000</option>
                      <option value="2000_onwards">2000 Onwards</option>
                    </select>
                    {error.construction_date && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.construction_date}
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

export default NewPropertyOwnership;
