//import Badge from "@mui/material/Badge";
import "./Landingpage.css";
import { useState } from "react";
//import Popover from "@mui/material/Popover";
import React from "react";
//import PopOverText from "../LandinPage/popOverText";
import ChatBox from "../LandinPage/chat-box";
import SideNavBar from "../LandinPage/sideNavBar";
import LandingPage from "./LandingPage";
// import  images1 from '../../assets/img/image 1.svg'
import images1 from "../../assets/img/BackgroundHome.png";
import { Link } from "react-router-dom";
import propell from '../../../src/assets/web-img/propell.svg'
let chat = [];

export default function MainLanding() {
  //const [openPopOver, setOpenPopOver] = useState(1);
  const [open, setOpen] = useState(false);
  //const [anchorEl, setAnchorEl] = useState(null);

  const [openSideNavBar, setOpenSideNavBar] = useState(false);

  return (
    <>
      {/* <link
          href="https://db.onlinewebfonts.com/c/0c3856a335fdfdb8b0652f7c3d367fdd?family=Moderat-Regular"
          rel="stylesheet"
        /> */}

      <div
        style={{
          position: "relative",
          height: "100%",
          maxHeight: "100%",
          backgroundColor: "#121213",
        }}
      >
        <div className="main">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "13px",
            }}
          >
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
            <div
              style={{
                marginLeft: "5px",
                color: "#FFF",
                fontFamily: "Clash Display",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
                paddingLeft: "5px",
              }}
            >
            <img src={propell} />
            </div>
          </div>
          <div style={{ flex: 2 }}></div>
          <div
            style={{
              width: "540px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="nav-bar-container">
              <div style={{ display: "flex" }}>
                <p style={{ color: "white", marginBottom: "0px" ,  fontSize:'16px' }}>
                  Investing with SEIS
                </p>
              </div>
              {/* </div> */}

              <div style={{ display: "flex" }}>
                <p style={{ color: "white", marginBottom: "0px" ,  fontSize:'16px' }}>
                  Pitch Deck
                </p>
              </div>
<Link to="welcome-signup">
<div style={{ display: "flex" }}>
                <p style={{ color: "white", marginBottom: "0px" , fontSize:'16px' }}>
                  Dashboard
                </p>
              </div>
</Link>
             

            </div>
            <div
              className="hamburger"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "end",
                marginRight: "24px",
              }}
              onClick={() => {
                setOpenSideNavBar(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M5 12H27M5 21H27"
                  stroke="#F9D75D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }} className="homemobile">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              zIndex: 1,
            }}
          >
            <img
              src={images1}
              style={{ height: "700px", width: "100%",marginTop:"-70px" }}
              alt="Image 1"
            />
            {/* <img
                src={images2}
                style={{ flex: "1 1", maxWidth: "50%" }}
                alt="Image 2"
              /> */}
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              width: "100%", // Set width of the parent div
              maxWidth: "100%", // Add maxWidth if necessary
              overflow: "hidden", // Hide any overflowing content
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // height="116.291"
              viewBox="0 0 1438 117"
              fill="none"
              width="100%"
            >
              <path
                d="M202 116C68.9923 116.14 -2 50 -2 50V14L10 0H1438V34C1438 34 1332.97 76.9101 1262 80C1191.57 83.0661 1154.42 53.2147 1084 50C987.32 45.5866 1026.62 121.556 930 116C864.231 112.218 639.555 40.5103 574 34C443.971 21.0866 332.669 115.862 202 116Z"
                fill="#121213"
              />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {/* SVG 2 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="116.291"
              width="100%"
              viewBox="0 0 1438 232"
              fill="none"
            >
              {/* Your SVG content */}
              <path
                d="M1448 264H0C0 264 17.0756 156.999 68 152C110.29 147.849 116.093 201.4 156 216C231.522 243.631 277.966 183.849 358 176C438.064 168.148 494.717 223.011 560 176C604.893 143.672 557.379 65.27 600 30C669.575 -27.5749 776.939 15.0418 866 30C910.342 37.4474 931.571 57.0939 976 64C1040.94 74.0949 1083.23 28.959 1144 54C1195.07 75.0463 1192.81 137.099 1246 152C1336.11 177.243 1348.52 -27.216 1436 5.99999C1530.3 41.803 1448 264 1448 264Z"
                fill="#121213"
              />
            </svg>
          </div>
          <div
            style={{
              zIndex: 3,
              position: "absolute",
              top: "0",
              left: 0,
              width: "100%",
              // height: "100%",
            }}
          >
            <LandingPage />
          </div>
        </div>

        {open && (
          <ChatBox
            chat={chat}
            close={() => {
              setOpen(false);
            }}
          />
        )}
        {openSideNavBar && (
          <SideNavBar
            closeCallback={() => {
              setOpenSideNavBar(false);
            }}
          />
        )}
      </div>
    </>
  );
}
