import React, { useContext } from "react";
import { PropertyDoc } from "./PropertyDocument";
// import Vector from "../../../../assets/img/Vector.png";
import right from "../../../../assets/img/Frame-right.png";
import { FileUploadForWeb } from "../../../../component/fileUpload";
import { propertyDocUpload } from "../../../../Devlopment/property";
import { DocSuccessForWeb } from "../../../../component/docStutes";

const Letting = () => {
  // const { lettingDetail, id } = useContext(PropertyDoc);
  const ddd = useContext(PropertyDoc);
  const lettingDetail = ddd && ddd?.propertyDocList?.lettingDetail;
  const id = ddd && ddd?.propertyDocList?.id;
  const getDocumentList = ddd && ddd?.getDocumentList;
  var length = lettingDetail && Object.values(lettingDetail).filter((i) => i);
  var ducSuccessLength = length?.length;

  var lengths =
    lettingDetail && Object.values(lettingDetail).filter((i) => i == null);
  var ducPendingLength = lengths?.length;

  const LettingDoc = {
    tenancy_aggrement: null,
    term_of_business: null,
  };

  var lengthstatic = LettingDoc && Object.values(LettingDoc).filter((i) => i);
  var ducSuccessLengthstatic = lengthstatic?.length;

  var lengthstatics =
    LettingDoc && Object.values(LettingDoc).filter((i) => i == null);
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
      <div id="menu1" className="tab-pane">
        <div className="">
          <div className="ain_lead_board">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="file_upldfrm pt-5">
                    <p className="propdoc-input-container">
                      {lettingDetail == null
                        ? ducPendingLengthstatic
                        : ducPendingLength}{" "}
                      Document yet to be uploaded
                    </p>

                    <form
                      className="propdoc-disp-flex "
                      action="/action_page.php"
                    >
                      {lettingDetail == null
                        ? Object.keys(LettingDoc)
                            .filter((i) => LettingDoc[i] == null)
                            .map((item) => (
                              <FileUploadForWeb
                                key={item}
                                name={item}
                                onChange={handleUploadDoc}
                              />
                            ))
                        : Object.keys(lettingDetail)
                            .filter((i) => lettingDetail[i] == null)
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
        <div className="welcome_mwain">
          <div className="main_leawd_board">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <p className="propdoc-input-container mt-1">
                    {lettingDetail == null
                      ? ducSuccessLengthstatic
                      : ducSuccessLength}{" "}
                    Documents successfuly uploaded
                  </p>
                  <div className="file_upld_frm pt-5">
                    <form
                      className="propdoc-disp-flex propdocmargintop"
                      action=""
                    >
                      {lettingDetail &&
                        Object.keys(lettingDetail)
                          .filter((i) => lettingDetail[i] !== null)
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
      </div>
    </React.Fragment>
  );
};

export default Letting;
