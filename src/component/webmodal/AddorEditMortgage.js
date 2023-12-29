import React, { useEffect, useState } from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { AdminRoiEdit, propertyEdit } from "../../Devlopment/property";
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";
import Switch from  'react-switch' ;


const AddandEditMortgage = ({
  data,
  getDetails,
  Id,
  open,
  close,
  userId,
  admin,
}) => {
  const [userInput, setUserInput] = React.useState(data);
  const [opens, setOpens] = React.useState(false);
  const [intrest, setIntrest] = React.useState(userInput?.interest_rate);

  let propertyId = Id?.property_id;
  let newdate = moment(userInput?.expiry).format("YYYY-MM-DD");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  
  // ...
  

  
  
  const [OtherValue, setOtherValue] = useState();
 const [providelVal, setProviderval] = useState();
 console.log("providelVal" , providelVal , )
  const handleChangeintrest = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, "");
    setIntrest(numericValue);
  };

  const editRoi = async () => {
    console.log("start");
    setOpens(true);
    const payload = {
      id: userId,
      property_id: propertyId,
      mortgage: {
        debt: userInput?.debt,
        type: userInput?.type == "Other" ? OtherValue : userInput?.type,
        interest_rate: intrest,
        provider:
        userInput?.provider === "Other" ? providelVal : userInput?.provider,
        expiry: moment(userInput?.expiry).format("DD/MM/YYYY"),
      },
    };
    console.log("load", payload);
    const response =
      (admin && (await AdminRoiEdit(payload))) ||
      (!admin && payload.id && (await propertyEdit(payload)));
    response?.success && getDetails();
    response?.success && close() && setOpens(false);
    console.log("response", response);
  };
  const [wantMortgage, setWantMortgage] = useState(true);

  useEffect(() => {
    if (userInput.debt === 0) {
      setWantMortgage(false);
    } else {
      setWantMortgage(true);
    }
  }, [userInput.debt]);

  return (
    <>
      <React.Fragment>
        <Modal show={open} onHide={close}>
          <div>
            <div className="bg-black">
              <div
                className="container py-4 "
                id="tectclass"
                style={{
                  backgroundColor: "#1e1e1e",
                  width: "428px",
                  borderRadius: "24px",
                  paddingBottom: "65px !important",
                }}
              >
                <div className="closetabcross" style={{ textAlign: "right" }}>
                  <a>
                    <img src={frame} onClick={close} />
                  </a>
                </div>
                <div
                  className=""
                  style={{
                    fontSize: "24px",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  Add or Edit Mortgage Details.
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="login_form">
                      <div
                        style={{ textAlign: "left" }}
                        className="form-check mb-3 form-switch form-check-reverse mortag_swtch"
                      >
                      
   <div style={{position:"absolute" }}>
   <Switch
    onChange={handleToggleChange}
    checked={wantMortgage}
    onColor="#f9d75d"
    offColor="#ffffff"
    className="form-check-input"
  />
   </div>
                          <p
                            style={{
                              left: "80px",
                              position: "relative",
                              color: "white",
                              fontSize:"20px"
                            }}
                          >
                            Do you have any mortgages ?
                          </p>
                   
                      </div>
                      {}
                      {wantMortgage && (
                        <form action="javascript:void 0">
                          <div className="form-group">
                            <form action="javascript:void 0">
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
                          <label>TYPE</label>
                          <select
                            onChange={handleChange}
                            name="type"
                            defaultValue={userInput?.type}
                          >
                            <option defaultValue={userInput?.type}>{userInput?.type === 'Fixed' || userInput?.type === 'Discounted' || userInput?.type === 'Variable' ? userInput?.type : 'Other'}
</option>
                            <option>Fixed</option>
                            <option>Discounted</option>
                            <option>Variable</option>
                            <option>Other</option>
                          </select>
                        </div>
                        {userInput?.type == "Other" ? (
                          <div className="form-group">
                            <label>OTHER TYPE</label>
                            <input
                              name="othertype"
                              defaultValue={
                                userInput?.type == "Other"
                                  ? ""
                                  : userInput?.type
                              }
                              onChange={(e)=>setOtherValue(e.target.value)}
                              className="form-control"
                              style={{ paddingLeft: "65px" }}
                            />
                          </div>
                        ) : userInput?.type == "Fixed" ||
                          userInput?.type == "Discounted" ||
                          userInput?.type == "Variable"
                          ?
                          ("") :
                          (<div className="form-group">
                            <label>OTHER TYPE</label>
                            <input
                              name="othertype"
                              defaultValue={
                                userInput?.type == "Other"
                                  ? ""
                                  : userInput?.type
                              }
                              onChange={handleChange}
                              className="form-control"
                              style={{ paddingLeft: "65px" }}
                            />
                          </div>)
                        }
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
    value={userInput?.provider}
>
    <option defaultValue={userInput?.provider}>
        {['Lloyds', 'Nationwide', 'NatWest', 'HSBC', 'Barclays'].includes(userInput?.provider) ? userInput?.provider : 'Other'}
    </option>
    <option>Santander</option>
    <option>Lloyds</option>
    <option>Nationwide</option>
    <option>Santander</option>
    <option>NatWest</option>
    <option>Barclays</option>
    <option>HSBC</option>
    <option>Other</option>
</select>

                                </div>
                                
                                {userInput?.type === "Other" ?(
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
                                ) : userInput?.provider == "Lloyds" ||
                                  userInput?.provider == "Nationwide" ||
                                  userInput?.provider == "Santander" ||
                                  userInput?.provider == "NatWest" ||
                                  userInput?.provider == "HSBC" ||
                                  userInput?.provider == "Barclays" ? (
                                  ""
                                ) : (
                                  <div className="form-group">
                                    <label>OTHER PROVIDER</label>
                                    <input
                                      name="otherprovider"
                                      defaultValue={
                                        userInput?.provider == "Other"
                                          ? ""
                                          : userInput?.provider
                                      }
                                      onChange={(e) =>
                                        setProviderval(e.target.value)
                                      }
                                      className="form-control"
                                      style={{ paddingLeft: "65px" }}
                                    />
                                  </div>
                                )}
                                <div className="form-group">
                                  <label>EXPIRY</label>
                                  <input
                                    type="date"
                                    name="expiry"
                                    value={newdate?.toString()}
                                    defaultValue={newdate?.toString()}
                                    onChange={handleChange}
                                    className="form-control"
                                    style={{
                                      paddingLeft: "65px",
                                      paddingTop: "22px",
                                    }}
                                  />
                                </div>
                              </div>

                              <Backdrop
                                sx={{
                                  color: "#fff",
                                  zIndex: (theme) => theme.zIndex.drawer + 1,
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
                      )}

                      <button
                        style={{ backgroundColor: "#f9d75d", color: "#000000" }}
                        className="btn login_submits"
                        onClick={editRoi}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    </>
  );
};
AddandEditMortgage.propTypes = {
  data: PropTypes.any,
  Id: PropTypes.any,
  getDetails: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.any,
  webopen: PropTypes.any,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default AddandEditMortgage;
