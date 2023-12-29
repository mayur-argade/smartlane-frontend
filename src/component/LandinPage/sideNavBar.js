import React from "react";
import classes from "./sideNavBat.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SideNavBar = ({ closeCallback }) => {
  return (
    <div className={classes.sideNavBar}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "15px",
          margin: "5px",
        }}
        onClick={() => {
          closeCallback(); // Call the closeCallback passed from the parent
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul
        className="sidebarresponseul"
        style={{ width: "100%", listStyle: "none" }}
      >
        <li className={classes.listItem}>Pitch Deck</li>
        <li className={classes.listItem}>SEIS</li>
        <Link to="welcome-signup"><li className={classes.listItem}>Sign-up</li></Link>
        <Link to="/welcome-login"><li className={classes.listItem}>Login</li></Link>
      </ul>
    </div>
  );
};

SideNavBar.propTypes = {
  closeCallback: PropTypes.func.isRequired,
};

export default SideNavBar;
