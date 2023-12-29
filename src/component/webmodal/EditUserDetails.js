import React from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import landlord from "../../assets/img/landlord.svg";
import user from "../../assets/img/user.svg";
import lock from "../../assets/img/lock.svg";
import mail from "../../assets/img/mail.svg";
import eyeLock from "../../assets/img/eye-off.svg";
import eyeon from "../../assets/img/eye-on.png";
import { Button, Modal } from "react-bootstrap";

const EdituserDetail = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showModal, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <React.StrictMode>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={showModal} onHide={handleClose}>
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
                  <img src={frame} onClick={handleClose} />
                </a>
              </div>
              <div
                className="pb-5"
                style={{ fontSize: "24px", color: "#fff", textAlign: "center" }}
              >
                Edit Priyanka’s details.
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="login_form">
                    <form action="/action_page.php">
                      <div className="form-group">
                        <label>USER TYPE:</label>
                        <img src={landlord} />
                        <select>
                          <option>Tenant</option>
                          <option>User</option>
                          <option>Tenant</option>
                          <option>User</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <img src={user} />
                        <label>FULL NAME</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <img src={mail} />
                        <label>EMAIL</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="form-group">
                        <img src={lock} />
                        <label>password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control"
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
                      </div>

                      <button
                        style={{ backgroundColor: "#f9d75d", color: "#000000" }}
                        className="btn login_submits"
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
      </Modal>
    </React.StrictMode>
  );
};

export default EdituserDetail;
