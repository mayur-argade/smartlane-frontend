import React from "react";
import ownershipimg from "../../../../assets/web-img/owner.svg";
import home from "../../../../assets/web-img/home.png";
import homeset from "../../../../assets/web-img/homset.svg";
import {
  propertDetail,
  propertDetailforAdmin,
} from "../../../../Devlopment/property";
import PropTypes from "prop-types";
import chevron from "../../../../images/down.png";
import chevronUp from "../../../../images/up.png";
import { allReplace, formatCapilize, formatNumber } from "../../../../util/commonFunction";
import AddandEditRoi from "../../../../component/webmodal/AddorEditRoi";
import AddandEditMortgage from "../../../../component/webmodal/AddorEditMortgage";
import AddandEditOwnership from "../../../../component/webmodal/AddorEditOwnership";
import AddandEditInsurance from "../../../../component/webmodal/AddorEditInsurance";


const OwnershipDetails = ({ id, admin, userId }) => {
  const [propertyData, setPropertyData] = React.useState();
  const [expand, setExpand] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isMortgageOpen, setIsMortgageOpen] = React.useState(false);
  const [isOwnershipOpen, setIsOwnershipOpen] = React.useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = React.useState(false);

  React.useEffect(() => {
    getPropertyDetails();
  }, [id, userId]);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handlemaortgage = () => {
    setIsMortgageOpen(!isMortgageOpen);
  };
  const handleownership = () => {
    setIsOwnershipOpen(!isOwnershipOpen);
  };
  const handleinsurance = () => {
    setIsInsuranceOpen(!isInsuranceOpen);
  };

  const getPropertyDetails = async () => {
    const payload = {
      id: id,
      userId: userId,
    };
    const response = admin
      ? await propertDetailforAdmin(payload)
      : await propertDetail(payload);
    response.success && setPropertyData(response?.data);
    console.log("response?.data" , response?.data)
  };

  const handdleAccordion = (data) => {
    setExpand(expand === data ? "" : data);
  };

  const roiDetails = {
    net_equity: propertyData?.property_estimate - propertyData?.debt,
    gross_monthly_income: propertyData?.gross_monthly_income,
    mortgage_payment: propertyData?.mortgage_payment,
    management_fee: propertyData?.management_fee,
    ground_rent: propertyData?.ground_rent,
    service_charge: propertyData?.service_charge,
    monthly_net_income: propertyData?.monthly_net_income,
  };

  var lengths =
    roiDetails && Object.values(roiDetails).filter((i) => i == null);
  var roilength = lengths?.length;

  function isValidDate(dateString) {
    const isValid = !isNaN(Date.parse(dateString));
    return isValid;
  }

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
                  propertyEstimate:propertyData?.property_estimate,
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
        {isMortgageOpen && (
          <AddandEditMortgage
            open={isMortgageOpen}
            close={handlemaortgage}
            admin={admin}
            userId={userId}
            Id={
              propertyData && {
                property_id: propertyData.property_id,
              }
            }
            data={
              propertyData && {
                debt: propertyData?.debt,
                type: propertyData?.mortgage_type,
                interest_rate: propertyData?.interest_rate,
                provider: propertyData?.mortgage_provider,
                expiry: propertyData?.mortgage_expiry,
              }
            }
            getDetails={getPropertyDetails}
          />
        )}
        {isOwnershipOpen && (
          <AddandEditOwnership
            open={isOwnershipOpen}
            close={handleownership}
            admin={admin}
            userId={userId}
            Id={
              propertyData && {
                property_id: propertyData.property_id,
              }
            }
            data={
              propertyData && {
                type: propertyData?.ownership_type,
                company_number: propertyData?.company_number,
              }
            }
            getDetails={getPropertyDetails}
          />
        )}
        {isInsuranceOpen && (
          <AddandEditInsurance
            open={isInsuranceOpen}
            close={handleinsurance}
            admin={admin}
            userId={userId}
            Id={
              propertyData && {
                property_id: propertyData.property_id,
              }
            }
            data={
              propertyData && {
                type: propertyData?.insurance_type,
                provider: propertyData?.insurance_provider,
                expiry: propertyData?.insurance_expiry,
              }
            }
            getDetails={getPropertyDetails}
          />
        )}
        <div className="tab_head header_center">
          <img src={ownershipimg} />
          <h5 className="bwhiteg ms-4">Ownership</h5>
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
                <div className="property_valueDate d-csflex pvaldate">
                  <span className="roipoint"></span>
                  <span className="ftwight ">
                    ROI -{" "}
                    {(
                      propertyData &&
                      ((propertyData.monthly_net_income * 12) /
                        (propertyData?.property_estimate -
                          propertyData?.debt)) *
                        100
                    )?.toFixed(1)}
                    %
                  </span>
                  <span className="colf80 ms-2">
                    {roilength} fields missing
                  </span>
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
                                Net Monthly Income&nbsp;
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
                    <div className="property_valueDate d-csflex m-0">
                      <p>Mortgage Details</p>
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
                          <div className="property_valueDate m-0">
                            <div className="d-csflex pro_per">
                              <p>
                                <span>Debt</span>&nbsp;£
                                {formatNumber(propertyData?.debt)}
                              </p>
                              <p>
                                {" "}
                                {(
                                  (propertyData?.debt /
                                    propertyData?.property_estimate) *
                                  100
                                )?.toFixed(1)}
                                %
                              </p>
                            </div>
                            <p>
                              <span>Type</span>&nbsp;
                              {propertyData?.mortgage_type}
                            </p>
                            <p>
                              <span>Interset Rate</span> &nbsp;
                              {propertyData?.interest_rate}
                            </p>
                            <p>
                              <span>Provider</span>&nbsp;
                              {propertyData?.mortgage_provider}
                            </p>
                            <p className="d-flex justify-content-between">
                              <span>
                                Expiry &nbsp;
                                <span className="text-white">
                                {propertyData?.mortgage_expiry && isValidDate(propertyData?.mortgage_expiry) && (
  <span>
{propertyData?.mortgage_expiry}  </span>
)}
                                </span>
                              </span>
                              <img
                                src={homeset}
                                style={{ marginTop: "-22px" }}
                                onClick={handlemaortgage}
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
                <div className=" ">
                  <div className="prpt_location d-csflex">
                    <div className="property_valueDate d-csflex m-0">
                      <p>Ownership Details</p>
                    </div>
                  </div>
                  <div
                    id="collapsethree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingtwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="">
                      <div className="property_listing">
                        <div id="">
                          <div className="property_valueDate m-0">
                            <p>
                              <span>Type</span>&nbsp;
                              {allReplace(formatCapilize(propertyData?.ownership_type), { _: " " })}
                            </p>
                            <p className="d-flex justify-content-between">
                              <span>
                                Company Number &nbsp;
                                <span className="text-white">
                                  {propertyData?.company_number}
                                </span>
                              </span>
                              <img
                                src={homeset}
                                style={{ marginTop: "-22px" }}
                                onClick={handleownership}
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
                      data-bs-target="#collapsethree"
                      aria-expanded="true"
                      onClick={() => {
                        handdleAccordion("three");
                      }}
                      style={{ zIndex: "1" }}
                    >
                      {expand === "three" ? (
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
                    <div className="property_valueDate d-csflex m-0">
                      <p>Insurance Details</p>
                    </div>
                  </div>
                  <div
                    id="collapsefor"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingtwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="">
                      <div className="property_listing">
                        <div id="">
                          <div className="property_valueDate m-0">
                            <p>
                              <span>Type</span>&nbsp;
                              {propertyData?.insurance_type}
                            </p>
                            <p>
                              <span>Provider</span>&nbsp;
                              {propertyData?.insurance_provider}
                            </p>
                            <p className="d-flex justify-content-between">
                              <span>
                                Expiry &nbsp;
                                <span className="text-white">
                                  {propertyData?.insurance_expiry}
                                </span>
                              </span>
                              <img
                                src={homeset}
                                style={{ marginTop: "-22px" }}
                                onClick={handleinsurance}
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
                      data-bs-target="#collapsefor"
                      aria-expanded="true"
                      onClick={() => {
                        handdleAccordion("four");
                      }}
                      style={{ zIndex: "1" }}
                    >
                      {expand === "four" ? (
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
OwnershipDetails.propTypes = {
  id: PropTypes.string,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default OwnershipDetails;
