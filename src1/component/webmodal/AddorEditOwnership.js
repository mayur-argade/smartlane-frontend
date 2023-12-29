import React from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { AdminRoiEdit, propertyEdit } from "../../Devlopment/property";
import { allReplace } from "../../util/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";

const AddandEditOwnership = ({
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
  const [companyNumber, setCompanyNumber] = React.useState(userInput?.company_number);

  let propertyId = Id?.property_id;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangecompany = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue?.replace(/[^0-9.]/g, '');
    setCompanyNumber(numericValue);
  }
  const editRoi = async () => {
    setOpens(true);
    const payload = {
      id: userId,
      property_id: propertyId,
      ownership: {
        type: userInput?.type,
        company_number: companyNumber,
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
                Add or Edit OwnerShip Details.
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="login_form">
                    <form action="javascript:void 0">
                      {userInput &&
                        Object.keys(userInput).map((item) => (
                          <div className="form-group" key={item}>
                            {item == "type" ? (
                              <div className="form-group">
                                <label>{allReplace(item, { _: " " })}</label>
                                <select
                                  onChange={handleChange}
                                  name="type"
                                  defaultValue={userInput[item]}
                                >
                                  <option hidden></option>
                                  <option value="personal">Personal</option>
                                  <option value="ltd_company">Ltd Company</option>
                                </select>
                              </div>
                            ) : (
                              <>
                                <label>{allReplace(item, { _: " " })}</label>
                                <input
                                  inputMode="numeric"
                                  name={item}
                                  value={companyNumber}
                                  defaultValue={companyNumber}
                                  onChange={handleChangecompany}
                                  className="form-control"
                                  style={{ paddingLeft: "65px" }}
                                />
                              </>
                            )}
                          </div>
                        ))}
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
AddandEditOwnership.propTypes = {
  data: PropTypes.any,
  Id: PropTypes.any,
  getDetails: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.any,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default AddandEditOwnership;
