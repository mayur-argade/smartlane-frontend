import React, { createContext } from "react";
import Header from "../../../../component/header/Header";
import "../../../../assets/css/web.css";
import "../../../../assets/css/property_documents.css";
import "../../../../assets/css/propertyexpanded1-2-common.css";
import home from "../../../../assets/web-img/Portfolio.png";
// import homemain from "../../../../assets/web-img/home.png";
import Lettings from "../../../../assets/web-img/Lettings.png";
import Sourcing from "../../../../assets/web-img/Sourcing.png";
import Learning from "../../../../assets/web-img/Learning.png";
// import arrow from "../../../../assets/web-img/Location Icon-arrow.png";
import group from "../../../../assets/web-img/Group 183.png";
// import Vector from "../../../../assets/img/Vector.png";
// import right from "../../../../assets/img/Frame-right.png";
// import alert from "../../../../assets/img/Vector.alert.png";
// import file_upload from "../../../../assets/img/file_upload.svg";
// import { Link } from "react-router-dom";
import Property from "../dashboard/property";
import { Outlet, useLocation } from "react-router";
import { documentList } from "../../../../Devlopment/property";
import { Link } from "react-router-dom";
export const PropertyDoc = createContext(null);

const PropertyDocument = () => {
  const [propertyDocList, setPropertyDocList] = React.useState(null);
  const [active, setActive] = React.useState(true);
  const location = useLocation();
  const id = location?.state?.id;
  React.useEffect(() => {
    getDocumentList();
  }, []);

  const getDocumentList = async () => {
    const payload = { property_id: id };
    const response = await documentList(payload);
    response.success && setPropertyDocList(response.data);
  };

  return (
    <PropertyDoc.Provider value={{ propertyDocList, getDocumentList }}>
      <div>
        <Header />
        <div className="main_body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-1 pr-0">
                <div
                  className="nav flex-column nav-pills sideBar"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <div className="propdoc-portfolioimage">
                      <img src={home} />
                    </div>
                  </a>

                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <div className="propdoc-sidemenu">
                      <img src={Lettings} />
                    </div>
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <div className="propdoc-sidemenu">
                      <img src={Sourcing} />
                    </div>
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <div className="propdoc-sidemenu">
                      <img src={Learning} />
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-11 pl-0">
                <div
                  className="tab-content main_content_wr"
                  id="v-pills-tabContent"
                  style={{ marginBottom: "0", paddingRight: "0" }}
                >
                  <div
                    className="tab-pane fade show active "
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="row ">
                      <Property id={id} />
                      <div className="col-md-8 pl-0">
                        <div
                          className="tab_head "
                          style={{
                            borderLeft: "3px solid #000",
                            paddingBottom: "25px",
                          }}
                        >
                          <h5 className="color_white propdoc-rightside">
                            Documents
                          </h5>
                          <img src={group} />
                        </div>

                        {/* ****************************************** */}

                        <div
                          className="col-sm-12 prop_location_accordian tab_body"
                          style={{
                            borderLeft: "3px solid #000",
                            paddingBottom: "25px",
                            paddingTop: "0",
                          }}
                        >
                          <div className="letting_tab mt-4 ">
                            <ul
                              className="nav nav-tabs newtab "
                              role="tablist"
                              style={{
                                backgroundColor: "#1E1E1E",
                                width: "100%",
                                justifyContent: "center",
                              }}
                            >
                              <li
                                className="nav-item"
                                style={{
                                  width: "20%",
                                  backgroundColor: " #000",
                                  borderRadius: " 16px 0 0 16px ",
                                }}
                              >
                                <a
                                  className="nav-link active propertya"
                                  data-toggle="tab"
                                  href="#home"
                                  style={{
                                    backgroundColor: "black",
                                    border: "none",
                                    height: "48px",
                                    borderRadius: "16px",
                                  }}
                                  onClick={() => setActive(true)}
                                >
                                  <Link
                                    to="/property-document/property"
                                    state={{
                                      id: id,
                                    }}
                                    className={
                                      active == true
                                        ? "text-black"
                                        : "text-white"
                                    }
                                  >
                                    Property <span>4</span>
                                  </Link>
                                </a>
                              </li>
                              <li
                                className="nav-item"
                                style={{
                                  width: "20%",
                                  backgroundColor: " #000",
                                  borderRadius: "0 16px 16px 0",
                                }}
                              >
                                <a
                                  className="nav-link propertya"
                                  data-toggle="tab"
                                  href="#menu1"
                                  style={{
                                    backgroundColor: "black",
                                    border: "none",
                                    height: "48px",
                                    borderRadius: "16px",
                                  }}
                                  onClick={() => setActive(false)}
                                >
                                  <Link
                                    to="/property-document/lettings"
                                    state={{
                                      id: id,
                                    }}
                                    className={
                                      active == true
                                        ? "text-white"
                                        : "text-black"
                                    }
                                  >
                                    Lettings <span>4</span>
                                  </Link>
                                </a>
                              </li>
                            </ul>

                            <div className="tab-content">
                              {propertyDocList && <Outlet />}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PropertyDoc.Provider>
  );
};

export default PropertyDocument;
