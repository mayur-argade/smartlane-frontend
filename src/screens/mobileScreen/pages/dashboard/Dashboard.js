import React, { useEffect } from "react";
import "../../../../assets/css/style.css";
import "./dashboard.css";
import mbtogel from "../../../../assets/img/mb-togel.svg";
import Add_Property from "../../../../assets/img/Add_Property.png";
import Send_Schedule from "../../../../assets/img/Send_Schedule.png";
import frame from "../../../../images/Frame.svg";
import { Link, useLocation } from "react-router-dom";
import DoughnutChart from "../../../Charts/doughnutChart";
import Joyride from "react-joyride";
import { HeaderForMobile } from "../../../../component/header/Header";
import {
  getDashboardData,
  getPortfolioData,
} from "../../../../Devlopment/dashboard";
import { formatCapilize } from "../../../../util/commonFunction";
import { Backdrop, CircularProgress, Grid } from "@mui/material";
import { expireInsurace, propertList } from "../../../../Devlopment/property";
import { formatNumber } from "../../../../util/commonFunction";
import { CSVLink } from "react-csv";
import { csvHeader } from "../../../../Helper/constend";

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = React.useState({});
  const [portfolioDetail, setPortfolioDetail] = React.useState([]);
  const [listData, setListData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [run, setRun] = React.useState(
    localStorage.getItem("joyrideCompleted") !== "true"
  );
  const location = useLocation();
  const { type } = location.state || {};
  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];

  useEffect(() => {
    getPropertList();
    getPortfolio();
    getPortfolioDetails();
    getexpireInsuranseNoti();
    const joyrideCompleted = localStorage.getItem("joyrideCompleted") === "true";
    setRun(!joyrideCompleted);
  }, []);

  const getPropertList = async () => {
    const response = await propertList();
    response?.success && setListData(response?.data);
  };

  const getexpireInsuranseNoti = async () => {
    const response = await expireInsurace();
    console.log(response);
  };

  const getPortfolio = async () => {
    setOpen(true);
    const response = await getDashboardData();
    response?.success && setPortfolioData(response?.data);
    setOpen(false);
  };

  const getPortfolioDetails = async () => {
    const response = await getPortfolioData();
    response?.success && setPortfolioDetail(response?.data);
  };

  const handleJoyrideCallback = (data) => {
    const { status } = data;
  
    if (status === "finished") {
      localStorage.setItem("joyrideCompleted", "true");
      setRun(false);
    }
  };

  return (
    <div>
      {run && type && (
        <Joyride
          locale={{
            back: "Previous",
            last: "Finish",
            next: " Next ",
          }}
          styles={style}
          run={run}
          continuous
          steps={steps}
          callback={handleJoyrideCallback}
        />
      )}

      <div className="welcome_main" style={{ paddingTop: "0" }}>
        <HeaderForMobile
          logo={mbtogel}
          title={`Hi ${formatCapilize(userName)}`}
          notification={true}
          backlogo="no"
          imagedark={true}
        />
        <div className="lead_slide" style={{ marginTop: "5px" }}></div>
        <div className="main_lead_board Nfd_md home">
          <div className="cover_mb"></div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="lead_option">
                  <a href="#" className="three">
                    <Link to={"/postcode"}>
                      <img src={Add_Property} />
                    </Link>
                  </a>
                  {/* <a href="#" className="four"> */}
                  <div>
                    <CSVLink
                      headers={csvHeader}
                      data={portfolioDetail}
                      filename={"Portfolio"}
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                      }}
                    >
                      <div className="four">
                        <img src={Send_Schedule} />
                      </div>
                    </CSVLink>
                  </div>
                  {/* </a> */}
                </div>
              </div>
              <Grid className="one">
                {listData?.length <= 0 ? (
                  <div className="verification_main main_content_wr">
                    <div className="tab_body">
                      <div className="tab_content_wr">
                        <div className="circle_graph">
                          <div className="progressBardemo">
                            <div className="circle_content">
                              <div className="portfolio_no">
                                <span>0</span>
                                {/* <img
                                  src={port}
                                  alt="port.png"
                                  className="ms-1 mb-2"
                                /> */}
                              </div>
                              <div className="portfolio_value">
                                Portfolio Value
                              </div>
                              <div className="value">£0 M</div>
                              <div className="roi">
                                <span className="roi_text">ROI</span>0%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="one">
                    <DoughnutChart
                      data={{
                        Roi: portfolioData?.Roi / portfolioData?.length,
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
                      size={300}
                    />
                  </div>
                )}
              </Grid>
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
              <div className="col-sm-12 two">
                <div className="lead_detail">
                  <div className="lead_name">
                    <span className="balck_option"></span>
                    <p>
                      <span>Debt</span> £
                      {formatNumber(
                        portfolioData && portfolioData?.Debt
                          ? portfolioData && portfolioData?.Debt
                          : 0
                      )}
                    </p>
                  </div>
                  <div className="lead_level">
                    <p>
                      {(portfolioData?.Debt /
                        (portfolioData?.Net_equity + portfolioData?.Debt)) *
                      100
                        ? (
                            (portfolioData?.Debt /
                              (portfolioData?.Net_equity +
                                portfolioData?.Debt)) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </p>
                  </div>
                </div>
                <div className="lead_detail">
                  <div className="lead_name">
                    <span className="yellow_option"></span>
                    <p>
                      <span>Net Equity</span> £
                      {formatNumber(
                        portfolioData && portfolioData?.Net_equity
                          ? portfolioData && portfolioData?.Net_equity
                          : 0
                      )}
                    </p>
                  </div>
                  <div className="lead_level">
                    <p>
                      {(portfolioData?.Net_equity /
                        (portfolioData?.Net_equity + portfolioData?.Debt)) *
                      100
                        ? (
                            (portfolioData?.Net_equity /
                              (portfolioData?.Net_equity +
                                portfolioData?.Debt)) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </p>
                  </div>
                </div>
                <div className="lead_detail">
                  <div className="lead_name d-flex">
                    <span>
                      <img src={frame} className="frames" />
                    </span>
                    <p className="ms-2">
                      <span>Net Monthly Income</span> £
                      {formatNumber(
                        portfolioData && portfolioData.Monthly_net_income
                          ? portfolioData && portfolioData.Monthly_net_income
                          : 0
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <Link to={"/all-properties"}>
                  <a href="#" className="all_property btn">
                    View All Properties
                  </a>
                </Link>
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
