import React from "react";
import "../../../../../assets/css/style.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderForMobile } from "../../../../../component/header/Header";
import { formatCapilize } from "../../../../../util/commonFunction";

const NewPropertyInsurance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [userInput, setUserInput] = React.useState({});
  // const [error, setError] = React.useState([]);
  console.log("data" , data)
  const estimate = data?.estimate;
  console.log("estimate" , estimate)

  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    // validation();
    event.preventDefault();
    navigate("/newproperty-lettings", {
      state: { Insurance: userInput, ...data , estimate },
    });
  };

  // const validation = () => {
  //   const e = [];
  //   if (!userInput.type) {
  //     e["type"] = "Type is required";
  //   }
  //   if (!userInput.expiry) {
  //     e["expiry"] = "Expiry is required";
  //   }
  //   if (!userInput.provider) {
  //     e["provider"] = "Provider is required";
  //   }
  //   setError(e);
  // };

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/newproperty-ownership-third"
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
                  New Property: Insurance
                </h3>
                <p>Enter as many details as you can.</p>
              </div>
              <div className="roi_progres mt-3">
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow="35"
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
                      <select onChange={handleChange} name="type">
                        <option hidden></option>
                        <option>Building</option>
                        <option>Landlord</option>
                        <option>Content</option>
                        <option>Other</option>
                      </select>
                    </div> 
                  {userInput?.type == "Other" && (
                    <div className="form-group">
                      <label>OTHER TYPE</label>
                      <input
                        type="text"
                        className="form-control"
                        name="owntype"
                        onChange={handleChange}
                        autoComplete="off"
                        style={{ paddingLeft: "65px" }}
                      />
                    </div>
                  )} 
                    <div className="form-group">
                      <label>PROVIDER</label>
                      <select onChange={handleChange} name="provider">
                        <option hidden></option>
                        <option>Admiral</option>
                        <option>Ageco</option>
                        <option>Aviva</option>
                        <option>Axa</option>
                        <option>Churchill</option>
                        <option>DirectLine</option>
                        <option>Halifax</option>
                        <option>Saga</option>
                        <option>TescoBank</option>
                        <option>Other</option>
                      </select>
                    </div> 
                  {userInput?.provider == "Other" && (
                    <div className="form-group">
                      <label>OTHER PROVIDER</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ownprovider"
                        onChange={handleChange}
                        style={{ paddingLeft: "65px" }}
                        autoComplete="off"
                      />
                    </div>
                  )}
                  <div className="form-group" style={{width:"100%",backgroundColor:"black",borderRadius:"16px"}}>
                    <span className="Drops pr-2 pl-4">£</span>
                    <input
                      type="date"
                      className="form-conrol pt-4"
                      onChange={handleChange}
                      name="expiry"
                      style={{ paddingRight: "15px",borderColor:"#000",width:"220px",position:"relative",left:"12px" }}
                      />
                      <label>EXPIRY</label>
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

export default NewPropertyInsurance;
