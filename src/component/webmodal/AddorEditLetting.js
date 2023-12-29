import React from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { AdminRoiEdit, propertyEdit } from "../../Devlopment/property"; 
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";

const AddandEditLetting = ({
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
  let propertyId = Id?.property_id;

  console.log("object",userInput)
  // let newdate = moment(userInput?.tenant_expiry).format("DD-MM-YYYY");
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
      id: userId,
      property_id: propertyId,
      letting: {
        current_tenent: [userInput?.current_tenent],
        tenant_expiry: moment(userInput?.tenant_expiry).format("DD/MM/YYYY"),
      },
    };
    const response =
      (admin && (await AdminRoiEdit(payload))) ||
      (!admin && payload.id && (await propertyEdit(payload)));
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
                width: "428px",
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
                Add or Edit Lettings Details.
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="login_form">
                    <form action="javascript:void 0">
                      <div className="form-group">
                        <div className="form-group">
                          <label>TENANT EXPIRY</label>
                          <input
                            type="date"
                            name="tenant_expiry"
                            value={userInput?.tenant_expiry}
                            defaultValue={userInput?.tenant_expiry}
                            onChange={handleChange}
                            className="form-control"
                            style={{ paddingLeft: "65px", paddingTop: "22px" }}
                          />
                        </div>
                        <div className="form-group">
                          <label>CURRENT TENENT</label>
                          <input
                            name="current_tenent"
                            value={userInput?.current_tenent}
                            defaultValue={userInput?.current_tenent}
                            onChange={handleChange}
                            className="form-control"
                            style={{ paddingLeft: "65px" }}
                          />
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
AddandEditLetting.propTypes = {
  data: PropTypes.any,
  Id: PropTypes.any,
  getDetails: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.any,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default AddandEditLetting;
