import React from "react";
import "../../../../assets/css/web.css";
import PropertyDetails from "../dashboard/propertyDetails";
import Header from "../../../../component/header/Header";
import sideop from "../../../../assets/web-img/side_op_1.svg";
import LettingDetails from "./LettingDetails";
import LettingDocument from "./LettingDocument";
import { useLocation } from "react-router-dom";
import { documentList } from "../../../../Devlopment/property";
import PropTypes from "prop-types";

const Letting = ({ admin }) => {
  // const [propertyDocList, setPropertyDocList] =S React.useState(null);

  const location = useLocation();
  const data = location?.state;
  const [propertyID, setPropertyID] = React.useState(data?.id);
  React.useEffect(() => {
    getDocumentList();
  }, []);

  const getDocumentList = async () => {
    const payload = { property_id: data?.id };
    // const response =
    await documentList(payload);
    // response.success && setPropertyDocList(response.data);
  };
  const handleChange = (id) => {
    setPropertyID();
    setPropertyID(id);
  };

  return (
    <div className="main_body">
      <Header />
      <div className="container-fluid">
        <div className="row">
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
                  <img src={sideop} />
                </div>
                <span>Portfolio</span>
              </a>
            </div>
          </div>
          <div className="col-11 pl-0">
            <div
              className="tab-content main_content_wr"
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="row">
                  {data?.id && (
                    <PropertyDetails
                      id={data?.id}
                      letting={data?.letting}
                      admin={admin ? true : false}
                      onPropertyChange={handleChange}
                    />
                  )}
                  {propertyID && (
                    <LettingDetails
                      id={propertyID}
                      admin={admin}
                      userId={data?.userId}
                    />
                  )}
                  {propertyID && (
                    <LettingDocument
                      id={propertyID}
                      admin={admin}
                      userId={data?.userId}
                    />
                  )}
                  {/* <div className="col-md-4 pl-0">
                    <div className="tab_head">
                      <h5 className="bwhiteg margright">Document Tracker</h5>
                      <span
                        className="ms-3"
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          padding: "1px 8px",
                          borderRadius: "5px",
                          fontWeight: "700",
                        }}
                      >
                        4
                      </span>
                    </div>
                    <div className="tab_body prop_location_accordian fithfi">
                      <div className="basl">
                        <div className="flexdi wdsventy">
                          <p
                            className="backg"
                            style={{
                              borderRadius: "0 16px 16px 0",
                              height: "8px",
                              width: "100%",
                            }}
                          ></p>
                        </div>
                        <span className="ftwight ftsiz">0/4</span>
                      </div>

                      <div className="doc_needReupdating">
                        <div className="ftwight updtedocumentyet">
                          1 Document yet to be uploaded
                        </div>

                        <div className="pro_per mt-4 doc_updating_wr">
                          <div className="prop_addOrEdit text-center">
                            <a className="text-white">
                              <span className="icon">
                                <img src={docuploadwhite} />
                              </span>{" "}
                              <span> Tenancy Agreement </span>
                            </a>
                          </div>
                          <div className="prop_addOrEdit text-center">
                            <a className="text-white">
                              <span className="icon">
                                <img src={docuploadwhite} />
                              </span>{" "}
                              <span> Energy Performance (EPC) </span>
                            </a>
                          </div>
                        </div>

                        <div className="doc_needReupdating">
                          <div className="ftwight updtedocumentyet">
                            2 Documents need updating
                          </div>

                          <div className="upload_btns mb-3 ">
                            <a className="bwhiteg landinsur" href="#">
                              <img src={openfile} /> Landlord Insurance{" "}
                              <img src={alert} />
                              <p className="ftwight bwhiteg expaug">
                                Expiring 19 Aug 2023 (in two weeks)
                              </p>
                            </a>
                          </div>
                          <div className="upload_btns mb-3 ">
                            <div className="prop_addOrEdit padthreetwo">
                              <a className="bwhiteg backg" href="#">
                                <img src={openfile} /> June 2023 Statement
                                <img src={doc_warning} />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="upload_btns mb-3">
                          <a href="#">
                            <img src={doc_upload} />
                            May 2023 Statement
                            <img src={doc_done} />
                          </a>
                        </div>
                        <div className="upload_btns mb-5">
                          <a href="#">
                            <img src={doc_upload} />
                            May 2023 Statement
                            <img src={doc_done} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
  );
};
Letting.propTypes = {
  admin: PropTypes.any,
};
export default Letting;
