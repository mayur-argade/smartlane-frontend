import React, { useContext } from "react";
import "../../../../assets/css/style.css";
import "../../../../assets/css/web.css";
import "./index.css";
import { FileUpload } from "../../../../component/fileUpload";
import { DocSuccess } from "../../../../component/docStutes";
import { propertyDocUpload } from "../../../../Devlopment/property";
import { allReplace, formatCapilize } from "../../../../util/commonFunction";
import { PropertyDocList } from "./PropertyDocument";
import progess_success from "../../../../assets/img/progress_success.svg";

const Property = () => {
  // const { documentDetail, id } = useContext(PropertyDocList);

  const ddd = useContext(PropertyDocList);
  const documentDetail = ddd && ddd.propertyDocList.documentDetail;
  const documentExpiry = ddd && ddd.propertyDocList.documentExpiry;
  const id = ddd && ddd.propertyDocList.id;
  const getDocumentList = ddd && ddd.getDocumentList;

  var length = documentDetail && Object.values(documentDetail).filter((i) => i);
  var ducSuccessLength = length?.length;

  var lengths =
    documentDetail && Object.values(documentDetail).filter((i) => i == null);
  var ducPendingLength = lengths?.length;
  const handleUploadDoc = async (event) => {
    const payload = {
      property_id: id,
      ...event,
      // [event.target?.name]: event?.target?.files[0],
    };
    await propertyDocUpload(payload);
    getDocumentList();
  };

  const PropertyDocs = {
    landlord_insurance: null,
    mortgage_statement_or_offer: null,
  };

  return (
    <React.Fragment>
      <div id="home" className="tab-pane active">
        <div className="doc_update_barStatus">
          <div className="progress-bar-wrap">
            {ducSuccessLength == 2 ? (
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "100%", backgroundColor: "#2FBF7A" }}
              ></div>
            ) : ducSuccessLength == 0 ? (
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "0%" }}
              ></div>
            ) : ducSuccessLength == undefined ? (
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "0%" }}
              ></div>
            ) : (
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "60%" }}
              ></div>
            )}
          </div>
          <div className="counting">
            {ducSuccessLength == 2
              ? "2/2"
              : ducSuccessLength == 0
              ? "0/2"
              : ducSuccessLength == undefined
              ? "0/2"
              : "1/2"}
          </div>
          <div className="success_doc">
            <img src={progess_success} />
          </div>
        </div>
        <br />
        <h4 className="text-white updating_count">
          {ducSuccessLength == 2
            ? ""
            : ducSuccessLength == undefined
            ? "2 Documents need updating"
            : `${ducPendingLength} Documents need updating`}
        </h4>
        {documentDetail == null
          ? PropertyDocs &&
            Object.keys(PropertyDocs)
              .filter((i) => PropertyDocs[i] == null)
              .map((item) => (
                <FileUpload
                  key={item}
                  tital={formatCapilize(allReplace(item, { _: " " }))}
                  name={item}
                  onChange={handleUploadDoc}
                />
              ))
          : documentDetail &&
            Object.keys(documentDetail)
              .filter((i) => documentDetail[i] == null)
              .map((item) => (
                <FileUpload
                  key={item}
                  tital={formatCapilize(allReplace(item, { _: " " }))}
                  name={item}
                  onChange={handleUploadDoc}
                />
              ))}

        {/* {documentDetail &&
          Object.keys(documentDetail[0]).map((item) => (
            <div key={item}>
              {documentDetail[0][item] === null ? (
                handleFile(item)
              ) : (
                <DocSuccess text=" Mortgage Statement" />
              )}{" "}
            </div>
          ))} */}

        {/* <FileUpload
          tital="Buildings Insurance"
          name="building_insurance"
          onChange={handleUploadDoc}
        />
        <FileUpload
          tital="Gas Certificate"
          name="gas_certificate"
          onChange={handleUploadDoc}
        /> */}
        {/* <div className="doc_needReupdating">
          <DocExpired
            text="Expired 1 Aug 2023 (one week agp)"
            msg="Landlord Insurance"
          />

          <DocWarning
            text="Expiring 19 Aug 2023 (in two weeks)"
            msg=" Electrical Report (EICR) "
          />
        </div> */}
        <div className="doc_sucupload">
          <h4 className="text-white updating_count">
            {ducSuccessLength} Documents successfully uploaded
          </h4>
          {documentDetail &&
            Object.keys(documentDetail)
              .filter((i) => documentDetail[i] !== null)
              .map((item) => (
                <DocSuccess
                  text={item}
                  key={item}
                  newName={documentDetail[item]}
                  expiredoc={documentExpiry}
                  test={documentExpiry[`${item}_expiry_date`]}
                  onChange={handleUploadDoc}
                />
              ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Property;
