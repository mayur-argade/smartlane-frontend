import React from "react";
import "../../assets/css/style.css";
import frame from "../../assets/img/Frame.svg";
// import Notifications from "../../assets/img/notification-white.svg";
import Notificationyellow from "../../assets/img/notificationyellow.svg";
import Notifications1 from "../../assets/web-img/notification.svg";
// import Notificationswhite from "../../assets/img/notification-white.svg";
import group from "../../assets/img/calender.svg";
// import doc_warning from "../../assets/img/doc_warning.png";

import PropTypes from "prop-types";
import {
  notificationClear,
  notificationClearDoc,
  notificationList,
  notificationSeen,
  notificationSeenDoc,
} from "../../Devlopment/notification/inidex";
import { Dialog } from "@mui/material";
import moment from "moment";
import { docNotificationList } from "../../Devlopment/property";
// import { docNotificationList } from "../../Devlopment/property";

const Notification = ({ newnotification, newnotificationdoc }) => {
  const [open, setOpen] = React.useState(false);
  const [notificationData, setNotificationData] = React.useState([]);
  const [expireNotification, setExpireNotification] = React.useState([]); 

  React.useEffect(() => {
    open && getNotificarionList();
    open && getdocNotificationList();
  }, [open]);

  const handleModal = () => {
    setOpen(!open);
  };

  const getNotificarionList = async () => {
    const response = await notificationList();
    response?.data?.notification &&
      setNotificationData(response?.data?.notification);
  };

  const notificarionClear = async () => {
    await notificationClear();
    notificarionCleardoc();
    getNotificarionList();
  };
  const notificarionSeen = async (id) => {
    await notificationSeen({ id: id });
    getNotificarionList();
  };
  const getdocNotificationList = async () => {
    const response = await docNotificationList();
    response?.data?.notifications &&
      setExpireNotification(response?.data?.notifications);
  };

  const notificarionCleardoc = async () => {
    await notificationClearDoc();
    getdocNotificationList();
  };

  const notificarionSeenDocs = async (id) => {
    await notificationSeenDoc({ id: id });
    getdocNotificationList();
  };
  const handleShow = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="img_wr" style={{ cursor: "pointer" }}>
        {newnotification?.length > 0 || newnotificationdoc?.length > 0 ? (
          <img
            src={Notificationyellow}
            style={{
              borderRadius: "50%",
              backgroundColor: "#000",
              padding: "5px",
            }}
            onClick={handleShow}
          />
        ) : (
          <img
            src={Notifications1}
            className="notificationwhite mb-notificarion pro_note"
            onClick={handleShow}
          />
        )}
      </div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <div
          className="py-0 bglightblackcolor"
          style={{
            height: "100vh",
          }}
        >
          {/* {notificationData.length <= 0 ? (
            <div
              className="py-5 bglightblackcolor"
              style={{
                height: "100vh",
              }}
              onClick={handleModal}
              data-dismiss="modal"
            >
              <div className="">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mob_head">
                        <div className="property_head">
                          <p className="textcolorwhite">Notifications</p>
                        </div>
                        <div className="mob_option">
                          <a href="#" className="mb-notificarion pro_note">
                            <img src={Notificationswhite} />
                          </a>
                          <a data-dismiss="modal" onClick={handleModal}>
                            <img src={frame} className="ms-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingTop: "50%",
                  }}
                >
                  <div className="text-center">
                    <p
                      className="text-white"
                      style={{ fontSize: "30px", fontWeight: "700" }}
                    >
                      You’re on top of things.
                    </p>
                    <p
                      className="text-white"
                      style={{ fontSize: "16px", fontWeight: "400" }}
                    >
                      Looks like everything is up to date!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : ( */}
          <div className="py-5 bglightblackcolor">
            <div className="">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mob_head">
                      <div className="property_head">
                        <p className="textcolorwhite mt-2">
                          {notificationData.length + expireNotification?.length}{" "}
                          Notifications
                        </p>
                      </div>

                      <div className="mob_option">
                        <a href="#" className="mb-notificarion pro_note">
                          <img
                            src={Notifications1}
                            style={{
                              padding: "5px",
                              borderRadius: "50%",
                              backgroundColor: "white",
                            }}
                          />
                        </a>
                        <a data-dismiss="modal" onClick={handleModal}>
                          <img src={frame} className="ms-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: "68vh", overflow: "scroll" }}>
                {notificationData &&
                  notificationData.map((item) => (
                    <div className="container mt-3" key={item.id}>
                      <div className="row bottomline">
                        <div className="col-lg-12">
                          <div className="textcolorwhite d-flex">
                            <span className="marginright margintop">
                              <a href="#">
                                <img
                                  src={group}
                                  width="40"
                                  style={{
                                    backgroundColor: "#F9D75D",
                                    padding: "5px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </a>
                            </span>
                            <span
                              onClick={() => {
                                notificarionSeen(item.id);
                              }}
                            >
                              <div className="fontsizetwentypx">
                                {item.title}
                              </div>
                              <div className="fontsizesixteenpx">
                                {item.message}
                              </div>
                              <div className="fontsizesixteenpx colorpurple">
                                {moment(item?.createdAt).fromNow()}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {expireNotification &&
                  expireNotification.map((item) => (
                    <div className="container mt-3" key={item.id}>
                      <div className="row bottomline">
                        <div className="col-lg-12">
                          <div className="textcolorwhite d-flex">
                            <span className="marginright margintop">
                              <a href="#">
                                <img
                                  src={group}
                                  width="40"
                                  style={{
                                    backgroundColor: "#F9D75D",
                                    padding: "5px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </a>
                            </span>
                            <span
                              onClick={() => {
                                notificarionSeenDocs(item.id);
                              }}
                            >
                              <div className="fontsizetwentypx">
                                {item.title}
                              </div>
                              <div className="fontsizesixteenpx">
                                {item.message}
                              </div>
                              <div className="fontsizesixteenpx colorpurple">
                                {moment(item?.createdAt).fromNow()}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="login_form">
                      <form action="javascript:void 0">
                        <button
                          className="btn login_submits clearallnotifibutton"
                          onClick={notificarionClear}
                        >
                          Clear All Notifications
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </Dialog>
    </React.Fragment>
  );
};
Notification.propTypes = {
  open: PropTypes.bool,
  newnotification: PropTypes.bool,
  newnotificationdoc: PropTypes.any,
};
export default Notification;
