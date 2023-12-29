import React, { useState } from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import landlord from "../../assets/img/landlord.svg";
import user from "../../assets/img/user.svg";
import mail from "../../assets/img/mail.svg";
import lock from "../../assets/img/lock.svg";
import eyeLock from "../../assets/img/eye-off.svg";
import eyeon from "../../assets/img/eye-on.png";
import { Modal } from "react-bootstrap";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { AddNewuser } from "../../Devlopment/auth/index";
const style = {
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
};

const AddnewUser = ({ open, close, getdetails }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userType, setUserType] = useState("landlord");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async () => {
    if (!validation()) {
      const payload = {
        full_name: fullName,
        email: email,
        password: password,
        user_type: userType,
      };
      const response = await AddNewuser(payload);
      response.success && getdetails();
      response?.success && close();
    }
  };

  const validation = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let a = false;
    const e = [];
    if (!userType) {
      a = true;
      e["userType"] = "Please select useType";
    }
    if (!fullName) {
      a = true;
      e["fullName"] = "FullName is required";
    }
    if (!email) {
      a = true;
      e["email"] = "Email is required";
    } else if (emailRegex.test(email) === false) {
      a = true;
      e["email"] = "Please enter a valid email";
    }
    if (!password) {
      a = true;
      e["password"] = "Password is required";
    }
    setError(e);
    return a;
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
                    width: "428px",
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
                    Add A New User.
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="login_form">
                        <form action="javascript:void 0">
                          <div className="form-group">
                            <label>USER TYPE:</label>
                            <img src={landlord} />
                            <select
                              className=""
                              value={userType}
                              onChange={(e) => setUserType(e.target.value)}
                            >
                              <option value="landlord">Landlord</option>
                            </select>
                            {error.userType && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E" }}
                              >
                                {error.userType}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <img src={user} />
                            <label>FULL NAME</label>
                            <input
                              type="text"
                              className="form-control"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                            {error.fullName && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E" }}
                              >
                                {error.fullName}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <img src={mail} />
                            <label>EMAIL</label>
                            <input
                              type="text"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {error.email && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E" }}
                              >
                                {error.email}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <img src={lock} />
                            <label>password</label>
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {showPassword ? (
                              <img
                                className="showHode_pass"
                                src={eyeon}
                                onClick={togglePasswordVisibility}
                              />
                            ) : (
                              <img
                                className="showHode_pass"
                                src={eyeLock}
                                onClick={togglePasswordVisibility}
                              />
                            )}
                            {error.password && (
                              <div
                                className="error-msgs ms-2"
                                style={{ color: "#F0AD4E" }}
                              >
                                {error.password}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={handleSubmit}
                            style={{
                              backgroundColor: "#f9d75d",
                            }}
                            className={
                              !userType || !fullName || !email || !password
                                ? "btn login_submit"
                                : "btn login_submits"
                            }
                          >
                            Save
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
    </React.StrictMode>
  );
};
AddnewUser.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.any,
  getdetails: PropTypes.any,
};
export default AddnewUser;
