import React, { useContext, useMemo } from "react";
import "../../../../assets/css/web.css";
import tabhead3 from "../../../../assets/web-img/tab_head3.svg";
import group from "../../../../assets/img/Group 201.svg";
import EastIcon from '@mui/icons-material/East';
import {
  Monthlyvaluation,
  adminDocumentList,
  documentList,
  propertDetail,
  propertDetailforAdmin,
} from "../../../../Devlopment/property";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../util/commonFunction";
import leftarrow from "../../../../assets/web-img/Left arrow (2).svg";
// import zigzagarrow from "../../../../assets/web-img/zigzagarrow.svg";
// import redarrow from "../../../../assets/web-img/redarrow.svg";
import { PropertyContext } from "../../../../context";
import deleteimg from "../../../../assets/web-img/dustbin.svg";
import leftarrows from "../../../../assets/img/leftarrow.svg";
import DoughnutChart from "../../../Charts/doughnutChart";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const PropertyDetails = ({
  id,
  image,
  letting,
  admin,
  deleteAlert,
  onPropertyChange,
  tourown,
  tourlett,
  propertyactive,
}) => {
  const data = useContext(PropertyContext);
  const property = data?.propertyData;
  const [propertyData, setPropertyData] = React.useState();
  const [propertyDocList, setPropertyDocList] = React.useState();
  const [newId, setNewId] = React.useState();
  useMemo(() => {
    setNewId(property?.findIndex((x) => x?.property_id == id) || 0);
  }, [id]);

  React.useEffect(() => {
    getPropertyDetails();
    getPropertyDoclist();
    onPropertyChange && onPropertyChange(property[newId]?.property_id);
    propertyactive && propertyactive(property[newId]?.property_id);
  }, [newId, id]);

  React.useEffect(() => {
    Monthlyvaluations();
  }, []);
  const getPropertyDoclist = async () => {
    const payload = {
      property_id: property[newId]?.property_id || id,
      id: admin && property[newId]?.userId,
    };
    const response = admin
      ? await adminDocumentList(payload)
      : await documentList(payload);
    response.success && setPropertyDocList(response.data);
  };
  const getPropertyDetails = async () => {
    const payload = {
      id: property[newId]?.property_id || id,
      userId: admin && property[newId]?.userId,
    };
    const response =
      (admin &&
        payload.id &&
        payload.userId &&
        (await propertDetailforAdmin(payload))) ||
      (!admin && payload.id && (await propertDetail(payload)));
    setPropertyData(response?.data || []);
    console.log("proprtyDeteils" , (response?.data) )
    console.log("propertyData?.property_estimate" , propertyData?.property_estimate)
    
    
  };

  const handlePropertyChangeNext = (event) => {
    event.preventDefault();
    setNewId(newId + 1);
  };
  const handlePropertyChangePrev = (event) => {
    event.preventDefault();
    setNewId(newId - 1);
  };

  const Monthlyvaluations = async () => {
    const payload = {
      propertyIDS: [property[newId]?.property_id || id],
    };
    const response = await Monthlyvaluation(payload);
    console.log(response);
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

  var lengths =
    propertyDocList?.documentDetail &&
    Object.values(propertyDocList?.documentDetail).filter((i) => i == null);
  var ducPendingLength = lengths?.length;

  var lengthslett =
    propertyDocList?.lettingDetail &&
    Object.values(propertyDocList?.lettingDetail).filter((i) => i == null);
  var ducPendingLett = lengthslett?.length;


  React.useEffect(() => {
    const getPropertyDetailsPeriodically = async () => {
      try {
        await getPropertyDetails();
        console.log('getPropertyDetails called successfully');
        setTimeout(getPropertyDetailsPeriodically, 7000);
      } catch (error) {
        console.error('Error calling getPropertyDetails', error);
        setTimeout(getPropertyDetailsPeriodically, 7000);
      }
    };

    getPropertyDetailsPeriodically();

    return () => clearTimeout(getPropertyDetailsPeriodically);
  }, []);


  return (
    <div className="col-md-4 pl-0">
      {propertyData && (
        <>
          {!image ? (
            <div className="tab_head tabheadstwo">
              <Link to={"/dashboard"}>
                <img src={leftarrow} />
              </Link>
              <h5>All Properties</h5>
            </div>
          ) : (
            <div className="tab_head">
              <img src={tabhead3} className="ms-3" />
              <h5 style={{ color: "#fff" }}>
                {propertyData &&
                  propertyData?.address ?.match(/^[^,]+/)?.[0]
                  ?.trim()}
              </h5>
            </div>
          )}

          {admin && deleteAlert && (
            <div>
              <button
                className="delprop bwhiteg mt-4"
                onClick={() => {
                  deleteAlert(propertyData?.property_id);
                }}
              >
                <div className="ftwight ftsiz flexdi delpropchild">
                  Delete Property
                  <a href="">
                    <img src={deleteimg} />
                  </a>
                </div>
              </button>
            </div>
          )}
          <div className="tab_body prop_location_accordian fithfi">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="property_top topProperty">
                    {newId > 0 && (
                      <a className="prevbtn" onClick={handlePropertyChangePrev}>
                        <img
                          className="widthhundererd"
                          style={{ width: "30px", paddingBottom: "10px" }}
                          src={leftarrows}
                        />
                      </a>
                    )}
                    <p className="fonttwenty propertyname txtcent">
                      {propertyData &&
                        propertyData?.address
                        ?.match(/^[^,]+/)?.[0]
                        ?.trim()}
                          
                      &nbsp;
                      {propertyData && propertyData?.property_name} 
                    </p>
                    {newId + 1 < property.length && (
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

            <div className="row">
              {letting ? (
                <div style={{ paddingLeft: "55px" }} className="col-md-7">
                  Net Monthly Income
                  <div className="topProperty gapfifteen">
                    <h2 className="ftwight fourtyfontsize">
                      £{formatNumber(propertyData?.monthly_net_income)}{" "}
                    </h2>
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-md-7 plfivefive">
                    <div className="prop_value">
                      <div>Property Value</div>
                      <div className="value">
                        {" "}
                        £
                        {formatNumber(
                          propertyData?.property_estimate -
                          propertyData?.debt +
                          propertyData?.debt
                        )}
                      </div>
                      <div className="debt_net" style={{ width: "125%" }}>
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
                </>
              )}

              {!image ? (
                <div className="col-12 pt-5">
                  <div
                    style={{
                      borderRadius: "16px 16px 0px 0px",
                      color: "#fff",
                      paddingBottom: "10px",
                    }}
                    className="main_lead_boardd leadboadermains ownershov brderRdius"
                  >
                    <div className="container py-3">
                      <div className="row px-4 pb-3">
                        <h2 className="propoverh2">Ownership</h2>
                      </div>
                      {propertyDocList?.documentDetail &&
                        Object.values(propertyDocList?.documentDetail) ? (
                        <div className="row px-4 pb-3">
                          {Object.values(
                            propertyDocList?.documentDetail
                          ).filter((item) => item == null).length ? (
                            <>
                              <div className="checktextpar">
                                <FiberManualRecordIcon fontSize="small" className="mt-1" />
                                <span className="checktextover">
                                  Add <b>{roilength}</b> Information Fields
                                </span>
                              </div>

                              <div className="checktextpar">
                                <FiberManualRecordIcon fontSize="small" className="mt-1" />
                                <span className="checktextover">
                                  Upload or Update{" "}
                                  <b>
                                    {
                                      Object.values(
                                        propertyDocList?.documentDetail
                                      ).filter((item) => item == null).length
                                    }{" "}
                                  </b>
                                  Documents
                                </span>
                              </div>
                            </>
                          ) : null}{" "}
                        </div>
                      ) : (
                        <div className="row px-4 pb-3">
                          <div className="checktextpar">
                            <FiberManualRecordIcon fontSize="small" className="mt-1" />
                            <span className="checktextover">
                              Add <b>{roilength}</b> Information Fields
                            </span>
                          </div>

                          <div className="checktextpar">
                            <FiberManualRecordIcon fontSize="small" className="mt-1" />
                            <span className="checktextover">
                              Upload or Update{" "}
                              {propertyDocList?.documentDetail == null ? (
                                <b>2 </b>
                              ) : (
                                <b>
                                  {ducPendingLength == undefined
                                    ? "0"
                                    : ducPendingLength}{" "}
                                </b>
                              )}
                              Documents
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="vectorrightarr">
                        <a>
                          <Link
                            to={"/ownership"}
                            state={{
                              id: property[newId]?.property_id || id,
                              userId: property[newId]?.userId,
                            }}
                            className="text-black"
                          >
                            <EastIcon fontSize="large" color="#000" />
                          </Link>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="main_lead_board backgimgnorepeats onlethov"
                    style={{
                      borderRadius: "16px 16px 0px 0px",
                      color: "#fff",
                      marginTop: "-12px",
                    }}
                  >
              
                    <div className="container py-3">
                      <div className="row px-4 pb-3">
                        <h2 className="propoverh2">Lettings</h2>
                      </div>
                      <div className="row px-4 pb-3">
                        <div className="checktextpar">
                          <div>
                            <FiberManualRecordIcon fontSize="small" className="mt-1" />
                          </div>
                          <span className="checktextover">
                            Upload or Update{" "}
                            {propertyDocList?.lettingDetail == null ? (
                              <b>5 </b>
                            ) : (
                              <b>
                                {ducPendingLett == undefined
                                  ? "0"
                                  : ducPendingLett}{" "}
                              </b>
                            )}
                            Documents
                          </span>
                        </div>
                      </div>
                      <div className="mt-5 vectorrightarr">
                        <a>
                          <Link
                            to={"/letting"}
                            state={{
                              id: property[newId]?.property_id || id,
                              letting: true,
                              userId: property[newId]?.userId,
                            }}
                            className="text-black"
                          >
                            <EastIcon fontSize="large" color="#000" />
                          </Link>
                        </a>
                      </div>
                    </div>
                  
                   
                  </div>
                </div>
              ) : (
                <div className="col-12 pt-5">
                  <div
                    style={{
                      borderRadius: "16px 16px 0px 0px",
                      color: "#000",
                      backgroundColor: "#f9d75d",
                    }}
                    className="main_lead_boardd yellow_option leadboadermain"  >
                    <Link to={"/ownership"}
                              state={{
                                id: property[newId]?.property_id || id,
                                userId: property[newId]?.userId,
                              }}>
                                 <div className={tourown}>
                      <div className="container py-3" style={{color:'black'}} >
                        <div className="row px-4 pb-3">
                          <h2 className="propoverh2" style={{color:'black'}}>Ownership</h2>
                        </div>
                        {propertyDocList?.documentDetail &&
                          Object.values(propertyDocList?.documentDetail) ? (
                          <div className="row px-4 pb-3">
                            {Object.values(
                              propertyDocList?.documentDetail
                            ).filter((item) => item == null).length ? (
                              <>
                                <div className="checktextpar" style={{color:'black'}}>
                                  <FiberManualRecordIcon fontSize="small" className="mt-1" />
                                  <span className="checktextover">
                                    Add <b>{roilength}</b> Information Fields
                                  </span>
                                </div>

                                <div className="checktextpar" style={{color:'black'}}>
                                  <FiberManualRecordIcon fontSize="small" className="mt-1" />
                                  <span className="checktextover">
                                    Upload or Update{" "}
                                    {propertyDocList?.documentDetail == null ? (
                                      <b >2</b>
                                    ) : (
                                      <b>
                                        {
                                          Object.values(
                                            propertyDocList?.documentDetail
                                          ).filter((item) => item == null)
                                            .length
                                        }{" "}
                                      </b >
                                    )}
                                    Documents
                                  </span>
                                </div>
                              </>
                            ) : null}{" "}
                          </div>
                        ) : (
                          <>
                            <div className="checktextpar">
                              <FiberManualRecordIcon fontSize="small" className="mt-1" />
                              <span className="checktextover" style={{color:'black'}}>
                                Add <b>{roilength}</b> Information Fields
                              </span>
                            </div>

                            <div className="checktextpar">
                              <FiberManualRecordIcon fontSize="small" className="mt-1" />
                              <span className="checktextover" style={{color:'black'}}>
                                Upload or Update <b>2</b> Documents
                              </span>
                            </div>
                          </>
                        )}

                        <div className="vectorrightarr">
                          <a>
                            <Link
                              to={"/ownership"}
                              state={{
                                id: property[newId]?.property_id || id,
                                userId: property[newId]?.userId,
                              }}
                              className="text-black"
                            >
                              <EastIcon fontSize="large" color="#000" style={{color:'black'}} />
                            </Link>
                          </a>
                        </div>
                      </div>
                    </div>
                              </Link>
           <div
                      className="main_lead_board backgimgnorepeat"
                      style={{
                        borderRadius: "16px 16px 0px 0px",
                        color: "#000",
                      }}
                    >
                      <Link to={"/letting"} 
                      state={{
                        id: property[newId]?.property_id || id,
                        letting: true,
                        userId: property[newId]?.userId,
                      }}
                      style={{textDecoration:'none' }}
                      >
                      <div className={tourlett} style={{color:'black' }} >
                        <div className="container py-3" >
                          <div className="row px-4 pb-3">
                            <h2 className="propoverh2" style={{color:'black'}}>Lettings</h2>
                          </div>
                          {propertyDocList?.lettingDetail &&
                            Object.values(propertyDocList?.lettingDetail) ? (
                            <div className="row px-4 pb-3">
                              {Object.values(
                                propertyDocList?.lettingDetail
                              ).filter((item) => item == null).length ? (
                                <div className="checktextpar">
                                  <div>
                                  <FiberManualRecordIcon fontSize="small" className="mt-1" style={{color:'black'}}/>
                                  </div>

                                  <span className="checktextover" style={{color:'black'}}>
                                    Upload or Update{" "}
                                    {propertyDocList?.lettingDetail == null ? (
                                      <b>5</b>
                                    ) : (
                                      <b>
                                        {
                                          Object.values(
                                            propertyDocList?.lettingDetail
                                          ).filter((item) => item == null)
                                            .length
                                        }{" "}
                                      </b>
                                    )}
                                    Documents
                                  </span>
                                </div>
                              ) : null}{" "}
                            </div>
                          ) : (
                            <div className="row px-4 pb-3">
                              <div className="checktextpar">
                                <div>
                                  <FiberManualRecordIcon fontSize="small" className="mt-1" />
                                </div>

                                <span className="checktextover">
                                  Upload or Update <b>5</b> Documents
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="mt-5 vectorrightarr">
                            <a>
                              <Link
                                to={"/letting"}
                                state={{
                                  id: property[newId]?.property_id || id,
                                  letting: true,
                                  userId: property[newId]?.userId,
                                }}
                                className="text-black"
                              >
                                <EastIcon fontSize="large" color="#000" />
                              </Link>
                            </a>
                          </div>
                        </div>
                      </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
PropertyDetails.propTypes = {
  id: PropTypes.string,
  image: PropTypes.bool,
  letting: PropTypes.bool,
  admin: PropTypes.bool,
  property: PropTypes.any,
  deleteAlert: PropTypes.any,
  onPropertyChange: PropTypes.any,
  tourown: PropTypes.string,
  tourlett: PropTypes.string,
  propertyactive: PropTypes.any,
};

export default PropertyDetails;

