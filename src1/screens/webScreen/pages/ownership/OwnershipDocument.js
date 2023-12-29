import React from "react";
import rightmark from "../../../../assets/web-img/rightmark.svg";
import {
  adminDocumentList,
  documentList,
  propertyDocUpload,
  propertyDocUploadbyAdmin,
} from "../../../../Devlopment/property";
import PropTypes from "prop-types";
import { DocSuccessForWeb } from "../../../../component/docStutes";
import { FileUploadForWeb } from "../../../../component/fileUpload";
import right from "../../../../assets/img/Frame-right.png";
import { Backdrop, CircularProgress } from "@mui/material";

const OwnershipDocument = ({ id, admin, userId }) => {
  const [propertyDocList, setPropertyDocList] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const PropertyDocs = {
    landlord_insurance: null,
    mortgage_statement_or_offer: null,
  };
  var lengths =
    propertyDocList?.documentDetail &&
    Object.values(propertyDocList?.documentDetail).filter((i) => i == null);
  var ducPendingLength = lengths?.length;

  var length =
    propertyDocList?.documentDetail &&
    Object.values(propertyDocList?.documentDetail).filter((i) => i);
  var ducSuccessLength = length?.length;

  var lengthstatic =
    PropertyDocs && Object.values(PropertyDocs).filter((i) => i);
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
    response.success && setPropertyDocList(response.data);
    setOpen(false);
  };

  const handleUploadDoc = async (event) => {
    setOpen(true);
    const payload = {
      property_id: id,
      ...event,
      id: admin ? userId : null,
    };
    admin
      ? await propertyDocUploadbyAdmin(payload)
      : await propertyDocUpload(payload);
    getDocumentList();
    setOpen(false);
  };
  return (
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
          {ducPendingLength == undefined ? "2" : ducPendingLength}
        </span>
      </div>
      <div className="tab_body prop_location_accordian fithfi">
        <div className="onetofor">
          <div className="flexdi wdsventy">
            {ducPendingLength == 0 ? (
              <p className="lineonetoforsuccess"></p>
            ) : ducPendingLength == undefined ? (
              <>
                <p className="lineonetofornull"></p>
              </>
            ) : ducPendingLength == 2 ? (
              <>
                <p className="lineonetofornull"></p>
              </>
            ) : (
              <>
                <p className="lineonetoforone"></p>
                <p className="lineonetoforfor"></p>
              </>
            )}
          </div>
          <span className="ftwight ftsiz">
            {" "}
            {propertyDocList?.documentDetail == null
              ? "0/2"
              : ducSuccessLength == 2
              ? "2/2"
              : ducSuccessLength == undefined
              ? "0/2"
              : ducSuccessLength == 0
              ? "0/2"
              : "1/2"}
          </span>
          <span>
            <img src={rightmark} />
          </span>
        </div>

        <div className="doc_needReupdating">
          <div className=" ftwight ">
            {ducPendingLength == 0
              ? ""
              : ducPendingLength == undefined
              ? ""
              : `${ducPendingLength} Document yet to be updated`}
          </div>
          <div className="pro_per mt-4 doc_updating_wr">
            {propertyDocList?.documentDetail == null
              ? PropertyDocs &&
                Object.keys(PropertyDocs)
                  .filter((i) => PropertyDocs[i] == null)
                  .map((item) => (
                    <FileUploadForWeb
                      key={item}
                      name={item}
                      onChange={handleUploadDoc}
                    />
                  ))
              : propertyDocList.documentDetail &&
                Object.keys(propertyDocList?.documentDetail)
                  .filter((i) => propertyDocList?.documentDetail[i] == null)
                  .map((item) => (
                    <FileUploadForWeb
                      key={item}
                      name={item}
                      onChange={handleUploadDoc}
                    />
                  ))}
          </div>
        </div>
        <div className="doc_needReupdating">
          <div className="updtedocumentyet ftwight">
            {propertyDocList?.documentDetail == null
              ? ducSuccessLengthstatic
              : ducSuccessLength}{" "}
            Document successfully updated
          </div>
          {propertyDocList.documentDetail &&
            Object.keys(propertyDocList?.documentDetail)
              .filter((i) => propertyDocList?.documentDetail[i] !== null)
              .map((item) => (
                <>
                  <DocSuccessForWeb
                    key={item}
                    text={item}
                    handleChange={handleUploadDoc}
                    status={right}
                    newName={propertyDocList?.documentDetail[item]}
                    expiredoc={propertyDocList?.documentExpiry}
                    test={
                      propertyDocList?.documentExpiry[`${item}_expiry_date`]
                    }
                    onChange={handleUploadDoc}
                  />
                </>
              ))}
          {/* <div className="upload_btns mb-5">
            <a style={{ position: "relative" }} href="#">
              <img src={doc_upload} />
              Mortage Statement
              <img src={doc_done} />
              <p className="ftwight expaug bblkg">Expiring 30 Jun 2024</p>
            </a>
          </div> */}
        </div>
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
  );
};
OwnershipDocument.propTypes = {
  id: PropTypes.string,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default OwnershipDocument;
