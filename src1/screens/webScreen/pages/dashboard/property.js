import React from "react";
import PropTypes from "prop-types";
import home from "../../../../assets/web-img/home.png";
import { Link } from "react-router-dom";
import tabhead3 from "../../../../assets/web-img/tab_head3.svg";
import { propertDetail } from "../../../../Devlopment/property";
import DoughnutChart from "../../../Charts/doughnutChart";
import arrow from "../../../../assets/web-img/Location Icon-arrow.png";
import setting from "../../../../images/setting.svg";
import settingwhite from "../../../../images/settingwhite.svg";
import { formatNumber } from "../../../../util/commonFunction";

const Property = ({ id, image }) => {
  const [propertyData, setPropertyData] = React.useState();
  React.useEffect(() => {
    getPropertyDetails();
  }, [id]);
  const getPropertyDetails = async () => {
    const payload = {
      id: id,
    };
    const response = await propertDetail(payload);
    response.success && setPropertyData(response?.data[0]);
  };

  return (
    <React.Fragment>
      <div className="col-md-4 pl-0" style={{ paddingRight: "0" }}>
        <div className="tab_head justify-content-start">
          {image ? (
            <img src={tabhead3} className="ms-3" />
          ) : (
            <Link to="/dashboard">
              <img
                src={arrow}
                alt="home"
                className="ms-3"
                style={{ borderRadius: "50%", backgroundColor: "#000" }}
              />
            </Link>
          )}
          <h5 className="text-white">{propertyData && propertyData.address}</h5>
        </div>
        <div className="tab_body prop_location_accordian">
          <div className="home_img_wr">
            <img src={home} alt="home" style={{ width: "100%" }} />
            {!image ? (
              <span>
                <img
                  src={settingwhite}
                  className="img-fluid"
                  alt="home"
                  width="40"
                  style={{
                    marginTop: "-50px",
                    marginRight: "15px",
                    backgroundColor: "#000",
                    float: "right",
                    position: "relative",
                    padding: "7px",
                    borderRadius: "50%",
                  }}
                />
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-md-7">
              <div className="prop_value" style={{ textAlign: "center" }}>
                <div>Property Value</div>
                <div className="value">
                  £{formatNumber(propertyData?.net_equity + propertyData?.debt)}
                </div>
                <div className="debt_net" style={{ justifyContent: "center" }}>
                  <span>
                    <span className="color_div blackDiv"></span>
                    <span>Debt</span>
                  </span>
                  <span>
                    <span className="color_div yellowDiv"></span>
                    <span>Net Equity </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <DoughnutChart
                data={{
                  Roi: 155,
                  data: [
                    {
                      name: "Debt",
                      value:
                        (propertyData?.debt /
                          (propertyData?.net_equity + propertyData?.debt)) *
                        100,
                    },
                    {
                      name: "Net Equity",
                      value:
                        (propertyData?.net_equity /
                          (propertyData?.net_equity + propertyData?.debt)) *
                        100,
                    },
                  ],
                }}
                size={100}
                label={true}
              />
            </div>
            <div className="col-12 py-4">
              <div className="view_btn">
                <Link to={"/property-document"} state={{ id: id }}>
                  <button
                    disabled={!image}
                    className={!image ? "propdoc-viewdoc-button" : ""}
                  >
                    View Documents
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-12">
              <div className="prop_address_values">
                <div className="roi">
                  ROI {propertyData && propertyData.interest_rate}
                </div>
                <div className="neq d-flex justify-content-between">
                  <span>
                    <span className="yellow_text">Net Equity</span> £
                    {formatNumber(propertyData && propertyData.net_equity)}
                  </span>
                  <span>
                    {(
                      (propertyData?.net_equity /
                        (propertyData?.net_equity + propertyData?.debt)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </div>
                <div>
                  <span className="yellow_text">Gross Monthly Income</span> £
                  {formatNumber(
                    propertyData && propertyData.gross_monthly_income
                  )}
                </div>
                <div>
                  <span className="yellow_text">Management Fee</span> £
                  {formatNumber(propertyData && propertyData.management_fee)}
                </div>
                <div>
                  <span className="yellow_text">Ground Rent</span> £
                  {formatNumber(propertyData && propertyData.ground_rent)}
                </div>
                {image ? (
                  <span className="settingimg">
                    <img
                      src={setting}
                      alt="Location Icon"
                      width="40"
                      className="imgsetting"
                    />
                  </span>
                ) : (
                  ""
                )}

                <div>
                  <span className="yellow_text">Service Charge</span> £
                  {formatNumber(propertyData && propertyData.service_charge)}
                </div>
                <div>
                  <span>
                    <span className="yellow_text">Gross Monthly Income</span> £
                    {formatNumber(
                      propertyData?.gross_monthly_income -
                        propertyData?.mortgage_payment -
                        propertyData?.management_fee -
                        propertyData?.ground_rent -
                        propertyData?.service_charge
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Property.propTypes = {
  id: PropTypes.string,
  image: PropTypes.bool,
};

export default Property;
