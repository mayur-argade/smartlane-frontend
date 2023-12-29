import React, { useState } from "react";
import "../../../../assets/css/style.css";
import "./welcomsignup.css";
import { Link } from "react-router-dom";
import { Signin } from "../../../../component/googleSignin/signin";
//import  from "../../../../images/smartlanelogo.svg"
//import squre from "../../../../images/wsqure.png"

const WelcomeSignUp = () => {
  const [animation, setAnimation] = useState(false)

  setTimeout(() => {
    setAnimation(true)
  }, 3000);
  return (
    <div className="welcome_main bg_black">
      <div className="main_leadgh_board">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="login_google text-center">
                <div
                  className={animation == true ? "topdiv" : "topdivs"}
                >
                  <h2 className="newname" data-aos="zoom-in"
                    data-aos-delay="800">P</h2>
                  <h2 className="newname" data-aos="zoom-in"
                    data-aos-delay="1000">r</h2>
                  <h2 className="newname" data-aos="zoom-in"
                    data-aos-delay="1200">o</h2>
                  <h2 className="newname" data-aos="zoom-in"
                    data-aos-delay="1400">p</h2>
                  <h2 className="newname" data-aos="zoom-in"
                    data-aos-delay="1600">e</h2>
                  <h2 className="newname" data-aos="zoom-in"
                    data-aos-delay="1800">l</h2>
                  <h2 className="newname" data-aos="zoom-in"
                    data-aos-delay="2000">l</h2>
                
            
                 
                </div>
                {animation == true &&
                  <div className="update_key p-5" style={{height:'150px' , marginBottom:'87px'}}>
                      <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
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
                }
                {animation == true &&
                  <div>
                    <Signin />
                    <Link to={"/register"}>
                      <a
                        href="#"
                        className="all_property mt-4 btn"
                        style={{ fontSize: "24px" }}
                      >
                        Sign up with Email
                      </a>
                    </Link>
                  </div>
                }
              </div>
              <div
                className="login_last_msg pt-3"
                style={{ marginBottom: "10px" }}
              >
                {animation == true &&
                  <p>
                    Already have an account?
                    <Link to={"/welcome-login"}>
                      <a href="#"> Login</a>
                    </Link>
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSignUp;
