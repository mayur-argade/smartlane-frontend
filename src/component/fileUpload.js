import React from "react";
import PropTypes from "prop-types";
import doc_upload from "../assets/img/doc_upload_white.png";
import { allReplace, formatCapilize } from "../util/commonFunction";
// import file_upload from "../assets/img/file_upload.svg";
import docuploadwhite from "../assets/img/doc_upload_white.png";
import UploadFileModal from "./webmodal/fileUploadModal";

const FileUpload = ({ tital, name, onChange, image }) => {
  const [open, setOpen] = React.useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <UploadFileModal
        open={open}
        close={handleModal}
        handleUpload={onChange}
        name={name}
      />
      <div className="pro_per mt-4 doc_updating_wr" onClick={handleModal}>
        <div className="prop_addOrEdit text-center">
          <a className="text-white file-upload">
            <span className="icon">
              <img src={doc_upload} />
            </span>
            <span>
              {" "}
              {formatCapilize(
                allReplace(
                  tital == "electrical_report_eicr"
                    ? "electrical_report_(EICR)"
                    : tital == "energy_performance_epc"
                    ? "energy_performance_(EPC)"
                    : tital,
                  { _: " " }
                )
              )}{" "}
            </span>
            <span className="warnig_icon mb-2">
              <img
                src={image && image}
                style={{ float: "right", margin: "-7px" }}
              />
            </span>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

const FileUploadForWeb = ({ name, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <UploadFileModal
        open={open}
        close={handleModal}
        handleUpload={onChange}
        name={name}
      />
      <div
        className="prop_addOrEdit text-center heighteightypx"
        onClick={handleModal}
      >
        <input className="opaczero" />
        <a className="text-white">
          <span className="icon">
            <img src={docuploadwhite} />
          </span>
          <div className="martopnone">
            {formatCapilize(
              allReplace(
                name == "electrical_report_eicr"
                  ? "electrical_report_(EICR)"
                  : name == "energy_performance_epc"
                  ? "energy_performance_(EPC)"
                  : name,
                { _: " " }
              )
            )}{" "}
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string,
  tital: PropTypes.string,
  onChange: PropTypes.any,
  image: PropTypes.any,
};
FileUploadForWeb.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.any,
};

export { FileUpload, FileUploadForWeb };
