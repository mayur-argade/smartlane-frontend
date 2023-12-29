import React , {useState} from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
//import expand from "../../assets/img/Expand1.png";
import addprop from "../../assets/web-img/add-prop.png";
import { searchPostCode } from "../../Devlopment/postCode/index";
import Switch from  'react-switch' ;
import {
  addPropertList,
  addPropertbyAdmin,
  propertySaleValue,
} from "../../Devlopment/property/index";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import { formatNumber } from "../../util/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";

const AddNewProperty = ({ getPropertyList, PortfolioDatas, admin, userId }) => {
  const [modalType, setModalType] = React.useState(1);
  const [addressData, setAddressData] = React.useState([]);
  const [tenant] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState();
  const [userData, setUserData] = React.useState({});
  const [error, setError] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [salevalue, setSalevalue] = React.useState("");
  const [opens, setOpens] = React.useState(false);
  const [postcodes, setPostcodes] = React.useState('');
  const [number, setNumber] = React.useState({});
  const [intrest, setIntrest] = React.useState({});
  const [companyNumber, setCompanyNumber] = React.useState({});
  const [localData , setLocalData] = React.useState({});
  const [showDropdown, setShowDropdown] = useState(false);
   //const [dropdownMessage, setDropdownMessage] = useState('');

  console.log("userDatauserData",userData)
  console.log("selectedAddress",selectedAddress)
  console.log("localData" , localData)
  const handleShow = () => {
    setOpen(true);
  };
  salevalue;     

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleSelect = (item) => {
    setSelectedAddress(item);
  };

  const handleChange = async (event) => {
    setPostcodes(event.target.value)
    handleSelect();
    const payload = { postcode: event.target.value };
    const response = await searchPostCode(payload);
    response.data && setAddressData(response?.data);
  };

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleToggleChange = (newChecked) => {
    setWantMortgage(newChecked);
    
    if (!newChecked) {
      setUserData((prev) => ({
        ...prev,
        debt: "0",
        TYPE: "",
        OWNTYPE: "",
        interest_rate: null,
        PROVIDER: "",
        OWNPROVIDER: null,
        Mortgage_expiry: null,
      }), () => {
       console.log("UpdateduserData:", userData);
      });
    }
  };
  

  

  
console.log("setuser" , userData)



 // const [showEstimate, setShowEstimate] = useState(false);
  const [estimateValue, setEstimateValue] = useState('');

  const handleEstimatevalue = (e) => {
    setEstimateValue(e.target.value);
    // Add any validation logic here and update the error state
  };


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setNumber({ value: numericValue });
  }

  const handleChangeintrest = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setIntrest({ value: numericValue });
  }

  const handleChangecompany = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setCompanyNumber({ value: numericValue });
  }

  const handleUserInputs = (event) => {
    const { name, value } = event.target;
    const newValue = value.replace(/,/g, "");
    setUserData((prev) => ({
      ...prev,
      [name]: formatNumber(newValue),
    }));
  };

  function re(val) {
    return parseFloat(val?.replace(/,/g, ""));
  }

  const managementFee =
    (re(userData?.gross_monthly_income) * re(number?.value)) / 100;
console.log("userId" , userId)
  const handleSubmit = async (data) => {
    console.log("handlesubmitcall")
    const payload = {
      id: userId,
      property: {
        property_estimate: estimateValue.length > 1 ? estimateValue : data?.result?.estimate ,
        property_margin: data?.result?.margin,
        property_name: selectedAddress?.postcode,
        address: `${selectedAddress?.line_1},${selectedAddress?.line_2},${selectedAddress?.line_3},${selectedAddress?.country}`,
      },
      roi: {
        gross_monthly_income: re(userData?.gross_monthly_income),
        mortgage_payment: re(userData?.mortgage_payment),
        management_fee: managementFee,
        ground_rent: re(userData?.ground_rent),
        service_charge: re(userData?.service_charge),
      },
      insurance: {
        type:
          userData?.Inusurance_type == "Other"
            ? userData?.Inusuranceowntype
            : userData?.Inusurance_type,
        provider:
          userData?.Inusurance_PROVIDER == "Other"
            ? userData?.InusuranceownPROVIDER
            : userData?.Inusurance_PROVIDER,
        expiry: moment(userData?.Inusurance_expiry).format("DD/MM/YYYY"),
      },
      ownership: {
        post_code: selectedAddress?.postcode,
        company_number: re(companyNumber?.value),
        type: userData?.Ownership_type,
        property_type: userData?.property_type,
        construction_date: userData?.construction_date,
        internal_area: re(userData?.internal_area),
        no_of_bedroom: re(userData?.no_of_bedrooms),
        no_of_bathroom: re(userData?.no_of_bathrooms),
        finish_quality: userData?.finish_quality,
        outdoor_space: userData?.outdoor_space,
        off_street_parking: userData?.off_street_parking,
      },
      mortgage: {
        debt: re(userData?.debt),
        type: userData?.TYPE == "Other" ? userData?.OWNTYPE : userData?.TYPE,
        interest_rate: re(intrest?.value),
        provider:
          userData?.PROVIDER == "Other"
            ? userData?.OWNPROVIDER
            : userData?.PROVIDER,
        expiry: moment(userData?.Mortgage_expiry).format("DD/MM/YYYY"),
      },
      letting: {
        current_tenent: tenant,
        tenant_expiry: moment(userData?.tenancy_expiry).format("DD/MM/YYYY"),
      },
    };
  
    const response =
      userData?.current_tenent && userData?.tenancy_expiry && admin
        ? await addPropertbyAdmin(payload)
        : await addPropertList(payload);
        console.log("response" , response)
        console.log("payload" , payload)
    response?.success && getPropertyList();
    response?.success && !admin && PortfolioDatas();
    response?.success && setUserData({});
    response?.success && handleClose();
   
  };

  const [groundRentValue, setGroundRentValue] = useState('');
  //const [userConfirmation, setUserConfirmation] = useState('');



 console.log("groundRentValue" , groundRentValue)
 console.log("estimateValue" , estimateValue);
 console.log("estimateValue" , setGroundRentValue);
 //console.log("estimateValue" , setUserConfirmation);
 //console.log("estimateValue" , showEstimate);


  const handleUpload = async () => {
    console.log("functionvall")
    validationnext();
    setOpens(true);
    const payload = {
      postcode: selectedAddress?.postcode,
      property_type: userData?.property_type,
      construction_date: userData?.construction_date,
      internal_area: estimateValue.length > 1 ? estimateValue : re(userData?.internal_area),
      bedrooms: userData?.no_of_bedrooms,
      bathrooms: userData?.no_of_bathrooms,
      finish_quality: userData?.finish_quality,
      outdoor_space: userData?.outdoor_space,
      off_street_parking: userData?.off_street_parking,
    };
    const response = await propertySaleValue(payload);
   // response.success && setSalevalue(response.data);
   // response.success && handleSubmit(response?.data);
    if (response.success) {
      setSalevalue(response.data);
      handleSubmit(response?.data);
      console.log("response", response);
      console.log("payload", payload);
      setLocalData(payload);
      setOpens(false);
      setModalType(1);
    } else {
   
      setShowDropdown(true);
      console.log("payload" , payload)
      setSalevalue(response.data);
      setOpens(false);
      setLocalData(payload)
    }

    
   
    
    setLocalData(payload)
    setOpens(false);
    setModalType(1);
  };

  const [wantMortgage, setWantMortgage] = useState(true); 

  console.log("setWantMortgage" , setWantMortgage)

  
  const next = () => {
    const validations = validation();
    Object.keys(validations) <= 0 && setModalType(2);
  };
  const validation = () => {
    const e = [];
    if (!selectedAddress?.postcode) {
      e["postcode"] = "Postcode is required";
    }
    // if (!userData?.NET_EQUITY) {
    //   e["NET_EQUITY"] = "Net Equity is required";
    // }
    if (!userData?.gross_monthly_income) {
      e["gross_monthly_income"] = "Gross Monthly Income is required";
    }
    if (!userData?.mortgage_payment) {
      e["mortgage_payment"] = "Mortgage Payment is required";
    }
    if (!number?.value) {
      e["management_fee"] = "Management Fee is required";
    }
    if (!userData?.ground_rent) {
      e["ground_rent"] = "Ground Rent is required";
    }
    if (!userData?.service_charge) {
      e["service_charge"] = "Service Charge is required";
    }
    if (!userData?.debt) {
      e["debt"] = "debt is required";
    }
    // if (!userData?.TYPE) {
    //   e["TYPE"] = "Type is required";
    // }
    // if (!userData?.interest_rate) {
    //   e["interest_rate"] = "Interest Rate is required";
    // }
    // if (!userData?.PROVIDER) {
    //   e["PROVIDER"] = "Provider is required";
    // }
    // if (!userData?.Mortgage_expiry) {
    //   e["Mortgage_expiry"] = "Expiry is required";
    // }
    setError(e);
    return e;
  };

  const validationnext = () => {
    const e = [];
    if (!userData?.Ownership_type) {
      e["Ownership_type"] = "Type is required";
    }
    // if (!userData?.company_number) {
    //   e["company_number"] = "Company Number is required";
    // }
    if (!userData?.property_type) {
      e["property_type"] = "Property Type is required";
    }
    if (!userData?.construction_date) {
      e["construction_date"] = "Construction Date is required";
    }
    if (!userData?.internal_area) {
      e["internal_area"] = "Internal Area is required";
    }
    if (!userData?.no_of_bedrooms) {
      e["no_of_bedrooms"] = "No of Bedrooms is required";
    }
    if (!userData?.no_of_bathrooms) {
      e["no_of_bathrooms"] = "No of Bathrooms is required";
    }
    if (!userData?.finish_quality) {
      e["finish_quality"] = "Finish Quality is required";
    }
    if (!userData?.outdoor_space) {
      e["outdoor_space"] = "Outdoor Space is required";
    }
    if (!userData?.off_street_parking) {
      e["off_street_parking"] = "Off Street Parking is required";
    }
    // if (!userData?.Inusurance_type) {
    //   e["Inusurance_type"] = "Type is required";
    // }
    // if (!userData?.Inusurance_expiry) {
    //   e["Inusurance_expiry"] = "Expiry is required";
    // }
    // if (!userData?.Inusurance_PROVIDER) {
    //   e["Inusurance_PROVIDER"] = "Provider is required";
    // }
    if (!tenant) {
      e["current_tenent"] = "Current Tenent is required";
    }
    if (!userData?.tenancy_expiry) {
      e["tenancy_expiry"] = "Tenancy Expiry is required";
    }
    // if (!userData?.beneficiary_id) {
    //   e["beneficiary_id"] = "Beneficiary ID is required";
    // }
    // if (!userData?.payprop_id) {
    //   e["payprop_id"] = "Property ID is required";
    // }
    setError(e);
  };

  console.log("localData" , localData)




  return (
    <React.Fragment>
      {admin ? (
        <button
          className="purple_btn purplebuttonadminbut"
          onClick={userId && handleShow}
        >
          + Add New Property
        </button>
      ) : (
        <div className="img_wr" style={{ cursor: "pointer" }}>
          <img src={addprop} alt="" onClick={handleShow} />
        </div>
      )}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        style={{ margin: "30px" }}
      >
        {modalType == 1 ? (
          <div className="bglightcolour new_prpty_mdl">
            <div className="py-5 textcolourwhite">
              <div className="container">
                <div className="crossclosetab">
                  <a onClick={handleClose}>
                    <img src={frame} />
                  </a>
                </div>
                <div className="AddNewPropertyheading textcolourwhite addnewcommonproperty">
                  Add A New Property
                </div>
              </div>
              <div className="container py-3">
                <div className="row">
                  <div className="col-sm-4 minwidth">
                    <div className="login_form">
                      <form action="">
                        <p className="text-white">
                          {selectedAddress &&
                            selectedAddress?.line_1 +
                            selectedAddress?.line_2 +
                            selectedAddress?.line_3}
                        </p>
                        <div className="form-group flexgrwone">
                          <label>POST CODE</label>
                          <input
                            type="text"
                            className="form-control borderblack"
                            style={{ paddingLeft: "65px" }}
                            onChange={handleChange}
                          />
                          {error.postcode && (
                            <div
                              className="error-msgs ms-2"
                              style={{
                                color: "#F0AD4E",
                                float: "left",
                                position: "absolute",
                              }}
                            >
                              {error.postcode}
                            </div>
                          )}
                        </div>
                        <ul
                          className="listtage"
                          style={{
                            listStyleType: "none",
                            backgroundColor: "black",
                            maxHeight: "300px",
                            color: "white",
                            overflow: "scroll",
                          }}
                        >
                          {addressData &&
                            !selectedAddress && postcodes &&
                            addressData.map((item) => (
                              <li
                                className="p-2"
                                key={item?.id}
                                onClick={() => {
                                  setSelectedAddress(item);
                                }}
                              >
                                {item?.line_1 + item?.line_2 + item?.line_3}
                              </li>
                            ))}
                        </ul>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="addnewpropertysubheading textcolourwhite addnewcommonproperty pb-4">
                  ROI
                </div>
              </div>
              <div className="container pb-3">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="login_form">
                      <form action="">
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group flexgrowone">
                            <span className="PGuro text-white">£</span>
                            <label>MONTHLY RENT</label>
                            <input
                              type="text"
                              className="form-control borderblack"
                              style={{ paddingLeft: "78px" }}
                              value={
                                userData.gross_monthly_income &&
                                userData.gross_monthly_income
                              }
                              onChange={handleUserInputs}
                              name="gross_monthly_income"
                              autoComplete="off"
                            />
                            {error.gross_monthly_income && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.gross_monthly_income}
                              </div>
                            )}
                          </div>
                          <div className="form-group flexgrowone ml-1">
                            <span className="PGuro text-white">£</span>
                            <label>MORTAGE PAYMENT</label>
                            <input
                              type="text"
                              className="form-control borderblack"
                              style={{ paddingLeft: "78px" }}
                              value={
                                userData.mortgage_payment &&
                                userData.mortgage_payment
                              }
                              onChange={handleUserInputs}
                              name="mortgage_payment"
                              autoComplete="off"
                            />
                            {error.mortgage_payment && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.mortgage_payment}
                              </div>
                            )}
                          </div>{" "}
                          <div className="form-group flexgrowone ml-1">
                            <label>MANAGEMENT FEE (%)</label>
                            <input
                              className="form-control borderblack"
                              style={{ paddingLeft: "65px" }}
                              onChange={handleInputChange}
                              value={number?.value}
                              name="management_fee"
                              autoComplete="off"
                              pattern="[0-9]*"
                              inputMode="numeric"
                            />
                            {error.management_fee && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.management_fee}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth ">
                            <span className="PGuro text-white">£</span>
                            <label>GROUND RENT MONTHLY</label>
                            <input
                              type="text"
                              className="form-control borderblack"
                              style={{ paddingLeft: "78px" }}
                              value={
                                userData.ground_rent && userData.ground_rent
                              }
                              onChange={handleUserInputs}
                              name="ground_rent"
                              autoComplete="off"
                            />
                            {error.ground_rent && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.ground_rent}
                              </div>
                            )}
                          </div>
                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <span className="PGuro text-white">£</span>
                            <label>SERVICE CHARGE PER MONTH</label>
                            <input
                              type="text"
                              className="form-control borderblack"
                              style={{
                                paddingLeft: "78px",
                              }}
                              value={
                                userData.service_charge &&
                                userData.service_charge
                              }
                              onChange={handleUserInputs}
                              name="service_charge"
                              autoComplete="off"
                            />
                            {error.service_charge && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.service_charge}
                              </div>
                            )}
                          </div>
                          <div className="form-group borderblack flexgrowone selectwidth"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="addnewpropertysubheading mortag_bx textcolourwhite addnewcommonproperty pb-3">
                  <h2 style={{marginRight: '40px'}}>Mortgage</h2>
                  {/* <div className="form-check form-switch form-check-reverse mortag_swtch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" checked={wantMortgage} onChange={handleToggleChange} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckReverse" style={{visibility:'hidden'}}>
                      {wantMortgage ? 'Yes' : 'No'}
                    </label>
                  </div> */}
             <label>
      
      <Switch onChange={handleToggleChange} checked={wantMortgage}  
       onColor="#f9d75d" 
       offColor="#ffffff" 
      className="form-check-input"
      />
    </label>

                </div>
              </div>
         

             {
              wantMortgage  && 
              <>
               <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="login_form">
                      <form action="">
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <span className="PGuro text-white">£</span>
                            <label>debt</label>
                            <input
                              type="text"
                              className="form-control borderblack"
                              style={{
                                paddingLeft: "76px",
                              }}
                              value={userData.debt && userData.debt}
                              onChange={handleUserInputs}
                              name="debt"
                              autoComplete="off"
                            />
                            {error.debt && (
                              <div
                                className="error-msgs ms-2"
                                style={{
                                  color: "#F0AD4E",
                                  float: "left",
                                }}
                              >
                                {error.debt}
                              </div>
                            )}
                          </div>

                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <label>TYPE</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                marginRight: "15px",
                              }}
                              onChange={handleUserInput}
                              name="TYPE"
                            >
                              <option hidden></option>

                              <option>Fixed</option>
                              <option>Discounted</option>
                              <option>Variable</option>
                              <option>Other</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                          </div>
                          {userData.TYPE == "Other" && (
                            <div className="form-group borderblack flexgrowone selectwidth ml-1">
                              <label>OTHER TYPE</label>
                              <input
                                type="text"
                                className="form-control bordeblack"
                                onChange={handleUserInput}
                                name="OWNTYPE"
                                autoComplete="off"
                              />
                            </div>
                          )}
                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <label>INTEREST RATE (%)</label>
                            <input
                              inputMode="numeric"
                              value={intrest.value}
                              className="form-control borderblack"
                              style={{ paddingLeft: "65px" }}
                              onChange={handleChangeintrest}
                              name="interest_rate"
                              autoComplete="off"
                            />
                            {error.interest_rate && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.interest_rate}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <label>PROVIDER</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                marginRight: "15px",
                              }}
                              onChange={handleUserInput}
                              name="PROVIDER"
                            >
                              <option hidden></option>
                              <option>Lloyds</option>
                              <option>Nationwide</option>
                              <option>Santander</option>
                              <option>NatWest</option>
                              <option>Barclays</option>
                              <option>HSBC</option>
                              <option>Other</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                          </div>
                          {userData.PROVIDER == "Other" && (
                            <div className="form-group borderblack flexgrowone selectwidth ml-1">
                              <label>OTHER PROVIDER</label>
                              <input
                                type="text"
                                className="form-control bordeblack"
                                onChange={handleUserInput}
                                name="OWNPROVIDER"
                                autoComplete="off"
                              />
                            </div>
                          )}
                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <label>EXPIRY</label>
                            <input
                              type="date"
                              className="form-control borderblack"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "10px",
                                paddingTop: "22px"
                              }}
                              onChange={handleUserInput}
                              name="Mortgage_expiry"
                            />
                            {error.Mortgage_expiry && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.Mortgage_expiry}
                              </div>
                            )}
                          </div>
                          <div className="displaynoneinput form-group borderblack flexgrowone selectwidth">
                            <label>GROUND RENT</label>
                            <input
                              type="text"
                              onChange={handleUserInput}
                              name="ground_rent"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row justifycontent">
                  <div className="col-sm-4">
                    <div className="login_form" style={{ textAlign: "center" }}>
                      {userData?.gross_monthly_income &&
                        userData?.mortgage_payment &&
                        userData?.management_fee &&
                        userData?.ground_rent &&
                        userData?.service_charge &&
                        userData?.debt &&
                        userData?.TYPE &&
                        userData?.interest_rate &&
                        userData?.PROVIDER &&
                        userData?.Mortgage_expiry &&
                        ""}
                     
                    </div>
                  </div>
                </div>
              </div>
              </>
             }
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                  <button className="btn login_submits continuebutton" onClick={next}>Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bglightcolour">
            <div className="py-5 textcolourwhite">
              <div className="container">
                <div className="crossclosetab">
                  <a>
                    <img src={frame} onClick={() => setModalType(1)} />
                  </a>
                </div>
                <div className="AddNewPropertyheading textcolourwhite addnewcommonproperty">
                  New Property: Further Detalis
                </div>
              </div>
              <div className="container mt-5">
                <div className="addnewpropertysubheading textcolourwhite addnewcommonproperty pb-3">
                  Ownership
                </div>
              </div>
              <div className="container pb-3">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="login_form">
                      <form action="">
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <label>COMPANY TYPE</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="Ownership_type"
                            >
                              <option hidden></option>
                              <option value="personal">Personal</option>
                              <option value="ltd_company">Ltd Company</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.Ownership_type && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.Ownership_type}
                              </div>
                            )}
                          </div>
                          <div className="form-group flexgrowone datetypewidth ml-1">
                            <label>COMPANY NUMBER</label>
                            <input
                              inputMode="numeric"
                              value={companyNumber?.value}
                              className="form-control bordrblack"
                              name="company_number"
                              autoComplete="off"
                              onChange={handleChangecompany}
                              style={{ paddingLeft: "64px" }}
                            />
                            {error.company_number && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.company_number}
                              </div>
                            )}
                          </div>
                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <label>PROPERTY TYPE</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="property_type"
                            >
                              <option hidden></option>
                              <option value="flat">Flat</option>
                              <option value="detached_house">Detached House</option>
                              <option value="terraced_house">Terraced House</option>
                              <option value="semi-detached_house">Semi Detached House</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.property_type && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.property_type}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <label>CONSTRUCTION DATE</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="construction_date"
                            >
                              <option hidden></option>
                              <option value="pre_1914">Pre 1914</option>
                              <option value="1914_2000">1914 2000</option>
                              <option value="2000_onwards">2000 Onwards</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.construction_date && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.construction_date}
                              </div>
                            )}
                          </div>
                          <div className="form-group flexgrowone datetypewidth ml-1">
                            <label>INTERNAL AREA (SQ FT)</label>
                            <input
                              type="text"
                              className="form-control bordrblack"
                              name="internal_area"
                              value={
                                userData.internal_area && userData.internal_area
                              }
                              onChange={handleUserInputs}
                              autoComplete="off"
                            />
                            {error.internal_area && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.internal_area}
                              </div>
                            )}
                          </div>
                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <label>NO. OF BEDROOMS</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="no_of_bedrooms"
                            >
                              <option hidden></option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5+</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.no_of_bedrooms && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.no_of_bedrooms}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <label>NO. OF BATHROOMS</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="no_of_bathrooms"
                            >
                              <option hidden></option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5+</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.no_of_bathrooms && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.no_of_bathrooms}
                              </div>
                            )}
                          </div>
                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <label>FINISH QUALITY</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="finish_quality"
                            >
                              <option hidden></option>
                              <option value="very_high">Very High</option>
                              <option value="high">High</option>
                              <option value="average">Average</option>
                              <option value="below_average">Below Average</option>
                              <option value="unmodernised">Unmodernised</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.finish_quality && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.finish_quality}
                              </div>
                            )}
                          </div>
                          <div className="form-group borderblack flexgrowone selectwidth ml-1">
                            <label>OUTDOOR SPACE</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="outdoor_space"
                            >
                              <option hidden></option>
                              <option value="none">None</option>
                              <option value="balcony_terrace">Balcony Terrace</option>
                              <option value="garden">Garden</option>
                              <option value="garden_very_large">Garden Very Large</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.outdoor_space && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.outdoor_space}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex addnewpropertyinputcontainer mt-3 strrtpark"  >
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <label>OFF STREET PARKING</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="off_street_parking"
                            >
                              <option hidden></option>
                              <option>0 Spaces</option>
                              <option>1 Spaces</option>
                              <option>2 Spaces</option>
                              <option>3+ Spaces</option>
                            </select>
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                            </div>
                            {error.off_street_parking && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.off_street_parking}
                              </div>
                            )}
                          </div>

                          <div className="form-group displaynoneinput flexgrowone datetypewidth">
                            <label>EXPIRY</label>
                            <input
                              type="date"
                              className="form-control borderblack"
                              onChange={handleUserInput}
                              name="Ownership_EXPIRY"
                            />
                          </div>
                          <div className="form-group displaynoneinput flexgrowone datetypewidth">
                            <label>EXPIRY</label>
                            <input
                              type="date"
                              className="form-control borderblack"
                              onChange={handleUserInput}
                              name="Ownership_EXPIRY"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="addnewpropertysubheading textcolourwhite addnewcommonproperty pb-4">
                  Insurance
                </div>
              </div>
              <div className="container pb-3">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="login_form">
                      <form action="">
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <label>TYPE</label>
                            <select
                              className="selectoptionclass"
                              style={{
                                paddingLeft: "65px",
                                paddingRight: "-45px",
                              }}
                              onChange={handleUserInput}
                              name="Inusurance_type"
                            >
                              <option hidden></option>
                              <option>Building</option>
                              <option>Landlord</option>
                              <option>Content</option>
                              <option>Other</option>
                            </select>
                            {/* <div className="inputdropdownclass">
                              <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              />
                            </div> */}
                            {error.Inusurance_type && (
                              <div
                                className="error-msgs ms-2 mt-3"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.Inusurance_type}
                              </div>
                            )}
                          </div>
                          {userData.Inusurance_type == "Other" && (
                            <div className="form-group borderblack flexgrowone selectwidth">
                              <label>OTHER TYPE</label>
                              <input
                                type="text"
                                className="form-control bordeblack"
                                onChange={handleUserInput}
                                name="Inusuranceowntype"
                                autoComplete="off"
                              />
                            </div>
                          )}
                          <div className="form-group bordrblack flexgrowone selectwidth ml-1">
                            <label>PROVIDER</label>
                            <select
                              className="selectoptionclass"
                              onChange={handleUserInput}
                              name="Inusurance_PROVIDER"
                            >
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
                            <div className="inputdropdownclass">
                              {/* <img
                                className="inputdropdownclass-main-image"
                                src={expand}
                              /> */}
                              {error.Inusurance_PROVIDER && (
                                <div
                                  className="error-msgs ms-2 mt-3"
                                  style={{ color: "#F0AD4E", float: "left" }}
                                >
                                  {error.Inusurance_PROVIDER}
                                </div>
                              )}
                            </div>
                          </div>
                          {userData.Inusurance_PROVIDER == "Other" && (
                            <div className="form-group borderblack flexgrowone selectwidth ml-1">
                              <label>OTHER PROVIDER</label>
                              <input
                                type="text"
                                className="form-control bordeblack"
                                onChange={handleUserInput}
                                name="InusuranceownPROVIDER"
                                autoComplete="off"
                              />
                            </div>
                          )}
                          <div className="form-group flexgrowone datetypewidth ml-1">
                            <label>EXPIRY</label>
                            <input
                              type="date"
                              className="form-control bordeblack"
                              onChange={handleUserInput}
                              name="Inusurance_expiry"
                              style={{ paddingRight: "10px", paddingTop: "22px" }}
                            />
                            {error.Inusurance_expiry && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.Inusurance_expiry}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <div className="d-flex">
                         
                          <div className="form-group displaynoneinput flexgrowone datetypewidth">
                            <label>EXPIRY</label>
                            <input
                              type="date"
                              className="form-control borderblack"
                              onChange={handleUserInput}
                              name="Ownership_EXPIRY"
                            />
                          </div>
                        </div> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="addnewpropertysubheading textcolourwhite addnewcommonproperty pb-4">
                  Lettings
                </div>
              </div>
              <div className="container pb-3">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="login_form">
                      <form action="">
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group flexgrowone datetypewidth">
                            <label>TENANCY EXPIRY / RENEWAL DATE</label>
                            <input
                              type="date"
                              className="form-control bordeblack"
                              onChange={handleUserInput}
                              name="tenancy_expiry"
                              style={{ paddingRight: "10px", paddingTop: "22px" }}
                            />
                            {error.tenancy_expiry && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.tenancy_expiry}
                              </div>
                            )}
                          </div>
                          <div className="form-group displaynoneinput flexgrowone datetypewidth">
                            <label>EXPIRY</label>
                            <input
                              type="date"
                              className="form-control borderblack"
                              onChange={handleUserInput}
                              name="Ownership_EXPIRY"
                            />
                          </div>
                          <div className="form-group displaynoneinput flexgrowone datetypewidth">
                            <label>EXPIRY</label>
                            <input
                              type="date"
                              className="form-control borderblack"
                              onChange={handleUserInput}
                              name="Ownership_EXPIRY"
                            />
                          </div>
                        </div>
                        <div className="d-flex addnewpropertyinputcontainer">
                          <div className="form-group borderblack flexgrowone selectwidth">
                            <label>CURRENT TENANT</label>
                            <input
                              type="text"
                              className="form-control bordeblack"
                              onChange={(e) => {
                                tenant[0] = e.target.value;
                              }}
                              name="current_tenent"
                              autoComplete="off"
                            />
                            {error.current_tenent && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E", float: "left" }}
                              >
                                {error.current_tenent}
                              </div>
                            )}
                          </div>

                          {index > 0 && (
                            <div className="form-group borderblack flexgrowone selectwidth">
                              <label>CURRENT TENANT</label>
                              <input
                                type="text"
                                className="form-control bordeblack"
                                onChange={(e) => {
                                  tenant[1] = e.target.value;
                                }}
                                name="current_tenent"
                                autoComplete="off"
                              />
                            </div>
                          )}
                          {index > 1 && (
                            <div className="form-group borderblack flexgrowone selectwidth">
                              <label>CURRENT TENANT</label>
                              <input
                                type="text"
                                className="form-control bordeblack"
                                onChange={(e) => {
                                  tenant[2] = e.target.value;
                                }}
                                name="current_tenent"
                                autoComplete="off"
                              />
                            </div>
                          )}
                          <div
                            className="form-group flexgrowone addtenantsclasscontainer ml-1"
                            onClick={() => {
                              index < 4 ? setIndex(index + 1) : null;
                            }}
                          >
                            <label className="addtenantslabel pr-2">
                              + ADDITIONAL TENANT
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row justifycontent">
                  <div className="col-sm-4">
                    <div className="login_form" style={{ textAlign: "center" }}>
                      <form action="javascript:void 0">
                        <button
                          className="btn login_submits continuebutton"
                          onClick={handleUpload}
                        >
                          Save
                        </button>
                        <Backdrop
                          sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                          }}
                          open={opens}
                          onClick={() => setOpens(false)}
                        >
                          <CircularProgress style={{ color: "#F9D75D" }} />
                        </Backdrop>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
      {showDropdown && (
         <Dialog
         fullScreen
         open={open}
         style={{ margin: "30px" }}
       >
         
           <div className="bglightcolour estimate_modal estmt_mdl">
             <div className="py-5 textcolourwhite">
               <div className="container">
                 <div className="crossclosetab">
                   <a onClick={handleClose}>
                     <img src={frame} />
                   </a>
                 </div>
                 <div className="AddNewPropertyheading textcolourwhite addnewcommonproperty estm_main_head">
                 You have entered an incorrect estimate value!
      <div className="container py-2">
        <div className="row">
          <div className="col-sm-4 minwidth">
            <div className="login_form">
              <form action="">
                <ul
                  className="listtage"
                  style={{
                    listStyleType: "none",
                    backgroundColor: "black",
                    maxHeight: "300px",
                    color: "white",
                    overflow: "scroll",
                  }}
                ></ul>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
      <label
            className="form-check-label estm_lable"
            htmlFor="showEstimateRadio"
          >
        Please  add your Estimate Value
          </label>
      </div>
      <div className="container pb-3">
        <div className="row">
          <div className="col-sm-12">
            <div className="login_form">
              <form action="">
                <div className="d-flex addnewpropertyinputcontainer">
               
                  <div className="form-group borderblack flexgrowone selectwidth"></div>
                </div>
                <div className="container">
                  <div className="row justifycontent">
                    <div className="col-sm-6">
                      <div
                        className="login_form"
                        style={{ textAlign: "center" }}
                      >
                        <form action="javascript:void 0">
                          {/*<div className="d-flex " style={{justifyContent:'space-evenly'}}>
                          <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="yesRadio"
            checked={userConfirmation === 'yes'}
            onChange={() => setUserConfirmation('yes')}
          />
          <label
            className="form-check-label"
            htmlFor="yesRadio"
          >
            Yes
          </label>
        </div>
        <div className="form-check"  
       
        >
          <input
            type="radio"
            className="form-check-input"
            id="noRadio"
            checked={userConfirmation === 'no'}
            onChange={() => {
              setUserConfirmation('no');
              setShowEstimate(false);
            }}
          />
          <label
            className="form-check-label"
            htmlFor="noRadio"
          >
            No
          </label>
        </div>
          </div>*/}
                  
                       
                            <>
                               <div className="form-group borderblack flexgrowone "  
                                style={{top: "14px"}}
                               >
                    <span className="PGuro text-white"></span>
                    
                    <label style={{left:"41px"}}>
                      <span style={{marginLeft: "-24px"}}>Property Value</span></label>
                    <input
                      type="text"
                      className="form-control borderblack"
                      style={{ paddingLeft: "42px" }}
                      onChange={handleEstimatevalue}
                      name="ground_rent"
                      autoComplete="off"
                    />

                    
                    {error.ground_rent && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E", float: "left" }}
                      >
                        {error.ground_rent}
                      </div>
                    )}
                  </div>

                  <button
                              className="btn login_submits continuebutton"
                              onClick={handleUpload}
                            >
                              Save
                            </button>
                            </>
                            
                          
                     
                          <Backdrop
                            sx={{
                              color: "#fff",
                              zIndex: (theme) =>
                                theme.zIndex.drawer + 1,
                            }}
                            open={opens}
                            onClick={() => setOpens(false)}
                          >
                            <CircularProgress
                              style={{ color: "#F9D75D" }}
                            />
                          </Backdrop>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
               </div>
             
           
             
           
             </div>
           </div>
         
       </Dialog>
      )}
      
    </React.Fragment>
  );
};
AddNewProperty.propTypes = {
  getPropertyList: PropTypes.any,
  PortfolioDatas: PropTypes.any,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default AddNewProperty;
