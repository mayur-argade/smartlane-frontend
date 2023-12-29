import React from "react";
import "../../../../assets/css/style.css";
// import "../../../../assets/css/web.css";
import down from "../../../../images/down.png";
import { HeaderForMobile } from "../../../../component/header/Header";

const Property = () => {
  return (
    <div className="welcome_main">
      <HeaderForMobile
        path="/property-expanded"
        logo={mbtogel}
        title="Portfolio overview"
        notification={true}
      />
      <div className="lead_slide"></div>
      <div className="main_lead_board bgColor_forProp">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="property_top">
                <p>Flat 4, 41 Colville Terrace, Londo...</p>
                <a href="#">
                  <img src="assets/img/property_arrow.svg" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="lead_bar mb-3 text-center">
          <img src="assets/img/property.png" className="w-100" />
        </div>
        <div className="container py-3">
          <div className="row px-3 pb-3">
            <div className="col-8">
              <div className="property_value">
                <p>Property Value</p>
                <h2>£695,500</h2>
                <div className="property_main_option">
                  <div className="property_option">
                    <span className="balck_option"></span>
                    <p>Debt</p>
                  </div>
                  <div className="property_option">
                    <span className="yellow_option"></span>
                    <p>Debt</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="img-wr">
                <img
                  className="img img-fluid"
                  src="./assets/img/Progress-circle.png"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <a href="#" className="all_property btn">
              View All Properties
            </a>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="property_accordian">
              <div className="accordion" id="accordionExample">
                <div className=" ">
                  <div className="prpt_location d-csflex">
                    <div
                      className="accordion-body"
                      style={{
                        paddingBottom: "0px",
                        marginBottom: "0px",
                      }}
                    >
                      <p>ROI - 6.2%</p>
                    </div>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="" style={{ paddingLeft: "19px" }}>
                      <div className="property_listing">
                        <div id="">
                          <div className="property_valueDate">
                            <p className="d-flex">
                              <span>Net Equity</span> &nbsp; £173,875{" "}
                              <span className="text-white ml-auto">25%</span>
                            </p>
                            <p>
                              <span>Gross Monthly Income</span> &nbsp; £2,950
                            </p>
                            <p>
                              <span>Mortgage</span> &nbsp; £1,800
                            </p>
                            <p>
                              <span>Management Fee</span> &nbsp; £148
                            </p>
                            <p>
                              <span>Ground Rent</span> &nbsp; £50
                            </p>
                            <p>
                              <span>Service Charge</span> &nbsp; £50
                            </p>
                            <p>
                              <span>Gross Monthly Income</span> &nbsp; £902
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="propery_tgl">
                    <button
                      className="toggle property_drop"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <img src={down} />{" "}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
                <div className=" ">
                  <div className="prpt_location d-csflex">
                    <div
                      className="accordion-body"
                      style={{
                        paddingBottom: "0px",
                        marginBottom: "0px",
                      }}
                    >
                      <p>Mortage</p>
                    </div>
                  </div>
                  <div
                    id="collapsetwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingtwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="" style={{ paddingLeft: "19px" }}>
                      <div className="property_listing">
                        <div id="">
                          <div className="property_valueDate">
                            <p className="d-flex">
                              <span>Debt</span> &nbsp; £521,625{" "}
                              <span className="text-white ml-auto">75%</span>
                            </p>
                            <p>
                              <span>Type</span> &nbsp; Interest Only
                            </p>
                            <p>
                              <span>Interest Rate</span> &nbsp; 5%
                            </p>
                            <p>
                              <span>Provider</span> &nbsp; Barclays
                            </p>
                            <p>
                              <span>Expiry</span> &nbsp; 20/08/2025
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="propery_tgl">
                    <button
                      className="toggle property_drop"
                      data-bs-toggle="collapse"
                      aria-controls="collapseOne"
                      data-bs-target="#collapsetwo"
                      aria-expanded="true"
                    >
                      <img src={down} />{" "}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
                <div className=" ">
                  <div className="prpt_location d-csflex">
                    <div
                      className="accordion-body"
                      style={{
                        paddingBottom: "0px",
                        marginBottom: "0px",
                      }}
                    >
                      <p>Ownership Details</p>
                    </div>
                  </div>
                  <div
                    id="collapsethree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingthree"
                    data-bs-parent="#accordionExample"
                  >
                    <div style={{ paddingLeft: "19px" }}>
                      <div id="">
                        <div className="property_valueDate">
                          <p className="d-flex">
                            <span>Debt</span> &nbsp; £521,625{" "}
                            <span className="text-white ml-auto">75%</span>
                          </p>
                          <p>
                            <span>Type</span> &nbsp; Interest Only
                          </p>
                          <p>
                            <span>Interest Rate</span> &nbsp; 5%
                          </p>
                          <p>
                            <span>Provider</span> &nbsp; Barclays
                          </p>
                          <p>
                            <span>Expiry</span> &nbsp; 20/08/2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="propery_tgl">
                    <button
                      className="toggle property_drop"
                      data-bs-toggle="collapse"
                      aria-controls="collapsethree"
                      data-bs-target="#collapsethree"
                      aria-expanded="true"
                    >
                      <img src={down} />{" "}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
                <div className=" ">
                  <div className="prpt_location d-csflex">
                    <div
                      className="accordion-body"
                      style={{
                        paddingBottom: "0px",
                        marginBottom: "0px",
                      }}
                    >
                      <p>Insurance Details</p>
                    </div>
                  </div>
                  <div
                    id="collapsefour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingfour"
                    data-bs-parent="#accordionExample"
                  >
                    <div style={{ paddingLeft: "19px" }}>
                      <div id="">
                        <div className="property_valueDate">
                          <p className="d-flex">
                            <span>Debt</span> &nbsp; £521,625{" "}
                            <span className="text-white ml-auto">75%</span>
                          </p>
                          <p>
                            <span>Type</span> &nbsp; Interest Only
                          </p>
                          <p>
                            <span>Interest Rate</span> &nbsp; 5%
                          </p>
                          <p>
                            <span>Provider</span> &nbsp; Barclays
                          </p>
                          <p>
                            <span>Expiry</span> &nbsp; 20/08/2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="propery_tgl">
                    <button
                      className="toggle property_drop"
                      data-bs-toggle="collapse"
                      aria-controls="collapsefour"
                      data-bs-target="#collapsefour"
                      aria-expanded="true"
                    >
                      <img src={down} />{" "}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
                <div className=" ">
                  <div className="prpt_location d-csflex">
                    <div
                      className="accordion-body"
                      style={{
                        paddingBottom: "0px",
                        marginBottom: "0px",
                      }}
                    >
                      <p>Lettings Details</p>
                    </div>
                  </div>
                  <div
                    id="collapsefive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingfive"
                    data-bs-parent="#accordionExample"
                  >
                    <div style={{ paddingLeft: "19px" }}>
                      <div id="">
                        <div className="property_valueDate">
                          <p className="d-flex">
                            <span>Debt</span> &nbsp; £521,625{" "}
                            <span className="text-white ml-auto">75%</span>
                          </p>
                          <p>
                            <span>Type</span> &nbsp; Interest Only
                          </p>
                          <p>
                            <span>Interest Rate</span> &nbsp; 5%
                          </p>
                          <p>
                            <span>Provider</span> &nbsp; Barclays
                          </p>
                          <p>
                            <span>Expiry</span> &nbsp; 20/08/2025
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="propery_tgl">
                    <button
                      className="toggle property_drop"
                      data-bs-toggle="collapse"
                      aria-controls="collapsefive"
                      data-bs-target="#collapsefive"
                      aria-expanded="true"
                    >
                      <img src={down} />{" "}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
