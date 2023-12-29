import React from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { propertyEdit } from "../../Devlopment/property";
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";
import Switch from  'react-switch' ;


const AddandEditMortgage = ({ data, getDetails, Id, open, close }) => {
  const [userInput, setUserInput] = React.useState(data);
  const [opens, setOpens] = React.useState(false);
  const [intrest, setIntrest] = React.useState(userInput?.interest_rate);
  const [wantMortgage, setWantMortgage] = React.useState(true);


  let propertyId = Id?.property_id;
  // let newdate = moment(userInput?.expiry).format("YYYY-MM-DD");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeintrest = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setIntrest(numericValue);
  }

  console.log("userInput" ,userInput)

  const editRoi = async () => {
    setOpens(true);
    const payload = {
      property_id: propertyId,
      mortgage: {
        debt: userInput?.debt,
        type: userInput?.type == "Other" ? userInput?.othertype : userInput?.type,
        interest_rate: intrest,
        provider: userInput?.provider == "Other" ? userInput?.otherprovider : userInput?.provider,
        expiry: moment(userInput?.expiry).format("DD/MM/YYYY"),
      },
    };
    const response = await propertyEdit(payload);
    response?.success && getDetails();
    response?.success && close() && setOpens(false);
  };
  // const handleToggleChange = (event) => {
  //   const { checked } = event.target;
  


  
  //   if (!checked) {
  //     setUserInput({
  //       ...userInput,
  //       debt: 0,
  //       type: null,
  //       othertype: null,
  //       interest_rate: null,
  //       provider: null,
  //       otherprovider: null,
  //       expiry: null,
  //     });
  //     setIntrest(null); 
  //   }
  
  //   setWantMortgage(checked);
  // };



  const handleToggleChange = (checked) => {
    if (!checked) {
      setUserInput({
        debt: 0,
        type: "",
        othertype: null,
        interest_rate: null,
        provider: "",
        otherprovider: null,
        expiry: null,
      });
      setIntrest(null);
    }
  
    setWantMortgage(checked);
  };

  React.useEffect(() => {
    if (userInput.debt === 0) {
      setWantMortgage(false);
    } else {
      setWantMortgage(true);
    }
  }, [userInput.debt]);


console.log("wentmorterge" , wantMortgage)
  return (
    <React.Fragment>
      <Modal show={open} onHide={close}>
        <div>
          <div className="bg-black">
            <div
              className="container py-4"
              style={{
                backgroundColor: "#1e1e1e",
                width: "auto",
                borderRadius: "24px",
              }}
            >
              <div className="closetabcross" style={{ textAlign: "right" }}>
                <a>
                  <img src={frame} onClick={close} />
                </a>
              </div>
              <div
                className="pb-5"
                style={{ fontSize: "24px", color: "#fff", textAlign: "center" }}
              >
             Add or Edit Mortgage Details.
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="login_form">
                    <form action="javascript:void 0">
                    <div style={{textAlign:"left"}} className="form-check mb-3 form-switch form-check-reverse mortag_swtch">
                    <div style={{position:"absolute" }}>
   <Switch
    onChange={handleToggleChange}
    checked={wantMortgage}
    onColor="#f9d75d"
    offColor="#ffffff"
    className="form-check-input"
  />
   </div>
                 <label
                   className="form-check-label"
                   htmlFor="flexSwitchCheckReverse"
                    
                 >
                 <p style={{ left: "20px" , position: "relative", color:"white"}}>Do you have any mortgage ?</p>
                 </label>
               </div>
               {
                (wantMortgage ) && 
                <div className="form-group">
                        <div className="form-group">
                          <span className="PGuro text-white">£</span>
                          <label>DEBT</label>
                          <input
                            name="debt"
                            value={userInput?.debt}
                            defaultValue={userInput?.debt}
                            onChange={handleChange}
                            className="form-control"
                            style={{ paddingLeft: "76px" }}
                          />
                        </div>
                        <div className="form-group selects">
                          <label>TYPE </label>
                          <select
                            onChange={handleChange}
                            name="type"
                            defaultValue={userInput?.type}
                            value={userInput.type &&  userInput.type}
                            
                          >
                                <option defaultValue={userInput?.type}>{userInput?.type ? userInput?.type : "Other"}</option>
                            <option>Fixed</option>
                            <option>Discounted</option>
                            <option>Variable</option>
                            <option>Other</option>
                          </select>
                        </div>
                        {userInput?.type === "Other"  ? (
  <div className="form-group">
    <label>OTHER TYPE</label>
    <input
      name="othertype"
      defaultValue={userInput?.othertype}
      onChange={handleChange}
      className="form-control"
      style={{ paddingLeft: "65px" }}
    />
  </div>
) : null}
                        <div className="form-group">
                          <label>INTEREST RATE (%)</label>
                          <input
                            inputMode="numeric"
                            name="interest_rate"
                            value={intrest}
                            defaultValue={intrest}
                            onChange={handleChangeintrest}
                            className="form-control"
                            style={{ paddingLeft: "65px" }}
                          />
                        </div>
                        <div className="form-group">
                          <label>PROVIDER</label>
                          <select
                            onChange={handleChange}
                            name="provider"
                            defaultValue={userInput?.provider}
                          >
                            <option defaultValue={userInput?.provider?userInput?.provider:"Other"}>{userInput?.provider?userInput?.provider:"Other"}</option>
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
                              name="otherprovider"
                              defaultValue={
                                userInput?.provider == "Other"
                                  ? ""
                                  : userInput?.provider
                              }
                              onChange={handleChange}
                              className="form-control"
                              style={{ paddingLeft: "65px" }}
                            />
                          </div>
                        ) 
                        }
                        <div className="form-group" style={{ width: "100%", backgroundColor: "black", borderRadius: "16px" }}>
                          <span className="Drops pr-2">£</span>
                          <input
                            type="date"
                            name="expiry"
                            value={userInput?.expiry}
                            defaultValue={userInput?.expiry}
                            onChange={handleChange}
                            className="form-conrol"
                            style={{ paddingLeft: "65px", paddingTop: "24px", width: "220px", borderColor: "#000", position: "relative", left: "15px" }}
                          />
                          <label>EXPIRY</label>
                        </div>
                      </div>
               }
                      
                      <button
                        style={{ backgroundColor: "#f9d75d", color: "#000000" }}
                        className="btn login_submits"
                        onClick={editRoi}
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
      </Modal>
    </React.Fragment>
  );
};
AddandEditMortgage.propTypes = {
  data: PropTypes.any,
  Id: PropTypes.any,
  getDetails: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.any,
  webopen: PropTypes.any,
};

export default AddandEditMortgage;
