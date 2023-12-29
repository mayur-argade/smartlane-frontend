import React from "react";
import PropTypes from "prop-types";
import right from "../../../../assets/img/Frame-right.png";
import {
  adminDocumentList,
  documentList,
  propertyDocUpload,
  propertyDocUploadbyAdmin,
} from "../../../../Devlopment/property";
import { FileUploadForWeb } from "../../../../component/fileUpload";
import { DocSuccessForWeb } from "../../../../component/docStutes";
import { Backdrop, CircularProgress } from "@mui/material";

const LettingDocument = ({ id, admin, userId }) => {
  const [lettingDocList, setLettingDocList] = React.useState("");
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    getDocumentList();
  }, [id, userId]);

  const LettingDocs = {
    electrical_report_eicr: null,
    portable_appliance_testing: null,
    tenancy_aggrement: null,
    term_of_business: null,
    energy_performance_epc: null,
  };

  var lengths =
    lettingDocList?.lettingDetail &&
    Object.values(lettingDocList?.lettingDetail).filter((i) => i == null);
  var ducPendingLength = lengths?.length;

  var length =
    lettingDocList?.lettingDetail &&
    Object.values(lettingDocList?.lettingDetail).filter((i) => i);
  var ducSuccessLength = length?.length;

  var lengthstatic = LettingDocs && Object.values(LettingDocs).filter((i) => i);
  var ducSuccessLengthstatic = lengthstatic?.length;

  React.useEffect(() => {
    getDocumentList();
  }, [id, userId]);

  const getDocumentList = async () => {
    setOpen(true);
    const payload = { property_id: id, id: userId };
    const response = admin
      ? await adminDocumentList(payload)
      : await documentList(payload);
    response.success && setLettingDocList(response.data);
    setOpen(false);
  };
  const handleUploadDoc = async (data) => {
    setOpen(true);
    const payload = {
      property_id: id,
      ...data,
      id: admin ? userId : null,
      // [event.target?.name]: event?.target?.files[0],
    };
    admin
      ? await propertyDocUploadbyAdmin(payload)
      : await propertyDocUpload(payload);
    getDocumentList();
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className="col-md-4 pl-0">
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
            {ducPendingLength == undefined ? "5" : ducPendingLength}
          </span>
        </div>
        <div className="tab_body prop_location_accordian fithfi">
          <div className="basl">
            <div className="flexdi wdsventy">
              <div className="progress-bar-container">
                <div
                  className={
                    lettingDocList?.documentDetail == null
                      ? "progress-bar"
                      : ducSuccessLength == 5
                      ? "progress-bar7"
                      : ducSuccessLength == 0
                      ? "progress-bar"
                      : ducSuccessLength == 1
                      ? "progress-bar1"
                      : ducSuccessLength == 2
                      ? "progress-bar2"
                      : ducSuccessLength == 3
                      ? "progress-bar3"
                      : ducSuccessLength == 4
                      ? "progress-bar4"
                      : "progress-bar6"
                  }
                ></div>
                <div className="progress-bar blacks"></div>
              </div>
            </div>
            <span className="ftwight ftsiz">
              {lettingDocList?.documentDetail == null
                ? "0/5"
                : ducSuccessLength == 5
                ? "5/5"
                : ducSuccessLength == 0
                ? "0/5"
                : ducSuccessLength == 1
                ? "1/5"
                : ducSuccessLength == 2
                ? "2/5"
                : ducSuccessLength == 3
                ? "3/5"
                : ducSuccessLength == 4
                ? "4/5"
                : "0/5"}
            </span>
          </div>

          <div className="doc_needReupdating">
            <div className="ftwight updtedocumentyet">
              {lettingDocList?.lettingDetail == null
                ? `${ducSuccessLengthstatic} Document yet to be updated`
                : ducPendingLength == 0
                ? ""
                : `${ducPendingLength} Document yet to be updated`}
            </div>

            <div className="pro_per mt-4 doc_updating_wr">
              {lettingDocList?.lettingDetail == null
                ? LettingDocs &&
                  Object.keys(LettingDocs)
                    .filter((i) => LettingDocs[i] == null)
                    .map((item) => (
                      <FileUploadForWeb
                        key={item}
                        name={item}
                        onChange={handleUploadDoc}
                      />
                    ))
                : lettingDocList.lettingDetail &&
                  Object.keys(lettingDocList?.lettingDetail)
                    .filter((i) => lettingDocList?.lettingDetail[i] == null)
                    .map((item) => (
                      <FileUploadForWeb
                        key={item}
                        name={item}
                        onChange={handleUploadDoc}
                      />
                    ))}
            </div>

            <div className="doc_needReupdating">
              <div className="ftwight updtedocumentyet">
                {lettingDocList?.lettingDetail == null
                  ? ducSuccessLengthstatic
                  : ducSuccessLength}{" "}
                Document successfully updated
              </div>
              {/* <div
                className="accordion accordion-flush mb-3"
                id="accordionFlushExample"
              >
                <div className="accordion-item newclass">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      style={{
                        backgroundColor: "#F9D75D",
                        height: "70px",
                        borderRadius: "10px",
                        fontSize: "20px",
                        fontWeight: "400",
                        display: "flex",
                        alignItems: "center",
                        outline: "none",
                        justifyContent: "space-between",
                        boxShadow: "none",
                      }}
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <span>
                        <img src={alertingicon} />
                      </span>
                      <span className="ms-4">Monthly Statements</span>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  ></div>
                </div>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="mt-3">
                    <div className="upload_btns mb-3">
                      <a href="#">
                        <img src={doc_upload} />
                        May 2023 Statement
                        <img src={doc_done} />
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
              {lettingDocList.lettingDetail &&
                Object.keys(lettingDocList?.lettingDetail)
                  .filter((i) => lettingDocList?.lettingDetail[i] !== null)
                  .map((item) => (
                    <>
                      <DocSuccessForWeb
                        key={item}
                        text={item}
                        handleChange={handleUploadDoc}
                        status={right}
                        newName={lettingDocList?.lettingDetail[item]}
                        expiredoc={lettingDocList?.lettingExpiry}
                        test={
                          lettingDocList?.lettingExpiry[`${item}_expiry_date`]
                        }
                        onChange={handleUploadDoc}
                      />
                    </>
                  ))}{" "}
            </div>
          </div>
        </div>
      </div>{" "}
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
    </React.Fragment>
  );
};
LettingDocument.propTypes = {
  id: PropTypes.string,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default LettingDocument;
