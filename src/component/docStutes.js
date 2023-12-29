import React from "react";
import PropTypes from "prop-types";
import doc_uploads from "../assets/img/doc_upload.svg";
import doc_warning from "../assets/img/doc_warning.png";
import doc_warning_yellow from "../assets/img/warning-yellow.svg";
import doc_done from "../assets/img/doc_done.svg";
import doc_upload from "../assets/img/doc_upload.svg";
import "../assets/css/style.css";
import "../assets/css/web.css";
import {
  allReplace,
  formatCapilize,
  getDateDifference,
} from "../util/commonFunction";
import { GetDocuments } from "../Devlopment/property";
import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment/moment";
import docuploadwhite from "../assets/img/doc_upload_white.png";
import UploadFileModal from "./webmodal/fileUploadModal";
const DocExpired = ({ text, msg }) => {
  return (
    <React.Fragment>
      <div className="upload_btns mb-3 text-white black_bg">
        <a href="#">
          <img src={doc_uploads} />{" "}
          <span>
            <span className="text_small">
              {" "}
              {formatCapilize(allReplace(text, { _: " " }))}
            </span>
            <span> {msg} </span>
          </span>{" "}
          <img src={doc_warning} />
        </a>
      </div>
    </React.Fragment>
  );
};

const DocWarning = ({ text, msg }) => {
  return (
    <React.Fragment>
      <div className="doc_needReupdating">
        <div className="upload_btns mb-3 bg-grey">
          <a href="#">
            <img src={doc_uploads} />
            <span>
              <span className="text_small">
                {formatCapilize(allReplace(text, { _: " " }))}
              </span>
              <span>{msg}</span>
            </span>
            <img src={doc_warning_yellow} />
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};
const DocSuccess = ({ text, newName, expiredoc, onChange }) => {
  const [opens, setOpens] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  const CurrentDate = new Date();
  const newDate = moment(CurrentDate).format("YYYY-MM-DD");

  const DownloadDoc = async () => {
    setOpens(true);
    await GetDocuments(newName);
    window.location.href = `http://13.40.188.117:3002/api/getDoc/${newName}`;
    setOpens(false);
  };

  const expiry = getDateDifference(
    newDate,
    expiredoc && expiredoc[`${text}_expiry_date`]
  );
  const expireDate = moment(expiredoc[`${text}_expiry_date`]).fromNow();
  const dateShow = moment(expiredoc[`${text}_expiry_date`]).format(
    "DD MMM YYYY"
  );

  return (
    <React.Fragment>
      {expiry > 90 ? (
        <div className="upload_btns mb-3">
          <a className="text-black" onClick={() => DownloadDoc()}>
            <img src={doc_uploads} />{" "}
            <label
              style={{
                width: "78%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {formatCapilize(
                allReplace(
                  text == "electrical_report_eicr"
                    ? "electrical_report_(EICR)"
                    : text == "energy_performance_epc"
                    ? "energy_performance_(EPC)"
                    : text,
                  { _: " " }
                )
              )}
            </label>{" "}
            <img src={doc_done} />
          </a>
        </div>
      ) : expiry <= 90 ? (
        <div className="doc_needReupdating">
          <div className="upload_btns mb-3 bg-grey">
            <a onClick={() => DownloadDoc()}>
              <img src={docuploadwhite} />
              <span style={{ position: "relative" }}>
                <span className="text_small" style={{ fontSize: "16px" }}>
                  {formatCapilize(allReplace(text, { _: " " }))}
                </span>
                <p
                  style={{
                    position: "absolute",
                    top: "-13px",
                    fontSize: "12px",
                    width: "160%",
                    marginLeft: "-30px",
                  }}
                >
                  Expiring {dateShow}({expireDate})
                </p>
              </span>
              <img src={doc_warning_yellow} />
            </a>
          </div>
        </div>
      ) : (
        <>
          <UploadFileModal
            open={open}
            close={handleModal}
            handleUpload={onChange}
            name={text}
          />
          <div className="pro_per mt-4 doc_updating_wr" onClick={handleModal}>
            <div
              className="prop_addOrEdit text-center"
              style={{ backgroundColor: "#000" }}
            >
              <a className="text-white file-upload">
                <span className="icon">
                  <img src={docuploadwhite} />
                </span>
                <span>
                  {" "}
                  {formatCapilize(
                    allReplace(
                      text == "electrical_report_eicr"
                        ? "electrical_report_(EICR)"
                        : text == "energy_performance_epc"
                        ? "energy_performance_(EPC)"
                        : text,
                      { _: " " }
                    )
                  )}{" "}
                </span>
                <span className="warnig_icon mb-2">
                  <img
                    src={doc_warning}
                    style={{ float: "right", margin: "-7px" }}
                  />
                </span>
                <p
                  className="ftwights"
                  style={{
                    position: "absolute",
                    top: "5px",
                    fontSize: "12px",
                    width: "100%",
                    marginLeft: "-30px",
                  }}
                >
                  Expired {dateShow}( {expireDate})
                </p>
              </a>
            </div>
          </div>
        </>
        // <div className="upload_btns mb-3 text-white black_bg">
        //   <a href="#">
        //     <img src={doc_uploads} />{" "}
        //     <span>
        //       <span className="text_small">
        //         {" "}
        //         {formatCapilize(allReplace(text, { _: " " }))}
        //       </span>
        //       {/* <span> {msg} </span> */}
        //     </span>{" "}
        //     <img src={doc_warning} />
        //   </a>
        // </div>
      )}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={opens}
        onClick={() => setOpens(false)}
      >
        <CircularProgress style={{ color: "#F9D75D" }} />
      </Backdrop>
    </React.Fragment>
  );
};
const DocSuccessForWeb = ({ text, newName, expiredoc, onChange }) => {
  const [opens, setOpens] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  const CurrentDate = new Date();
  const newDate = moment(CurrentDate).format("YYYY-MM-DD");

  const DownloadDoc = async () => {
    setOpens(true);
    await GetDocuments(newName);
    window.location.href = `http://13.40.188.117:3002/api/getDoc/${newName}`;
    setOpens(false);
  };
  const expiry = getDateDifference(newDate, expiredoc[`${text}_expiry_date`]);
  const expireDate = moment(expiredoc[`${text}_expiry_date`]).fromNow();
  const dateShow = moment(expiredoc[`${text}_expiry_date`]).format(
    "DD MMM YYYY"
  );

  return (
    <React.Fragment>
      {expiry > 90 ? (
        <div className="upload_btns mb-3">
          <a
            className="text-black"
            style={{ position: "relative" }}
            onClick={() => DownloadDoc()}
          >
            <img src={doc_upload} />
            {formatCapilize(
              allReplace(
                text == "electrical_report_eicr"
                  ? "electrical_report_(EICR)"
                  : text == "energy_performance_epc"
                  ? "energy_performance_(EPC)"
                  : text,
                { _: " " }
              )
            )}
            <img src={doc_done} />
          </a>
        </div>
      ) : expiry <= 90 ? (
        <div className="upload_btns mb-3 ">
          <a className="bwhiteg landinsur" onClick={() => DownloadDoc()}>
            <img src={docuploadwhite} />{" "}
            {formatCapilize(
              allReplace(
                text == "electrical_report_eicr"
                  ? "electrical_report_(EICR)"
                  : text == "energy_performance_epc"
                  ? "energy_performance_(EPC)"
                  : text,
                { _: " " }
              )
            )}{" "}
            <img src={doc_warning_yellow} />
            <p className="ftwights bwhiteg expaug">
              Expiring {dateShow}({expireDate})
            </p>
          </a>
        </div>
      ) : (
        <>
          <UploadFileModal
            open={open}
            close={handleModal}
            handleUpload={onChange}
            name={text}
          />
          <div className="upload_btns mb-3" onClick={handleModal}>
            <div className="prop_addOrEdit padthreetwo">
              <a className="bwhiteg backg" style={{ position: "relative" }}>
                <img src={docuploadwhite} />{" "}
                {formatCapilize(
                  allReplace(
                    text == "electrical_report_eicr"
                      ? "electrical_report_(EICR)"
                      : text == "energy_performance_epc"
                      ? "energy_performance_(EPC)"
                      : text,
                    { _: " " }
                  )
                )}
                <img src={doc_warning} />
                <p
                  className="ftwights"
                  style={{
                    position: "absolute",
                    top: "5px",
                    fontSize: "12px",
                    width: "110%",
                    marginLeft: "-30px",
                  }}
                >
                  Expired {dateShow}( {expireDate})
                </p>
              </a>
            </div>
          </div>
        </>
      )}
      {/* <div className="form-group propdoc-landlordinsurancediv">
        <img className="propdoc-vectorimage" src={Vector} />
        <label
          className="propdoc-landlordlabel propdoc-commonlabel"
          style={{
            width: "60%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {formatCapilize(allReplace(text, { _: " " }))}
        </label>
        <div
          className={
            status === alert
              ? "propdoc-landlordvectotalertdiv"
              : "propdoc-greenvectordiv"
          }
        >
          {status === alert ? (
            <img src={doc_warning} width="26" />
          ) : (
            <img src={status} />
          )}
        </div>
        <input
          className="propdoc-inputmain propdoc-inputbackground form-control"
          type="file"
          name={text}
          onChange={handleChange}
        />
        <span></span>
      </div> */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={opens}
        onClick={() => setOpens(false)}
      >
        <CircularProgress style={{ color: "#F9D75D" }} />
      </Backdrop>
    </React.Fragment>
  );
};
DocExpired.propTypes = {
  text: PropTypes.string,
  msg: PropTypes.string,
};
DocWarning.propTypes = {
  text: PropTypes.string,
  msg: PropTypes.string,
};
DocSuccess.propTypes = {
  text: PropTypes.string,
  newName: PropTypes.any,
  expiredoc: PropTypes.any,
  onChange: PropTypes.any,
};
DocSuccessForWeb.propTypes = {
  text: PropTypes.string,
  handleChange: PropTypes.any,
  status: PropTypes.any,
  newName: PropTypes.any,
  expiredoc: PropTypes.any,
  test: PropTypes.any,
  onChange: PropTypes.any,
};
export { DocExpired, DocWarning, DocSuccess, DocSuccessForWeb };
