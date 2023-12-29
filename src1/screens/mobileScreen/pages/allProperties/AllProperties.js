import React, { useContext, useState } from "react";
import "../../../../assets/css/style.css";
import "../../../../assets/css/web.css";
import mbtogel from "../../../../assets/img/mb-togel.svg";
import search from "../../../../assets/web-img/search.png";
import Location from "../../../../assets/web-img/locationyellow.svg";
import locationactive from "../../../../assets/web-img/locationactive.svg";
import chevronUp from "../../../../images/down.png";
import chevron from "../../../../images/up.png";
import { Link } from "react-router-dom";
import { AllDocumentList, propertList } from "../../../../Devlopment/property";
import { HeaderForMobile } from "../../../../component/header/Header";
import { Backdrop, CircularProgress } from "@mui/material";
import { formatNumber } from "../../../../util/commonFunction";
import { PropertyList } from "../propertyExpanded/context";

const AllProperties = () => {
  const [listData, setListData] = useState([]);
  const [expand, setExpand] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = React.useState(false);
  const { updateData } = useContext(PropertyList);
  const [allDocList, setAllDocList] = React.useState([]);

  const handdleAccordion = (data) => {
    setExpand((pre) => ({ ...pre, [data]: !pre[data] }));
  };

  React.useEffect(() => {
    getPropertList();
    getDocumentList();
  }, []);

  const getPropertList = async () => {
    setOpen(true);
    const response = await propertList();
    response?.success && setListData(response?.data);
    localStorage.setItem("propertyData", JSON.stringify(response?.data));
    updateData(response?.data);
    setOpen(false);
  };

  const getDocumentList = async () => {
    const response = await AllDocumentList();
    response?.success && setAllDocList(response?.data);
  };

  function isValidDate(dateString) {
    const isValid = !isNaN(Date.parse(dateString));
    return isValid;
  }

  const unuloadedDoc =
    allDocList &&
    allDocList
      .filter((obj) => Object.values(obj).includes(null))
      ?.map((item) => item?.id);
  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/dashboard"
        logo={mbtogel}
        title="portfolio overview"
        notification={true}
      />
      <div className="lead_slide" style={{ marginTop: "5px" }}></div>
      <div className="main_lead_board Nfd_md">
        <div className="cover_mb"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group property_PGSearch">
                <span className="PGsearch">
                  <img src={search} />
                </span>
                <span className="PGsearchlable">
                  <label className="labe">SEARCH MY PROPERTIES</label>
                </span>
                <input
                  type="text"
                  className="form-control "
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              {/* ####################################################################### */}
              <div className="btn_wr">
                <button className="purple_btn" style={{ padding: "0 25px" }}>
                  {listData &&
                    listData.filter((item) =>
                      item.property_address
                        .toString()
                        .toLowerCase()
                        .includes(searchInput.toString().toLowerCase())
                    )?.length}{" "}
                  results
                </button>
                {unuloadedDoc?.length > 0 && (
                  <span
                    className="ms-3"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      padding: "3px 12px",
                      borderRadius: "5px",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    {unuloadedDoc?.length}
                  </span>
                )}
              </div>
              <div className="col-md-4 pr-0 pl-0">
                <div className="ta_body tab_body_center_div">
                  {listData &&
                    listData
                      .filter((x) =>
                        x.property_address
                          .toString()
                          .toLowerCase()
                          .includes(searchInput.toString().toLowerCase())
                      )
                      .map((item, index) => (
                        <div
                          key={`collapse${index}`}
                          className="property_accordian"
                        >
                          <div className="accordion" id="accordionExample">
                            <div className=" ">
                              <div
                                className="-body"
                                style={{
                                  paddingBottom: "0px",
                                  marginBottom: "0px",
                                }}
                              >
                                <div className="main_pr_tb mt-2">
                                  <div
                                    className="prpt_location d-csflex"
                                    style={{ marginLeft: "-5px" }}
                                  >
                                    <img
                                      src={
                                        unuloadedDoc?.includes(
                                          item?.property_id
                                        )
                                          ? locationactive
                                          : Location
                                      }
                                    />
                                    <Link
                                      to={`/property-list/${item?.property_id} `}
                                    >
                                      <p>
                                        {item?.property_address
                                          ?.replace(/,/, " ")
                                          ?.replace(/,/, "")}
                                      </p>
                                    </Link>
                                  </div>
                                  <div className="property_valueDate d-csflex">
                                    <p>
                                      <span>ROI</span>&nbsp;
                                      {item?.Roi?.toFixed(1)} %
                                    </p>
                                    <p>
                             {item?.mortgage_expiry && isValidDate(item?.mortgage_expiry) && (
  <span>
    <span className="yellow_text">Mortgage Exp</span>
    {item?.mortgage_expiry}
  </span>
)}

                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div
                                id={`collapse${index}`}
                                // id={`collapse${item?.company_number}`}
                                className="accordion-collapse collapse "
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div
                                  className=""
                                  style={{
                                    paddingTop: "0px",
                                    paddingBottom: "0px",
                                    marginTop: "0px",
                                    marginBottom: "0px",
                                  }}
                                >
                                  <div className="main_pr_tb mt-2">
                                    <div className="property_listing">
                                      <div id="">
                                        <div className="property_valueDate">
                                          <p>
                                            <span>Monthly Net Income</span>{" "}
                                            &nbsp;£
                                            {formatNumber(
                                              item?.Monthly_net_income
                                            )}{" "}
                                          </p>
                                          <div className="d-csflex pro_per">
                                            <p>
                                              <span>Net Equity</span> &nbsp;£
                                              {formatNumber(item?.Net_equity)}
                                            </p>
                                            <p>
                                              {(
                                                (item?.Net_equity /
                                                  item?.property_estimate) *
                                                100
                                              )?.toFixed(1)}
                                              %
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="propery_tgl">
                                <button
                                  className={
                                    expand[index]
                                      ? "toggle property_drops"
                                      : "toggle property_drop"
                                  }
                                  type="button"
                                  data-bs-target={`#collapse${index}`}
                                  aria-expanded="true"
                                  aria-controls={`collapse${index}`}
                                  data-bs-toggle="collapse"
                                  onClick={() => {
                                    handdleAccordion(index);
                                  }}
                                  style={{ zIndex: "1" }}
                                >
                                  <img
                                    src={expand[index] ? chevron : chevronUp}
                                    alt="arrow-up"
                                  />
                                </button>
                                <div className="togel_line"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
