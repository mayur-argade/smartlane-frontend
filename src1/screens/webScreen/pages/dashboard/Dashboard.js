import React, { useContext, useState } from "react";
import "./dashboard.css";
import sideup from "../../../../assets/web-img/side_op_1.svg";
import tabhead from "../../../../assets/web-img/tab_head1.svg";
import tabhead2 from "../../../../assets/web-img/tab_head2.svg";
import locationactive from "../../../../assets/web-img/locationactive.svg";
import sends from "../../../../assets/web-img/sendport.svg";
import locationlogo from "../../../../assets/web-img/locationyellow.svg";
import arrowdown from "../../../../images/down.png";
import arrowup from "../../../../images/up.png";
import Header from "../../../../component/header/Header";
import {
  AllDocumentList,
  expireInsurace,
  propertList,
} from "../../../../Devlopment/property";
import AddNewProperty from "../../../../component/webmodal/AddNewProperty";
import PropertyDetails from "./propertyDetails";
import {
  getDashboardData,
  getPortfolioData,
} from "../../../../Devlopment/dashboard";
import DoughnutChart from "../../../Charts/doughnutChart";
import { formatCapilize, formatNumber } from "../../../../util/commonFunction";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import Joyride from "react-joyride";
import { useLocation } from "react-router-dom";
import { PropertyContext } from "../../../../context";
import { CSVLink } from "react-csv";
import { csvHeader } from "../../../../Helper/constend";
import frame from "../../../../images/Frame.svg";


const Dashboard = () => {
  const [dashboardData, setDashboardData] = React.useState([]);
  const [portfolioData, setPortfolioData] = React.useState([]);
  const [portfolioDetail, setPortfolioDetail] = React.useState([]);
  const [allDocList, setAllDocList] = React.useState([]);
  const [selectedProperty, setSelectedProperty] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = useState("");
  const [run, setRun] = React.useState(
    localStorage.getItem("joyrideCompleted") !== "true"
  );
  
  const [searchPro,setSearchPro] = React.useState("")
  const location = useLocation();

  const proertyConstext = useContext(PropertyContext);
  const { type } = location.state || {};
  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";

  var userName = userInfo?.full_name?.split(" ")[0];

  const handdleAccordion = (data) => {
    setExpand((pre) => ({ ...pre, [data]: !pre[data] }));
  };
 
  React.useEffect(() => {
    PortfolioData();
    getPropertList();
    getPortfolio();
    getDocumentList();
    getexpireInsuranseNoti();
  
    const joyrideCompleted = localStorage.getItem("joyrideCompleted") === "true";
    setRun(!joyrideCompleted);
  }, []);
  
  const handdleSelectedProperty = (item) => {
    setSelectedProperty(item);
  };

  const PortfolioData = async () => {
    const response = await getDashboardData();
    response?.success && setPortfolioData(response?.data);
  };

  const unuloadedDoc =
    allDocList &&
    allDocList
      .filter((obj) => Object.values(obj).includes(null))
      ?.map((item) => item?.id);
 
      console.log("unlaodlist" , allDocList)

  const getDocumentList = async () => {
    const response = await AllDocumentList();
    response?.success && setAllDocList(response?.data);
  };

  const getPortfolio = async () => {
    const response = await getPortfolioData();
    response?.success && setPortfolioDetail(response?.data);
  };
  const getexpireInsuranseNoti = async () => {
    await expireInsurace();
  };

  const getPropertList = async () => {
    setOpen(true);
    const response = await propertList();
    
    response?.success && setDashboardData(response?.data);
    response?.success && proertyConstext?.updateProperty(response?.data);
    console.log("propertydata" , response?.data )
    setOpen(false);
  };

  const searchProperty = dashboardData?.filter((x) =>
  x.property_address
    .toString()
    .toLowerCase()
    .includes(searchPro.toString().toLowerCase())
) 

function isValidDate(dateString) {
  const isValid = !isNaN(Date.parse(dateString));
  return isValid;
}

const handleJoyrideCallback = (data) => {
  const { status } = data;

  if (status === "finished") {
    localStorage.setItem("joyrideCompleted", "true");
    setRun(false);
  }
};

  return (
    <div>
      <Header 
       onchanges={(event) => {
        setSearchPro(event.target.value);
      }}
      userpro={true}
      />
      {run && type === 1 && (
        <Joyride
          locale={{
            back: "Previous",
            last: "Finish",
            next: " Next ",
          }}
          styles={style}
          run={run}
          continuous={true}
          steps={steps}
          callback={handleJoyrideCallback}

        />
      )}

      <div className="main_body">
        <div className="container-fluid">
          <div className="row home">
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
                  <div>
                    <img src={sideup} />
                  </div>
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
            <div className="col-11 pl-0">
              <div
                className="tab-content main_content_wr"
                id="v-pills-tabContent"
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="row">
                    <div className="col-md-4 pr-0">
                      <div className="tab_head">
                        <img src={tabhead} />
                        <h5>Portfolio Overview</h5>
                      </div>
                      <div className="tab_body" style={{ paddingBottom: "0" }}>
                        <h3 className="m-0">Hi {formatCapilize(userName)}</h3>
                        <div className="tab_content_wr">
                          <Grid className="one">
                            {dashboardData?.length <= 0 ? (
                              <div className="verification_main main_content_wr">
                                <div className="tab_body p-0">
                                  <div className="tab_content_wr">
                                    <div className="circle_graph">
                                      <div className="progressBardemo">
                                        <div className="circle_content">
                                          <div className="portfolio_no">
                                            <span>0</span>
                                          </div>
                                          <div className="portfolio_value">
                                            Portfolio Value
                                          </div>
                                          <div className="value">£0 M</div>
                                          <div className="roi">
                                            <span className="roi_text">
                                              ROI
                                            </span>
                                            0%
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <DoughnutChart
                                className="one"
                                data={{
                                  Roi:
                                    portfolioData?.Roi / portfolioData?.length,
                                  Property_value: portfolioData?.Property_value,
                                  length: portfolioData?.length,
                                  data: [
                                    {
                                      name: "Debt",
                                      value:
                                        (portfolioData?.Debt /
                                          (portfolioData?.Net_equity +
                                            portfolioData?.Debt)) *
                                        100,
                                    },
                                    {
                                      name: "Net Equity",
                                      value:
                                        (portfolioData?.Net_equity /
                                          (portfolioData?.Net_equity +
                                            portfolioData?.Debt)) *
                                        100,
                                    },
                                  ],
                                }}
                                size={250}
                              />
                            )}
                          </Grid>
                          <div className="two">
                            <div className="progress_data_wr">
                              <div>
                                <div>
                                  <span className="color_div blackDiv"></span>
                                  <span>
                                    <span className="yellow_text">Debt</span>£
                                    {formatNumber(
                                      portfolioData && portfolioData?.Debt
                                    )}
                                  </span>
                                </div>
                                <div>
                                  {(portfolioData?.Debt /
                                    (portfolioData?.Net_equity +
                                      portfolioData?.Debt)) *
                                  100
                                    ? (
                                        (portfolioData?.Debt /
                                          (portfolioData?.Net_equity +
                                            portfolioData?.Debt)) *
                                        100
                                      ).toFixed(1)
                                    : 0}
                                  %
                                </div>
                              </div>
                              <div>
                                <div>
                                  <span className="color_div yellowDiv"></span>
                                  <span>
                                    <span className="yellow_text">
                                      Net Equity
                                    </span>
                                    £
                                    {formatNumber(
                                      portfolioData && portfolioData?.Net_equity
                                    )}
                                  </span>
                                </div>
                                <div>
                                  {(portfolioData?.Net_equity /
                                    (portfolioData?.Net_equity +
                                      portfolioData?.Debt)) *
                                  100
                                    ? (
                                        (portfolioData?.Net_equity /
                                          (portfolioData?.Net_equity +
                                            portfolioData?.Debt)) *
                                        100
                                      ).toFixed(1)
                                    : 0}
                                  %
                                </div>
                              </div>
                              <div className="">
                                <div>
                                  <span className="color_div">
                                    <img
                                      src={frame}
                                      className="frames"
                                      style={{
                                        width: "25px",
                                      }}
                                    />
                                  </span>
                                  <span className="yellow_text ms-3">
                                    Net Monthly Income
                                  </span>
                                  <span>
                                    £
                                    {formatNumber(
                                      portfolioData &&
                                        portfolioData.Monthly_net_income
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 pr-0 pl-0">
                      <div className="tab_head header_center">
                        <img src={tabhead2} />
                        <h5>Properties</h5>
                      </div>
                      <div className="tab_body tab_body_center_div newhieght">
                        <div className="row">
                          <div className="col-6">
                            <div className="add_property three">
                              <AddNewProperty
                                getPropertyList={getPropertList}
                                PortfolioDatas={PortfolioData}
                                tour="three"
                              />
                              <div className="title">Add New Property</div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="add_property four ">
                              <CSVLink
                                headers={csvHeader}
                                data={portfolioDetail}
                                filename={"Portfolio"}
                                style={{
                                  textDecoration: "none",
                                  color: "#fff",
                                }}
                              >
                                <div className="img_wr">
                                  <img src={sends} />
                                </div>
                                <div className="title">Send Portfolio</div>
                              </CSVLink>
                            </div>
                          </div>
                        </div>
                        <div className="btn_wr">
                          <button
                            className="purple_btn"
                            style={{ padding: "0 25px" }}
                          >
                            {searchProperty?.length} results
                          </button>
                          {unuloadedDoc?.length > 0 && (
                            <span
                              className="ms-3"
                              style={{
                                backgroundColor: "#fff",
                                color: "#000",
                                padding: "6px 12px",
                                borderRadius: "5px",
                                fontWeight: "700",
                                fontSize: "20px",
                              }}
                            >
                              {unuloadedDoc?.length}
                            </span>
                          )}
                        </div>
                        <div className="property_accordian">
                          {searchProperty &&
                            searchProperty?.map((item) => (
                              <div
                                className="accordion"
                                key={item.property_id}
                                id="accordionExample"
                              >
                                <div className=" "> 
                                    <div
                                      className={
                                        selectedProperty == item?.property_id
                                          ? "accordion-body DDD"
                                          : "accordion-body"
                                      }
                                    >
                                      <div className="prop_location newside">
                                        <span>
                                          <img
                                            src={
                                              unuloadedDoc?.includes(
                                                item?.property_id
                                              )
                                                ? locationactive
                                                : locationlogo
                                            }
                                            alt="Location Icon"
                                            width="30"
                                          />
                                        </span>
                                        <span>
                                          <a
                                            className="text-white ms-2"
                                            onClick={() => {
                                              handdleSelectedProperty(
                                                item?.property_id
                                              );
                                            }}
                                          >
 {item &&
  item?.property_address
    ?.match(/^[^,]+/)?.[0]
    ?.trim()
}





                                          </a>
                                        </span>
                                      </div>
                                      <div className="roi d-flex justify-content-between">
                                        <span>
                                          <span className="yellow_text">
                                            ROI
                                          </span>{" "}
                                          {item && item?.Roi.toFixed(1)}%
                                        </span>
                                        {item?.mortgage_expiry && isValidDate(item?.mortgage_expiry) && (
  <span>
    <span className="yellow_text">Mortgage Expiry</span>{" "}
    {item?.mortgage_expiry}
  </span>
)}
                                    
                                      </div>
                                    </div> 
                                  <div
                                    id={`collapse${item?.property_id}`}
                                    className="accordion-collapse collapse "
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div
                                      className={
                                        selectedProperty == item?.property_id
                                          ? "accordion-body DDD"
                                          : "accordion-body"
                                      }
                                      style={{marginTop:"-24px"}}
                                    >
                                      {/* <div className="prop_location newside">
                                        <span>
                                          <img
                                            src={
                                              unuloadedDoc?.includes(
                                                item?.property_id
                                              )
                                                ? locationactive
                                                : locationlogo
                                            }
                                            alt="Location Icon"
                                          />
                                        </span>
                                        <span className="ms-2">
                                          {item &&
                                            item?.property_address
                                              ?.replace(/,/, "")
                                              ?.replace(/,/, " ")}
                                        </span>
                                      </div>
                                      <div className="roi d-flex">
                                        <span>
                                          <span className="yellow_text">
                                            ROI
                                          </span>{" "}
                                          {item && item?.Roi.toFixed(1)}%
                                        </span>
                                        <span>
                                          <span className="yellow_text">
                                            Mortgage Expiry
                                          </span>{" "}
                                          {item?.mortgage_expiry}
                                        </span>
                                      </div> */}
                                      <div className="mni mt-1">
                                        <span>
                                          <span className="yellow_text">
                                            Net Monthly Income
                                          </span>{" "}
                                          £
                                          {formatNumber(
                                            item && item?.Monthly_net_income
                                          )}
                                        </span>
                                      </div>
                                      <div className="neq d-flex">
                                        <span>
                                          <span className="yellow_text">
                                            Net Equitys
                                          </span>{" "}
                                          £
                                          {formatNumber(
                                            item && item.Net_equity
                                          )}
                                        </span>
                                        <span>
                 
                                          {(
                                            (item?.Net_equity /
                                              item?.property_estimate) *
                                            100
                                          ).toFixed(1)}
                                          %
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <h2
                                    className="accordion-header"
                                    id="headingOne"
                                  >
                                    <button
                                      className="accordion purple_bg_btn"
                                      type="button"
                                      data-bs-target={`#collapse${item?.property_id}`}
                                      aria-expanded="false"
                                      aria-controls={`collapse${item?.property_id}`}
                                      data-bs-toggle="collapse"
                                      onClick={() => {
                                        handdleAccordion(item?.property_id);
                                      }}
                                      // onClick={() => {
                                      //   handdleAccordion("one");
                                      // }}
                                    >
                                      {expand[item?.property_id] ? (
                                        <img
                                          src={arrowdown}
                                          alt="arrow-up"
                                          className="purple_bg_btnss"
                                        />
                                      ) : (
                                        <img
                                          className="purple_bg_btn"
                                          src={arrowup}
                                        />
                                      )}
                                    </button>
                                  </h2>
                                </div>
                              </div>
                            ))}
                        </div>
                        <Backdrop
                          sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                          }}
                          open={open}
                          onClick={() => setOpen(false)}
                        >
                          <CircularProgress style={{ color: "#F9D75D" }} />
                        </Backdrop>
                      </div>
                    </div>
                    {dashboardData.length > 0 && (
                      <PropertyDetails
                        id={selectedProperty || dashboardData[0].property_id}
                        image={true}
                        letting={false}
                        tourown="five"
                        tourlett="six"
                        onPropertyChange={handdleSelectedProperty}
                      />
                    )}
                    {/* {dashboardData.length > 0 && (
                      <Property
                        id={selectedProperty || dashboardData[0].property_id}
                        image={true}
                      />
                    )} */}
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
    </div>
  );
};

export default Dashboard;
const steps = [
  {
    target: ".home",
    content:
      "Welcome to your dashboard! This is where smartlane shows you the latest one your portfolio.",
    disableBeacon: true,
  },
  {
    target: ".one",
    content:
      "See how the overall value of your portfolio rises and falls with real-time updates.",
  },
  {
    target: ".two",
    content:
      "View your debt/equity ratio and monthly net income across your portfolio.",
  },
  {
    target: ".three",
    content: "Add a new property by clicking this button.",
  },
  {
    target: ".four",
    content:
      "Send your portfolio schedule to your broker as a Microsoft Excel file.",
  },
  {
    target: ".five",
    content:
      "Send your portfolio schedule to your broker as a Microsoft Excel file.",
  },
  {
    target: ".six",
    content:
      "Send your portfolio schedule to your broker as a Microsoft Excel file.",
  },
];

const style = {
  options: {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    overlayColor: "#404040",
    primaryColor: "mediumaquamarine",
    textColor: "#333",
    width: 450,
    zIndex: 1000,
  },
  tooltip: {
    color: "black",
    fontSize: "20px",
    borderRadius: "18px",
  },

  buttonBack: {
    background: "rgb(185, 178, 220)",
    color: "black",
    fontSize: "25px",
    width: "50%",
    borderRadius: "12px",
    padding: "12px",
  },
  buttonNext: {
    width: "50%",
    background: "#212121",
    fontSize: "25px",
    borderRadius: "12px",
    padding: "12px",
  },
  buttonClose: {
    display: "none",
  },
};
