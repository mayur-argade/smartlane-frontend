import React, { useContext } from "react";
import { PropertyDoc } from "./PropertyDocument";
// import Vector from "../../../../assets/img/Vector.png";
import right from "../../../../assets/img/Frame-right.png";
import { FileUploadForWeb } from "../../../../component/fileUpload";
import { DocSuccessForWeb } from "../../../../component/docStutes";
import { propertyDocUpload } from "../../../../Devlopment/property";

const Property = () => {
  const ddd = useContext(PropertyDoc);
  const documentDetail = ddd && ddd?.propertyDocList?.documentDetail;
  const id = ddd && ddd?.propertyDocList?.id;
  const getDocumentList = ddd && ddd?.getDocumentList;

  var length = documentDetail && Object.values(documentDetail).filter((i) => i);
  var ducSuccessLength = length?.length;

  var lengths =
    documentDetail && Object.values(documentDetail).filter((i) => i == null);
  var ducPendingLength = lengths?.length;

  const PropertyDocs = {
    building_insurance: null,
    electrical_report: null,
    gas_certificate: null,
    land_registration: null,
    landlord_insurance: null,
    mortgage_statement_or_offer: null,
    portable_appliance_testing: null,
  };

  var lengthstatic =
    PropertyDocs && Object.values(PropertyDocs).filter((i) => i);
  var ducSuccessLengthstatic = lengthstatic?.length;

  var lengthstatics =
    PropertyDocs && Object.values(PropertyDocs).filter((i) => i == null);
  var ducPendingLengthstatic = lengthstatics?.length;

  const handleUploadDoc = async (event) => {
    const payload = {
      property_id: id,
      [event.target?.name]: event?.target?.files[0],
    };
    await propertyDocUpload(payload);
    getDocumentList();
  };

  return (
    <React.Fragment>
      <div id="home" className="tab-pane active">
        <div className="tb_body">
          <div className="">
            <div className="main_lea_board">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="pld_frm pt-5">
                      <p className="propdoc-input-container">
                        {documentDetail == null
                          ? ducPendingLengthstatic
                          : ducPendingLength}{" "}
                        Document yet to be uploaded
                      </p>
                      <form className="propdoc-disp-flex" action="">
                        {documentDetail == null
                          ? Object.keys(PropertyDocs)
                              .filter((i) => PropertyDocs[i] == null)
                              .map((item) => (
                                <FileUploadForWeb
                                  key={item}
                                  name={item}
                                  onChange={handleUploadDoc}
                                />
                              ))
                          : Object.keys(documentDetail)
                              .filter((i) => documentDetail[i] == null)
                              .map((item) => (
                                <FileUploadForWeb
                                  key={item}
                                  name={item}
                                  onChange={handleUploadDoc}
                                />
                              ))}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="file_upld_frm pt-5">
                      <p className="propdoc-input-container">
                        2 Documents need updating
                      </p>
                      <form className="propdoc-disp-flex" action=" ">
                        <DocSuccessForWeb
                          text="Landlord Insurance"
                          handleChange={handleUploadDoc}
                          status={alert}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="file_upld_frm pt-5">
                      <p className="propdoc-input-container">
                        {documentDetail == null
                          ? ducSuccessLengthstatic
                          : ducSuccessLength}{" "}
                        Documents successfuly uploaded
                      </p>

                      <form className="propdoc-disp-flex" action="">
                        {documentDetail &&
                          Object.keys(documentDetail)
                            .filter((i) => documentDetail[i] !== null)
                            .map((item) => (
                              <DocSuccessForWeb
                                key={item}
                                text={item}
                                handleChange={handleUploadDoc}
                                status={right}
                              />
                            ))}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="welcome_=-main">
            <div className="main_lead_b=-oard">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="file_upld_frm pt-5">
                      <form
                        className="propdoc-disp-flex propdocmargintop"
                        action=""
                      ></form>
                    </div>
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

export default Property;
