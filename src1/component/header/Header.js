import React, { useEffect } from "react";
import "../../assets/css/web.css";
//import Logo from "../../assets/web-img/propell.svg"
import Search from "../../assets/web-img/search.png";
// import filter from "../../assets/web-img/head_filter.png";
import notification from "../../assets/web-img/yellobelll.svg";
import menu from "../../assets/web-img/menu.svg";
// import back from "../../assets/img/back.svg";
import back from "../../assets/img/Left arrow.png";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Notification from "../Modal/Notification";
import SideBar from "../sidebar/SideBar";
import WebNotification from "../webmodal/Notification";
import { notificationList } from "../../Devlopment/notification/inidex";
import {
  docNotificationList,
  documentsExpire,
} from "../../Devlopment/property";
// import Notifications from "../../assets/img/notification-white.svg";

const Header = ({ onchange, userpro, onchanges }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [notificarionOpen, setNotificationOpen] = React.useState(false);

  React.useEffect(() => {
    getDocexpire();
  }, []);
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleNotification = () => {
    setNotificationOpen(!notificarionOpen);
  };
  const getDocexpire = async () => {
    const response = await documentsExpire();
    console.log("first", response);
  };

  return (
    <div className="header">
      <nav className="navbar navbar-dark navbar-expand-sm mt-2">
        <div className="col-md-1">
        <a className="navbar-brand">
          <Link to={"/dashboard"}>
            <div style={{textAlign:"center"}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="56"
              viewBox="0 0 50 56"
              fill="none"
            >
              <path
                d="M8.5329 13.176C8.5329 13.176 3.41614 18.9687 6.33595 22.8227C11.5099 29.6519 37.6287 25.3898 43.2711 32.1784C46.7738 36.3925 40.8545 42.7897 40.8545 42.7897"
                stroke="#F9D75D"
                strokeWidth="8"
              />
              <path
                d="M29.5232 6.46776C29.5232 6.46776 21.9482 4.93289 20.0705 9.38849C16.7432 17.2838 33.4937 37.7723 30.4358 46.0532C28.5376 51.1936 20.0378 49.266 20.0378 49.266"
                stroke="#F9D75D"
                strokeWidth="8"
              />
              <path
                d="M3.84719 34.7082C3.84719 34.7082 6.30548 42.0358 11.103 41.4342C19.6042 40.368 28.9725 15.6174 37.6729 14.1252C43.0738 13.1989 45.6543 21.5238 45.6543 21.5238"
                stroke="#F9D75D"
                strokeWidth="8"
              />
            </svg>
            </div>
        
          </Link>
        </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-list-2"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="col-md-11" style={{paddingLeft:"0px"}}>
        <div className="collapse navbar-collapse" id="navbar-list-2">
          <ul className="navbar-nav custome_nav">
            <li className="nav-item active" >
              <div className="form-group has-search">
                <span>
                  <img src={Search} style={{ marginTop: "10px" }} />
                </span>
                <span className="PGsearchlable">
                  <label
                    className=""
                    style={{
                      marginLeft: "-22px",
                      fontSize: "14px",
                      top: "-9px",
                      color: "#B9B2DC",
                      position: "relative",
                    }}
                  >
                    SEARCH ALL PROPERTIES
                  </label>
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={userpro ? onchanges : onchange}
                  style={{ color: "#fff", height: "60px" }}
                />
              </div>
            </li>
            {/* <li className="nav-item">
              <a href="#" className="head_filter">
                <img src={filter} />
              </a>
            </li> */}
            <ul className="navbar-nav nav-right">
              <li className="nav-item mt-1">
                <a className="">
                  <WebNotification
                    isOpen={notificarionOpen}
                    onClose={handleNotification}
                  />
                  <img
                    src={notification}
                    onClick={handleNotification}
                    style={{ width: "45px", cursor: "pointer" }}
                  />
                </a>
              </li>
              <li
                className="nav-item"
                style={{ marginRight: "10px", marginTop: "8px" }}
              >
                <a style={{ paddingLeft: "30px", cursor: "pointer" }}>
                  <img src={menu} onClick={handleSidebar} />
                </a>
                <SideBar isOpen={isSidebarOpen} onClose={handleSidebar} />
              </li>
            </ul>
          </ul>
        </div>
        </div>
      </nav>
    </div>
  );
};
export const HeaderForMobile = ({
  states,
  path,
  title,
  logo,
  notification,
  imagedark,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [notificationData, setNotificationData] = React.useState([]);
  const [notificationdoc, setNotificationdoc] = React.useState([]);

  useEffect(() => {
    getNotificarionList();
    getdocNotificationList();
    getDocexpire();
  }, []);
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const getDocexpire = async () => {
    await documentsExpire();
  };

  const getNotificarionList = async () => {
    const response = await notificationList();
    response?.data?.notification &&
      setNotificationData(response?.data?.notification);
  };

  const getdocNotificationList = async () => {
    const response = await docNotificationList();
    response?.data?.notifications &&
      setNotificationdoc(response?.data?.notifications);
  };
  return (
    <React.Fragment>
      <div
        className="container"
        style={{
          position: "sticky",
          zIndex: "999",
          backgroundColor: "#B9B2DC",
          top: "0",
          height: "120px",
        }}
      >
        <div className="row" style={{ paddingTop: "40px" }}>
          <div className="col-lg-12">
            <div className="mob_head">
              <div className="property_head">
                {!imagedark && (
                  <a href="#">
                    <Link to={path} state={states}>
                      <img src={back} />
                    </Link>
                  </a>
                )}
                <Link to={path}>
                  <h4 className="ms-2">{title}</h4>
                </Link>
              </div>
              <div className="mob_option d-flex">
                {notification && (
                  <Notification
                    imagedark={imagedark}
                    newnotification={notificationData}
                    newnotificationdoc={notificationdoc}
                  />
                )}
                <a className="ms-3 mt-1">
                  <img src={logo} onClick={handleSidebar} />
                </a>
                <SideBar isOpen={isSidebarOpen} onClose={handleSidebar} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
HeaderForMobile.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.any,
  notification: PropTypes.bool,
  imagedark: PropTypes.bool,
  states: PropTypes.any,
  notificationnew: PropTypes.any,
};
Header.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.any,
  notification: PropTypes.bool,
  imagedark: PropTypes.bool,
  states: PropTypes.any,
  onchange: PropTypes.any,
  onchanges: PropTypes.any,
  userpro: PropTypes.any,
};

export default Header;
