import React from "react";
import frame from "../../assets/img/Frame.svg";
import notificationicon from "../../assets/img/notification-white.svg";
import calender from "../../assets/img/calender.svg";
import "./notificatin.css";
import PropTypes from "prop-types";
import {
  notificationClear,
  notificationClearDoc,
  notificationList,
  notificationSeen,
  notificationSeenDoc,
} from "../../Devlopment/notification/inidex";
import moment from "moment";
import { docNotificationList } from "../../Devlopment/property";

const Notification = ({ isOpen, onClose }) => {
  const [notificationData, setNotificationData] = React.useState([]);
  const [expireNotification, setExpireNotification] = React.useState([]);
 
  React.useEffect(() => {
    isOpen && getNotificarionList();
    isOpen && getdocNotificationList();
  }, [isOpen]);

  const getNotificarionList = async () => {
    const response = await notificationList();
    response?.data?.notification &&
      setNotificationData(response?.data?.notification);
  };
  const getdocNotificationList = async () => {
    const response = await docNotificationList();
    response?.data?.notifications &&
      setExpireNotification(response?.data?.notifications);
  };

  const notificarionClear = async () => {
    await notificationClear();
    notificarionCleardoc();
    getNotificarionList();
  };
  const notificarionCleardoc = async () => {
    await notificationClearDoc();
    getdocNotificationList();
  };
  const notificarionSeen = async (id) => {
    await notificationSeen({ id: id });
    getNotificarionList();
  };
  const notificarionSeenDocs = async (id) => {
    await notificationSeenDoc({ id: id });
    getdocNotificationList();
  };

  const notificationContent = (
    <div className="right-notification">
      <div
        className="py-5 bglightblackcolor"
        style={{
          width: "428px",
          height: "100vh",
          borderRadius: "16px 0 0 16px",
          overflow: "scroll",
        }}
      >
        <div className="">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="mob_head">
                  <div className="property_head">
                    <p className="textcolorwhite">
                      {notificationData?.length + expireNotification?.length}{" "}
                      Notifications
                    </p>
                  </div>
                  <div className="mob_option">
                    <a className="mb-notificarion pro_note">
                      <img
                        src={notificationicon}
                        style={{
                          backgroundColor: "#000",
                          borderRadius: "50%",
                          padding: "5px",
                        }}
                      />
                    </a>
                    <a className="ms-3">
                      <img src={frame} onClick={onClose} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {notificationData &&
              notificationData.map((item) => (
                <div className="container mt-3" key={item}>
                  <div className="row bottomline">
                    <div className="col-lg-12">
                      <div className="textcolorwhite d-flex">
                        <span className="marginright margintop">
                          <a href="#">
                            <img
                              src={calender}
                              width="40"
                              style={{
                                backgroundColor: "#F9D75D",
                                borderRadius: "50%",
                                padding: "5px",
                              }}
                            />
                          </a>
                        </span>
                        <span
                          onClick={() => {
                            notificarionSeen(item.id);
                          }}
                        >
                          <div className="fontsizetwentypx">{item.title}</div>
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
                <div className="container mt-3" key={item}>
                  <div className="row bottomline">
                    <div className="col-lg-12">
                      <div className="textcolorwhite d-flex">
                        <span className="marginright margintop">
                          <a href="#">
                            <img
                              src={calender}
                              width="40"
                              style={{
                                backgroundColor: "#F9D75D",
                                borderRadius: "50%",
                                padding: "5px",
                              }}
                            />
                          </a>
                        </span>
                        <span
                          onClick={() => {
                            notificarionSeenDocs(item.id);
                          }}
                        >
                          <div className="fontsizetwentypx">{item.title}</div>
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
          <div className="container" style={{ marginTop: "115px" }}>
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
    </div>
  );
  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      {notificationContent}
    </>
  );
};
Notification.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Notification;
