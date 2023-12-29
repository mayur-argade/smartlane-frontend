import React from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { propertyEdit } from "../../Devlopment/property";
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";

const AddandEditInsurance = ({ data, getDetails, Id, open, close }) => {
  const [userInput, setUserInput] = React.useState(data);
  const [opens, setOpens] = React.useState(false);
  // let newdate = moment(userInput?.expiry).format("DD/MM/YYYY");
  let propertyId = Id?.property_id;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editRoi = async () => {
    setOpens(true);
    const payload = {
      property_id: propertyId,
      insurance: {
        type: userInput?.type == "Other" ? userInput?.othertype : userInput?.type,
        provider: userInput?.provider == "Other" ? userInput?.otherprovider : userInput?.provider,
        expiry: moment(userInput?.expiry).format("DD/MM/YYYY"),
      },
    };
    const response = await propertyEdit(payload);
    response?.success && getDetails();
    response?.success && close() && setOpens(false);
  };

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
                Add or Edit Insurance Details.
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="login_form">
                    <form action="javascript:void 0">
                      <div className="form-group">
                        <div className="form-group">
                          <label>TYPE</label>
                          <select
                            onChange={handleChange}
                            name="type"
                            defaultValue={userInput?.type}
                          >
                            <option hidden></option>
                            <option>Building</option>
                            <option>Landlord</option>
                            <option>Content</option>
                            <option>Other</option>
                          </select>
                        </div>
                        {userInput?.type == "Other" ? (
                          <div className="form-group">
                            <label>OTHER TYPE</label>
                            <input
                              name="othertype"
                              defaultValue={
                                userInput?.type == "Other" ? "" : userInput?.type
                              }
                              onChange={handleChange}
                              className="form-control"
                              style={{ paddingLeft: "65px" }}
                            />
                          </div>
                        ) : userInput?.type == "Building" ||
                          userInput?.type == "Landlord" ||
                          userInput?.type == "Content" ? "" : (
                          <div className="form-group">
                            <label>OTHER TYPE</label>
                            <input
                              name="othertype"
                              defaultValue={
                                userInput?.type == "Other" ? "" : userInput?.type
                              }
                              onChange={handleChange}
                              className="form-control"
                              style={{ paddingLeft: "65px" }}
                            />
                          </div>
                        )}
                        <div className="form-group">
                          <label>PROVIDER</label>
                          <select
                            onChange={handleChange}
                            name="provider"
                            defaultValue={userInput?.provider}
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
                        </div>
                        {userInput?.provider == "Other" ? (
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
                        ) : userInput?.provider == "Admiral" ||
                          userInput?.provider == "Ageco" ||
                          userInput?.provider == "Aviva" ||
                          userInput?.provider == "Axa" ||
                          userInput?.provider == "Churchill" ||
                          userInput?.provider == "DirectLine" ||
                          userInput?.provider == "Saga" ||
                          userInput?.provider == "TescoBank" ||
                          userInput?.provider == "Halifax" ? "" : (
                          <div className="form-group">
                            <label>OTHER ROVIDER</label>
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
                        )} 
                         <div className="form-group" style={{ width: "100%", backgroundColor: "black", borderRadius: "16px" }}>
                          <span className="Drops pr-2">£</span>
                          <input
                            type="date"
                            name="expiry"
                            value={userInput?.expiry}
                            defaultValue={userInput?.expiry}
                            onChange={handleChange}
                            className="form-conrol"
                            style={{ paddingLeft: "65px", paddingTop: "24px",width:"220px",borderColor:"#000",position:"relative",left:"17px"}}
                          />
                          <label style={{}}>EXPIRY</label>
                        </div>
                      </div>
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
AddandEditInsurance.propTypes = {
  data: PropTypes.any,
  Id: PropTypes.any,
  getDetails: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.any,
};

export default AddandEditInsurance;
