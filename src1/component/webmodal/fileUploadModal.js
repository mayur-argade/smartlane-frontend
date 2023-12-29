import React, { useState } from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
const style = {
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
};

const UploadFileModal = ({ open, close, handleUpload, name }) => {
  const [error, setError] = useState([]);
  const [userData, setUserData] = useState({});
  const [opens, setOpens] = React.useState(false);
  const handleSubmit = async () => {
    await validation();
    setOpens(true);
    userData[name] && userData[name + "_expiry_date"] && handleUpload(userData);
    userData[name] &&
      userData[name + "_expiry_date"] &&
      close() &&
      setOpens(false);
  };

  
  const validation = () => {
    const e = [];

    if (!userData[name]) {
      e[name] = "file is required";
    }

    if (!userData[name + "_expiry_date"]) {
      e[name + "_expiry_date"] = "Expiry date is required";
    }
    setError(e);
  };
  return (
    <React.StrictMode>
      <Modal show={open} onHide={close}>
        <Box sx={style}>
          <div>
            <div>
              <div className="bg-black" style={{ borderRadius: "3px" }}>
                <div
                  className="container py-4 "
                  style={{
                    backgroundColor: "#1e1e1e",
                    width: "auto",
                    borderRadius: "20px",
                  }}
                >
                  <div className="closetabcross" style={{ textAlign: "right" }}>
                    <a>
                      <img src={frame} onClick={close} />
                    </a>
                  </div>
                  <div
                    className="pb-5"
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Upload Document
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="login_form">
                        <form action="javascript:void 0">
                          <div className="form-group">
                            {/* <img src={mail} /> */}
                            {/* <label>Select file</label> */}
                            <input
                              type="file"
                              name={name}
                              className="form-control"
                              //   value={userData?.file}
                              onChange={(event) => {
                                setUserData((prev) => ({
                                  ...prev,
                                  [name]: event?.target?.files[0],
                                }));
                              }}
                            />
                            {error[name] && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E" }}
                              >
                                {error[name]}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            {/* <img src={lock} /> */}
                            <label>Expiry date</label>
                            <input
                              type="date"
                              name="expiry"
                              className="form-control"
                              value={userData[name + "_expiry_date"]}
                              onChange={(event) => {
                                setUserData((prev) => ({
                                  ...prev,
                                  [name + "_expiry_date"]: event.target.value,
                                }));
                              }}
                              style={{ paddingTop:"22px"}}
                            />

                            {error[name + "_expiry_date"] && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E" }}
                              >
                                {error[name + "_expiry_date"]}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={handleSubmit}
                            style={{
                              backgroundColor: "#f9d75d",
                            }}
                            className={"btn login_submit"}
                          >
                            Upload
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
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
    </React.StrictMode>
  );
};
UploadFileModal.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.any,
  name: PropTypes.any,
  handleUpload: PropTypes.any,
};
export default UploadFileModal;
