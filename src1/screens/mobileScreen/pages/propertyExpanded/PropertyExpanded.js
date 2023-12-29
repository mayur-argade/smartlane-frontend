import React, { useContext } from "react";
import "../../../../assets/css/style.css";
import "./propertyexpanded.css";
import mbtogel from "../../../../assets/img/mb-togel.svg";
import group from "../../../../assets/img/Group 201.svg";
import property2 from "../../../../assets/img/property.png";
import tracker from "../../../../assets/img/warning-icon.svg";
import chevron from "../../../../images/down.png";
import chevronUp from "../../../../images/up.png";
import leftarrow from "../../../../assets/img/leftarrow.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { documentList, propertDetail } from "../../../../Devlopment/property";
import DoughnutChart from "../../../Charts/doughnutChart";
import AddorEditRoi from "../../../../component/Modal/AddorEditRoi";
import { HeaderForMobile } from "../../../../component/header/Header";
import { allReplace, formatCapilize, formatNumber } from "../../../../util/commonFunction";
import { PropertyList } from "./context";
// import zigzagarrow from "../../../../assets/web-img/zigzagarrow.svg";
import doc_done from "../../../../assets/img/doc_done.svg";
// import redarrow from "../../../../assets/web-img/redarrow.svg";
import homeset from "../../../../assets/web-img/homset.svg";
import AddorEditMortgage from "../../../../component/Modal/AddorEditMortgage";
import AddandEditOwnership from "../../../../component/Modal/AddorEditOwnership";
import AddandEditInsurance from "../../../../component/Modal/AddorEditInsurance";
import AddandEditLetting from "../../../../component/Modal/AddorEditLetting";
const PropertyDetailes = () => {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = React.useState([]);
  const [expand, setExpand] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isMortgageOpen, setIsMortgageOpen] = React.useState(false);
  const [isOwnershipOpen, setIsOwnershipOpen] = React.useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = React.useState(false);
  const [isLettingOpen, setIsLettingOpen] = React.useState(false);
  const [docList, setDocList] = React.useState({});
  const { id } = useParams();
  const location = useLocation();
  const { status } = location.state || {};
  const { data } = useContext(PropertyList);
  const allData = data;
  const [newId, setNewId] = React.useState(
    allData?.findIndex((x) => x?.property_id == id || 0)
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  React.useEffect(() => {
    getPropertyDetails();
    getDocumentList();
  }, [newId, id]);

  const handlemaortgage = () => {
    setIsMortgageOpen(!isMortgageOpen);
  };
  const handleownership = () => {
    setIsOwnershipOpen(!isOwnershipOpen);
  };
  const handleinsurance = () => {
    setIsInsuranceOpen(!isInsuranceOpen);
  };
  const handleletting = () => {
    setIsLettingOpen(!isLettingOpen);
  };

  const handdleAccordion = (data) => {
    setExpand(expand === data ? "" : data);
  };

  const handlePropertyChangeNext = (event) => {
    event.preventDefault();
    setNewId(newId + 1);
    navigate(`/property-expanded/${allData[newId + 1]?.property_id}`, {
      state: { status: status },
    });
    if (currentIndex < allData?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePropertyChangePrev = (event) => {
    event.preventDefault();
    setNewId(newId - 1);
    navigate(`/property-expanded/${allData[newId - 1]?.property_id}`, {
      state: { status: status },
    });
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getPropertyDetails = async () => {
    const payload = {
      id: allData[newId]?.property_id ? allData[newId]?.property_id : id,
    };
    const response = await propertDetail(payload);
    response.success && setPropertyData(response?.data);
  };

  const getDocumentList = async () => {
    const payload = { property_id: id };
    const response = await documentList(payload);
    response.success && setDocList(response?.data);
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

  var length =
    docList?.documentDetail &&
    Object.values(docList?.documentDetail).filter((i) => i);
  var ducownerLength = length?.length;

  var lengths =
    docList?.lettingDetail &&
    Object.values(docList?.lettingDetail).filter((i) => i);
  var duclettLength = lengths?.length;

  var roilengths =
    roiDetails && Object.values(roiDetails).filter((i) => i == null);
  var roilength = roilengths?.length;

  function formatValue(value) {
    // Check if the value is greater than 10000 lakh (1 billion)
    if (value > 1000000) {
      // Format the value in million
      const formattedValue = value / 1000000; // Convert to million
      return `${formattedValue.toFixed(2)} M`;
    }
  
    // If not greater than 10000 lakh, format as usual
    return formatNumber(value);
  }
  

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path={`/property-list/${id}`}
        logo={mbtogel}
        title="portfolio overview"
        notification={true}
        states={{ status: status }}
      />
      {isSidebarOpen && (
        <AddorEditRoi
          Id={
            propertyData && {
              property_id: propertyData.property_id,
            }
          }
          data={
            propertyData && {
              propertyEstimate :propertyData?.property_estimate,
              net_equity: propertyData?.property_estimate - propertyData?.debt,
              monthly_net_income: propertyData?.monthly_net_income,
              gross_monthly_income: propertyData.gross_monthly_income,
              mortgage_payment: propertyData.mortgage_payment,
              management_fee: propertyData.management_fee,
              ground_rent: propertyData.ground_rent,
              service_charge: propertyData.service_charge,
              

            }
          }
          getDetails={getPropertyDetails}
          open={isSidebarOpen}
          close={handleSidebar}
        />
      )}
      {isMortgageOpen && (
        <AddorEditMortgage
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
              propertyEstimate :propertyData?.property_estimate
            }
          }
          getDetails={getPropertyDetails}
          open={isMortgageOpen}
          close={handlemaortgage}
        />
      )}
      {isOwnershipOpen && (
        <AddandEditOwnership
          open={isOwnershipOpen}
          close={handleownership}
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
      {isLettingOpen && (
        <AddandEditLetting
          open={isLettingOpen}
          close={handleletting}
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
      <div className="lead_slide" style={{ marginTop: "5px" }}></div>
      <div className="main_lead_board bgColor_forProp">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="property_top">
                {newId > 0 && (
                  <a
                    className="prevbtn"
                    href=""
                    onClick={handlePropertyChangePrev}
                  >
                    <img
                      className="widthhundererd"
                      style={{ width: "30px", paddingBottom: "5px" }}
                      src={leftarrow}
                    />
                  </a>
                )}   
                <p className="fonttwenty pt-2">
                  {propertyData &&
                    propertyData?.address?.replace(/,/, " ")?.replace(/,/, "")}
                  &nbsp;
                  {propertyData && propertyData?.property_name}
                </p>
                {newId + 1 < allData?.length && (
                  <a
                    className="arrow_nextBtn arrowbuttonnext"
                    href=""
                    onClick={handlePropertyChangeNext}
                  >
                    <img
                      className="widthhundererd"
                      style={{ width: "20px", paddingBottom: "5px" }}
                      src={group}
                    />
                  </a>
                )}
              </div>
              <div className="lead_slide slideleadtwo"></div>
            </div>
          </div>
        </div>
        <div className="lead_bar mb-3 text-center">
          <img src={property2} className="w-100" />
        </div>
        <div className="container py-3">
          {status == "letting" ? (
            <div
              style={{ paddingLeft: "25px", color: "#fff" }}
              className="col-md-7"
            >
              Net Monthly Income
              <div className="topPropertys gapfifteen">
                <h2 className="ftwight fourtyfontsize">
                  £{formatNumber(propertyData?.monthly_net_income)}{" "}
                </h2> 
              </div>
            </div>
          ) : (
            <div className="row px-3 pb-3">
              <div className="col-8">
                <div className="property_value">
                  <p>Property Values</p>
                  <h2>
                    £
                    {formatValue(
  propertyData?.property_estimate - propertyData?.debt + propertyData?.debt
)}
                  </h2>
                  <div className="property_main_option">
                    <div className="property_option" style={{ width: "40%" }}>
                      <span className="balck_option"></span>
                      <p>Debt</p>
                    </div>
                    <div className="property_option" style={{ width: "60%" }}>
                      <span className="yellow_option"></span>
                  
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="img-wr">
                  <DoughnutChart
                    data={{
                      Roi: 155,
                      data: [
                        {
                          name: "Debt",
                          value:
                            (propertyData?.debt /
                              (propertyData?.property_estimate +
                                propertyData?.debt)) *
                            100,
                        },
                        {
                          name: "Net Equity",
                          value:
                            (propertyData?.property_estimate /
                              (propertyData?.property_estimate +
                                propertyData?.debt)) *
                            100,
                        },
                      ],
                    }}
                    size={100}
                    label={true}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="col-sm-12">
            <Link
              to={`/property-document/${status}/${id}`}
              state={{ status: status }}
            >
              {(status == "ownership" && ducownerLength == 2) ||
              duclettLength == 5 ? (
                <a href="#">
                  <button
                    style={{
                      backgroundColor: "#fff",
                      height: "80px",
                      width: "100%",
                      borderRadius: "16px",
                      fontSize: "24px",
                      fontWeight: "400",
                      position: "relative",
                      border: "none",
                      outline: "none",
                      marginTop: "15px",
                    }}
                  >
                    {status == "letting"
                      ? duclettLength >= 4
                        ? "Document"
                        : "Documents"
                      : "Document Tracker"}
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        marginTop: "0",
                      }}
                    >
                      All documents are up to date
                    </p>
                    <img
                      className="ms-2"
                      style={{
                        position: "absolute",
                        right: "9px",
                        top: "19px",
                      }}
                      src={doc_done}
                    />
                  </button>
                </a>
              ) : (
                <a href="#" className="all_property btn">
                  <div
                    className="prop_btnWith_updateCount"
                    style={{ justifyContent: "center" }}
                  >
                    <div>
                      <span>
                        {status == "letting" ? (
                          duclettLength >= 4 ? (
                            <span className="buttonname">Document</span>
                          ) : (
                            <span className="buttonname">Documents</span>
                          )
                        ) : (
                          <span className="buttonname">Document Tracker</span>
                        )}
                      </span>
                      <span className="update_countings">
                        {status == "letting" ? "5" : "2"} updates
                      </span>
                    </div>
                    <span className="warning_icon">
                      <img
                        src={tracker}
                        style={{ borderRadius: "50%", float: "right" }}
                      />
                    </span>
                  </div>
                </a>
              )}
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="property_accordian">
              <div className="accordion" id="accordionExample">
                <div className=" ">
                  {expand === "" ? (
                    <div id="targest">
                      <div
                        className="property_valueDate"
                        style={{ margin: "0px 20px" }}
                      >
                        <div className="prpt_location d-csflex">
                          <p style={{ fontWeight: "500" }}>ROI - </p>
                          <span className="colf80 ms-2">
                            {roilength} fields missing
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )} 
                  <div className="prpt_location d-csflex">
                    {expand === "" ? (
                      ""
                    ) : (
                      <div
                        className="accordion-body"
                        style={{
                          paddingBottom: "0px",
                          marginBottom: "0px",
                        }}
                      >
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
                    )}
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
                              <span>Net Equity</span>&nbsp;£
                              {formatNumber(
                                propertyData &&
                                  propertyData.property_estimate -
                                    propertyData.debt
                              )}
                              <span className="text-white ml-auto">
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
                              {formatNumber(
                                propertyData &&
                                  propertyData.gross_monthly_income
                              )}
                            </p>
                            <p>
                              <span>Mortgage</span>&nbsp;£
                              {formatNumber(
                                propertyData && propertyData.mortgage_payment
                              )}
                            </p>
                            <p>
                              <span>Management Fee</span>&nbsp;£
                              {formatNumber(
                                propertyData && propertyData.management_fee
                              )}
                            </p>
                            <p>
                              <span>Ground Rent</span>&nbsp;£
                              {formatNumber(
                                propertyData && propertyData.ground_rent
                              )}
                            </p>
                            <p>
                              <span>Service Charge</span>&nbsp;£
                              {formatNumber(
                                propertyData && propertyData.service_charge
                              )}
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
                      className={
                        expand == "one"
                          ? "toggle property_drop"
                          : "toggle property_drops"
                      }
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      onClick={() => {
                        handdleAccordion("one");
                      }}
                      style={{ zIndex: "1" }}
                    >
                      <img src={expand === "one" ? chevronUp : chevron} />{" "}
                    </button>
                    <div className="togel_line"></div>
                  </div>
                </div>
                {status === "ownership" && (
                  <div>
                    {" "}
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
                                  <span>Debt</span>&nbsp;£
                                  {formatNumber(
                                    propertyData && propertyData.debt
                                  )}
                                  <span className="text-white ml-auto">
                                    {(
                                      (propertyData?.debt /
                                        propertyData?.property_estimate) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </span>
                                </p>
                                <p>
                                  <span>Type</span>&nbsp;
                                  {propertyData && propertyData.mortgage_type}
                                </p>
                                <p>
                                  <span>Interest Rate</span>&nbsp;
                                  {propertyData && propertyData.interest_rate}
                                </p>
                                <p>
                                  <span>Provider</span>&nbsp;
                                  {propertyData &&
                                    propertyData.mortgage_provider}
                                </p>
                                <p className="d-flex justify-content-between">
                                  <span>
                                    Expiry&nbsp;
                                    <span className="text-white">
                                      {propertyData?.mortgage_expiry}
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
                          className={
                            expand == "two"
                              ? "toggle property_drop"
                              : "toggle property_drops"
                          }
                          data-bs-toggle="collapse"
                          aria-controls="collapseOne"
                          data-bs-target="#collapsetwo"
                          aria-expanded="true"
                          onClick={() => {
                            handdleAccordion("two");
                          }}
                          style={{ zIndex: "1" }}
                        >
                          <img src={expand === "two" ? chevronUp : chevron} />{" "}
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
                              <p>
                                <span>Type</span>&nbsp; 
                                {allReplace(formatCapilize(propertyData?.ownership_type), { _: " " })}
                              </p>
                              <p className="d-flex justify-content-between">
                                <span>
                                  Company Number&nbsp;
                                  <span className="text-white">
                                    {propertyData &&
                                      propertyData.company_number}
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
                      <div className="propery_tgl">
                        <button
                          className={
                            expand == "three"
                              ? "toggle property_drop"
                              : "toggle property_drops"
                          }
                          data-bs-toggle="collapse"
                          aria-controls="collapsethree"
                          data-bs-target="#collapsethree"
                          aria-expanded="true"
                          onClick={() => {
                            handdleAccordion("three");
                          }}
                          style={{ zIndex: "1" }}
                        >
                          <img src={expand === "three" ? chevronUp : chevron} />{" "}
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
                              <p>
                                <span>Type</span>&nbsp;
                                {propertyData && propertyData.insurance_type}
                              </p>
                              <p>
                                <span>Provide</span>&nbsp;
                                {propertyData &&
                                  propertyData.insurance_provider}
                              </p>
                              <p className="d-flex justify-content-between">
                                <span>
                                  Expiry&nbsp;
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
                      <div className="propery_tgl">
                        <button
                          className={
                            expand == "four"
                              ? "toggle property_drop"
                              : "toggle property_drops"
                          }
                          data-bs-toggle="collapse"
                          aria-controls="collapsefour"
                          data-bs-target="#collapsefour"
                          aria-expanded="true"
                          onClick={() => {
                            handdleAccordion("four");
                          }}
                          style={{ zIndex: "1" }}
                        >
                          <img src={expand === "four" ? chevronUp : chevron} />{" "}
                        </button>
                        <div className="togel_line"></div>
                      </div>
                    </div>
                  </div>
                )}
                {status === "letting" && (
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
                              <span>Current Tenant</span>&nbsp;
                              {propertyData && propertyData.current_tenent}
                            </p>
                            <p className="d-flex justify-content-between">
                              <span>
                                Tenancy Expiry&nbsp;
                                <span className="text-white">
                                  {propertyData && propertyData.tenant_expiry}
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
                    <div className="propery_tgl">
                      <button
                        className={
                          expand == "five"
                            ? "toggle property_drop"
                            : "toggle property_drops"
                        }
                        data-bs-toggle="collapse"
                        aria-controls="collapsefive"
                        data-bs-target="#collapsefive"
                        aria-expanded="true"
                        onClick={() => {
                          handdleAccordion("five");
                        }}
                        style={{ zIndex: "1" }}
                      >
                        <img src={expand === "five" ? chevronUp : chevron} />{" "}
                      </button>
                      <div className="togel_line"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailes;
