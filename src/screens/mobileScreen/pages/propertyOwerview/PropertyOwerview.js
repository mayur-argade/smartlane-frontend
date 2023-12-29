import React, { useContext } from "react";
import "../../../../assets/css/style.css";
import { HeaderForMobile } from "../../../../component/header/Header";
import mbtogel from "../../../../assets/img/mb-togel.svg";
import group from "../../../../assets/img/Group 201.svg";
import leftarrow from "../../../../assets/img/leftarrow.svg";
import vectore from "../../../../assets/img/Vector (2).svg";
import { PropertyList } from "../propertyExpanded/context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { documentList, propertDetail } from "../../../../Devlopment/property";
import { formatNumber } from "../../../../util/commonFunction";
import DoughnutChart from "../../../Charts/doughnutChart";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const PropertyOwerview = () => {
  const [propertyData, setPropertyData] = React.useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useContext(PropertyList);
  const allData = data;
  const [newId, setNewId] = React.useState(
    allData?.findIndex((x) => x?.property_id == id || 0)
  );
  const [propertyDocList, setPropertyDocList] = React.useState();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    getPropertyDetails();
    getPropertyDoclist();
  }, [newId]);

  const handlePropertyChangeNext = (event) => {
    event.preventDefault();
    setNewId(newId + 1);
    navigate(`/property-list/${allData[newId + 1]?.property_id}`);
    if (currentIndex < allData?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePropertyChangePrev = (event) => {
    event.preventDefault();
    setNewId(newId - 1);
    navigate(`/property-list/${allData[newId - 1]?.property_id}`);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getPropertyDoclist = async () => {
    const payload = {
      property_id: allData[newId]?.property_id || id,
    };
    const response = await documentList(payload);
    response.success && setPropertyDocList(response.data);
  };

  const getPropertyDetails = async () => {
    const payload = {
      id: allData[newId]?.property_id ? allData[newId]?.property_id : id,
    };
    const response = await propertDetail(payload);
    response.success && setPropertyData(response?.data);
    console.log("responseProperty" , response )
  };

  const ownershipDetails = {
    net_equity: propertyData?.property_estimate - propertyData?.debt,
    gross_monthly_income: propertyData?.gross_monthly_income,
    mortgage_payment: propertyData?.mortgage_payment,
    management_fee: propertyData?.management_fee,
    ground_rent: propertyData?.ground_rent,
    service_charge: propertyData?.service_charge,
    monthly_net_income: propertyData?.monthly_net_income,
    debt: propertyData?.debt,
    mortgage_type: propertyData?.mortgage_type,
    interest_rate: propertyData?.interest_rate,
    mortgage_provider: propertyData?.mortgage_provider,
    mortgage_expiry: propertyData?.mortgage_expiry,
    ownership_type: propertyData?.ownership_type,
    company_number: propertyData?.company_number,
    insurance_type: propertyData?.insurance_type,
    insurance_provider: propertyData?.insurance_provider,
    insurance_expiry: propertyData?.insurance_expiry,
  };

  var roilengths =
    ownershipDetails &&
    Object.values(ownershipDetails).filter((i) => i == null);
  var roilength = roilengths?.length;

  var lengthprop =
    propertyDocList?.documentDetail &&
    Object.values(propertyDocList?.documentDetail).filter((i) => i == null);
  var ducPendingLett = lengthprop?.length;

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/all-properties"
        logo={mbtogel}
        title="all properties"
        notification={true}
      />
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
                      style={{ width: "30px", paddingBottom: "10px" }}
                      src={leftarrow}
                    />
                  </a>
                )}{" "}
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
                      style={{ width: "20px", paddingBottom: "10px" }}
                      src={group}
                    />
                  </a>
                )}
              </div>
              <div className="lead_slide slideleadtwo"></div>
            </div>
          </div>
        </div>
        <div className="container py-3">
          <div className="row px-3 pb-3">
            <div className="col-8">
              <div className="property_value">
                <p>Property Value</p>
                <h2>
                  £
                  {formatNumber(
                    propertyData?.property_estimate -
                    propertyData?.debt +
                    propertyData?.debt
                  )}
                </h2>
                <div className="property_main_option">
                  <div className="property_option" style={{ width: "40%" }}>
                    <span className="balck_option"></span>
                    <p>Debt</p>
                  </div>
                  <div className="property_option" style={{ width: "60%" }}>
                    <span className="yellow_option"></span>
                    <p>Net Equity</p>
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
        </div>

        <div className="main_lead_boardd yellow_option leadboadermain">
          <div className="container py-3">
            <Link
              to={`/property-expanded/${id}`}
              state={{ status: "ownership" }}
              style={{color:"#000"}}
            >
              <div className="row px-4 pb-3">
                <h2 className="propoverh2">Ownership</h2>
              </div>
              {/* <div>sadfsd</div>
            <div>asdasd</div>
            <div>asdasd</div> */}
              {propertyDocList?.documentDetail &&
                Object.values(propertyDocList?.documentDetail) ? (
                <div>
                  {Object.values(propertyDocList?.documentDetail).filter(
                    (item) => item == null
                  ).length ? (
                    <>
                      <div className="row px-4 pb-3">
                        <div className="checktextpar">
                          <FiberManualRecordIcon fontSize="small" className="mt-1" />
                          <span className="checktextover">
                            Add <b>{roilength}</b> Information Fields
                          </span>
                        </div>
                      </div>
                      <div className="row px-4 pb-3">
                        <div className="checktextpar">
                          <FiberManualRecordIcon fontSize="small" className="mt-1" />
                          <span className="checktextover">
                            Upload or Update{" "}
                            {propertyDocList?.documentDetail == null ? (
                              <b>2 </b>
                            ) : (
                              <b>
                                {
                                  Object.values(
                                    propertyDocList?.documentDetail
                                  ).filter((item) => item == null).length
                                }{" "}
                              </b>
                            )}
                            Documents
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div>
                        <div style={{ visibility: "hidden" }}>document</div>
                        <div style={{ visibility: "hidden" }}>document</div>
                        <div style={{ visibility: "hidden" }}>document</div>
                      </div>
                    </div>
                  )}{" "}
                </div>
              ) : (
                <>
                  <div className="row px-4 pb-3">
                    <div className="checktextpar">
                      <FiberManualRecordIcon fontSize="small" className="mt-1" />
                      <span className="checktextover">
                        Add <b>{roilength}</b> Information Fields
                      </span>
                    </div>
                  </div>
                  <div className="row px-4 pb-3">
                    <div className="checktextpar">
                      <FiberManualRecordIcon fontSize="small" className="mt-1" />
                      <span className="checktextover">
                        Upload or Update{" "}
                        {propertyDocList?.documentDetail == null ? (
                          <b>2 </b>
                        ) : (
                          <b>{ducPendingLett}</b>
                        )}{" "}
                        Documents
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="vectorrightarr">
                <a>
                  <img src={vectore} width="35" />
                </a>
              </div>
            </Link>{" "}
          </div>

          <div className="main_lead_board backgimgnorepeat">
            <div className="container py-3">
              <Link
                to={`/property-expanded/${id}`}
                state={{ status: "letting" }}
                style={{color:"#000"}}
              >
                <div className="row px-4 pb-3">
                  <h2 className="propoverh2">Lettings</h2>
                </div>
                {propertyDocList?.lettingDetail &&
                  Object.values(propertyDocList?.lettingDetail) ? (
                  <div>
                    {Object.values(propertyDocList?.lettingDetail).filter(
                      (item) => item == null
                    ).length ? (
                      <div className="row px-4 pb-3">
                        <div className="checktextpar">
                          <div>
                            <FiberManualRecordIcon fontSize="small" />
                          </div>
                          <span className="checktextover">
                            Upload or Update{" "}
                            <b>
                              {
                                Object.values(
                                  propertyDocList?.lettingDetail
                                ).filter((item) => item == null).length
                              }{" "}
                            </b>
                            Documents
                          </span>
                        </div>
                      </div>
                    ) : null}{" "}
                  </div>
                ) : (
                  <div className="row px-4 pb-3" style={{color:'black'}}>
                    <div className="checktextpar">
                      <div>
                        <FiberManualRecordIcon fontSize="small" />
                      </div>
                      <span className="checktextover">
                        Upload or Update <b>5</b> Documents
                      </span>
                    </div>
                  </div>
                )}
                <div className="mt-5 vectorrightarr">
                  <a>
                    <img src={vectore} width="35" />
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOwerview;
