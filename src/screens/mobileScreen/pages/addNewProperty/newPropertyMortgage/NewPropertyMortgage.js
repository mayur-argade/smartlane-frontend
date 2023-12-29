import React from "react";
import "../../../../../assets/css/style.css";
// import "../../../../../assets/css/web.css";
import "./newmortgage.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderForMobile } from "../../../../../component/header/Header";
import {
  formatCapilize,
  formatNumber,
} from "../../../../../util/commonFunction";
import Switch from  'react-switch' ;

const NewPropertyMortgage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [intrest, setIntrest] = React.useState({});
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

  const handleChangeintrest = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setIntrest({ value: numericValue });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validation();
    console.log("userinput" , userInput)
    userInput &&
      navigate("/newproperty-ownership", {
        state: { ...data, Martgage: { ...userInput, ...intrest } },
      });

  };
  const validation = () => {
    const e = [];

    if (!userInput.debt) {
      e["debt"] = "Debt is required";
    }
    // if (!userInput.type) {
    //   e["type"] = "Type is required";
    // }
    // if (!userInput.interest_rate) {
    //   e["interest_rate"] = "Interest Rate is required";
    // }
    // if (!userInput.provider) {
    //   e["provider"] = "Provider is required";
    // }
    // if (!userInput.expiry) {
    //   e["expiry"] = "Expiry is required";
    // }
    setError(e);
  };

  const [wantMortgage, setWantMortgage] = React.useState(true); 
 




  const handleToggleChange = (newChecked) => {
    setWantMortgage(newChecked);
  
    if (!newChecked) {
      setUserInput((prev) => ({
        ...prev,
        debt: "0",
        type: "",
        owntype: null,
        interest_rate: null,
        provider: "",
        ownprovider: null,
        expiry: null,
      }));
      setIntrest({ value: "0" });
  
      console.log("Without Mortgage - Default Values:", userInput, intrest);
    } else {
      console.log("With Mortgage - Current Values:", userInput, intrest);
    }
  };
  
  
  
  


  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/newproperty-roitwo"
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
                  New Property: Mortgage  
                </h3>
                <div className="mobile_mrtg">
                  <p>Enter as many details as you can.</p>
                   {/* <div className="form-check form-switch form-check-reverse mortag_swtch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" checked={wantMortgage} onChange={handleToggleChange} />
                    {/* <label className="form-check-label" htmlFor="flexSwitchCheckReverse" style={{visibility:'hidden'}}>
                      {wantMortgage ? 'Yes' : 'No'}
                    </label> 
                  </div>  */}
                  <label>
      
      <Switch  
      className="form-check form-switch form-check-reverse mortag_swtch"
      onChange={handleToggleChange} checked={wantMortgage}  
       onColor="#f9d75d" 
       offColor="#ffffff" 
 
      />
    </label>
                </div>
              </div>
              <div className="roi_progres mt-3">
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "50%" }}
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
                  {

    wantMortgage  &&
                  
                  <>
                  <div className="form-group">
                    <span className="PGuro text-white">£</span>
                    <label>debt</label>
                    <input
                      type="text"
                      className="form-control"
                      name="debt"
                      autoComplete="off"
                      value={userInput.debt && userInput.debt}
                      onChange={handleChange}
                      style={{ paddingLeft: "75px" }}
                    />
                    {error.debt && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.debt}
                      </div>
                    )}
                  </div> 
                    <div className="form-group selects">
                      <label>TYPE</label>
                      <select onChange={handleChanges} name="type">
                        <option hidden></option>
                        <option>Fixed</option>
                        <option>Discounted</option>
                        <option>Variable</option>
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
                        onChange={handleChanges}
                        style={{ paddingLeft: "65px" }}
                        autoComplete="off"
                      />
                    </div>
                  )}
                  <div className="form-group">
                    <label>INTEREST RATE (%)</label>
                    <input
                      inputMode="numeric"
                      value={intrest.value}
                      className="form-control"
                      name="interest_rate"
                      autoComplete="off"
                      onChange={handleChangeintrest}
                    />
                    {error.interest_rate && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.interest_rate}
                      </div>
                    )}
                  </div> 
                    <div className="form-group">
                      <label>PROVIDER</label>
                      <select onChange={handleChanges} name="provider">
                        <option hidden></option>
                        <option>Lloyds</option>
                        <option>Nationwide</option>
                        <option>Santander</option>
                        <option>NatWest</option>
                        <option>Barclays</option>
                        <option>HSBC</option>
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
                        onChange={handleChanges}
                        style={{ paddingLeft: "65px" }}
                        autoComplete="off"
                      />
                    </div>
                  )}
                  <div className="form-group" style={{width:"100%",backgroundColor:"black",borderRadius:"16px"}}>
                    <span className="Drops pr-2 pl-4">£</span>
                    <input
                      type="date"
                      className="form-conrol gdfg pt-4"
                      onChange={handleChanges}
                      name="expiry"
                      style={{borderColor:"#000",width:"220px", position:"relative", left:"12px"}}
                      />
                      <label>EXPIRY</label>
                  </div>
                  </>
}
                  <a
                    href="#"
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

export default NewPropertyMortgage;
