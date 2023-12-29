import React from "react";
import lettingbag from "../../../../assets/web-img/lettingbag.svg";
import home from "../../../../assets/web-img/home.png";
import homeset from "../../../../assets/web-img/homset.svg";
import PropTypes from "prop-types";
import {
  propertDetail,
  propertDetailforAdmin,
} from "../../../../Devlopment/property";
import chevron from "../../../../images/down.png";
import chevronUp from "../../../../images/up.png";
import { formatNumber } from "../../../../util/commonFunction";
import AddandEditRoi from "../../../../component/webmodal/AddorEditRoi";
import AddandEditLetting from "../../../../component/webmodal/AddorEditLetting";

const LettingDetails = ({ id, admin, userId }) => {
  const [propertyData, setPropertyData] = React.useState();
  const [expand, setExpand] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isLettingOpen, setIsLettingOpen] = React.useState(false);

  React.useEffect(() => {
    getPropertyDetails();
  }, [id, userId]);

  const getPropertyDetails = async () => {
    const payload = {
      id: id,
      userId: userId,
    };
    const response = admin
      ? await propertDetailforAdmin(payload)
      : await propertDetail(payload);
    response.success && setPropertyData(response?.data);
  };
  const handdleAccordion = (data) => {
    setExpand(expand === data ? "" : data);
  };
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleletting = () => {
    setIsLettingOpen(!isLettingOpen);
  };
  return (
    <React.Fragment>
      <div className="col-md-4 pr-0 pl-0">
        {isSidebarOpen && (
          <AddandEditRoi
            open={isSidebarOpen}
            close={handleSidebar}
            admin={admin}
            userId={userId}
            Id={
              propertyData && {
                property_id: propertyData.property_id,
              }
            }
            data={
              propertyData && {
                net_equity:
                  propertyData?.property_estimate - propertyData?.debt,
                monthly_net_income: propertyData?.monthly_net_income,
                gross_monthly_income: propertyData.gross_monthly_income,
                mortgage_payment: propertyData.mortgage_payment,
                management_fee: propertyData.management_fee,
                ground_rent: propertyData.ground_rent,
                service_charge: propertyData.service_charge,
              }
            }
            getDetails={getPropertyDetails}
          />
        )}
        {isLettingOpen && (
          <AddandEditLetting
            open={isLettingOpen}
            close={handleletting}
            admin={admin}
            userId={userId}
            Id={
              propertyData && {
                property_id: propertyData.property_id,
              }
            }
            data={
              propertyData && {
                current_tenent: propertyData?.current_tenent,
                tenant_expiry: propertyData?.tenant_expiry,
              }
            }
            getDetails={getPropertyDetails}
          />
        )}
        <div className="tab_head header_center">
          <img src={lettingbag} width="25" />
          <h5 className="bwhiteg ms-4">Lettings</h5>
        </div>

        <div className="tab_body tab_body_center_div fithfi">
          <div className="txtcent">
            <div className="home_img_wr">
              <div style={{ position: "relative" }}>
                <img
                  style={{ width: "100%" }}
                  src={home}
                  className="img-fluid widthhundererd"
                  alt="home"
                /> 
              </div>
            </div>
          </div> 
          <div>
            <span></span>
            <span></span>
          </div>
          <div className="container bgcolor1e1e1e">
            <div className="row">
              <div className="property_accordian pt-3">
                <div className="prpt_location d-csflex">
                  <p>Lettings Details</p>
                </div>
                <div className="accordion" id="accordionExample">
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="">
                      <div className="property_listing">
                        <div id="">
                          <div className="property_valueDate">
                            <p className="d-flex">
                              <span>Current Tenant(s)</span>&nbsp;
                              {propertyData?.current_tenent}
                              <span className="text-white ml-auto"></span>
                            </p>
                            <p className="d-flex justify-content-between">
                              <span>
                                Tenancy Expiry&nbsp;
                                <span className="text-white">
                                  {propertyData?.tenant_expiry}
                                </span>
                              </span>
                              <img
                                src={homeset}
                                style={{ marginTop: "-22px" }}
                                onClick={handleletting}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="propery_tgl">
                    <button
                      className="toggle property_drop purple_bg_btn"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      onClick={() => {
                        handdleAccordion("one");
                      }}
                      style={{ zIndex: "1" }}
                    >
                      {expand === "one" ? (
                        <img
                          src={chevronUp}
                          alt="arrow-up"
                          className="purple_bg_btnss"
                          style={{ width: "30px" }}
                        />
                      ) : (
                        <img
                          className="purple_bg_btn"
                          src={chevron}
                          style={{ width: "30px" }}
                        />
                      )}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
                <div className=" ">
                  <div className="prpt_location d-csflex">
                    <div className="prpt_location d-csflex">
                      <p>
                        ROI -{" "}
                        {(
                          propertyData &&
                          ((propertyData.monthly_net_income * 12) /
                            (propertyData?.property_estimate -
                              propertyData?.debt)) *
                            100
                        )?.toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                  <div
                    id="collapsetwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingtwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="">
                      <div className="property_listing">
                        <div id="">
                          <div className="property_valueDate">
                            <p className="d-flex">
                              <span>Net Equity</span>&nbsp;£
                              {formatNumber(
                                propertyData?.property_estimate -
                                  propertyData?.debt
                              )}{" "}
                              <span className="text-white ml-auto">
                                {" "}
                                {(
                                  ((propertyData?.property_estimate -
                                    propertyData?.debt) /
                                    propertyData?.property_estimate) *
                                  100
                                ).toFixed(1)}
                                %
                              </span>
                            </p>
                            <p>
                              <span>Monthly Rent</span>&nbsp;£
                              {formatNumber(propertyData?.gross_monthly_income)}
                            </p>
                            <p>
                              <span>Mortgage</span>&nbsp;£
                              {formatNumber(propertyData?.mortgage_payment)}
                            </p>
                            <p>
                              <span>Management Fee</span>&nbsp;£
                              {formatNumber(propertyData?.management_fee)}
                            </p>
                            <p>
                              <span>Ground Rent</span>&nbsp;£
                              {formatNumber(propertyData?.ground_rent)}
                            </p>
                            <p>
                              <span>Service Charge</span>&nbsp;£
                              {formatNumber(propertyData?.service_charge)}
                            </p>
                            <p className="d-flex justify-content-between">
                              <span>
                                Net Monthly Income &nbsp;
                                <span className="text-white">
                                  £
                                  {formatNumber(
                                    propertyData?.monthly_net_income
                                  )}
                                </span>
                              </span>
                              <img
                                src={homeset}
                                style={{ marginTop: "-22px" }}
                                onClick={handleSidebar}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="propery_tgl">
                    <button
                      className="toggle property_drop purple_bg_btn"
                      data-bs-toggle="collapse"
                      aria-controls="collapseOne"
                      data-bs-target="#collapsetwo"
                      aria-expanded="true"
                      onClick={() => {
                        handdleAccordion("two");
                      }}
                      style={{ zIndex: "1" }}
                    >
                      {expand === "two" ? (
                        <img
                          src={chevronUp}
                          alt="arrow-up"
                          className="purple_bg_btnss"
                          style={{ width: "30px" }}
                        />
                      ) : (
                        <img
                          className="purple_bg_btn"
                          src={chevron}
                          style={{ width: "30px" }}
                        />
                      )}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
LettingDetails.propTypes = {
  id: PropTypes.string,
  admin: PropTypes.string,
  userId: PropTypes.string,
};

export default LettingDetails;
