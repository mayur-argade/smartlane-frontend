import React, { useContext } from "react";
import "../../../../assets/css/style.css";
import "../../../../assets/css/web.css";
import "./index.css";
// import doc_warning from "../../../../assets/img/doc_warning.png";
// import doc_warning_black from "../../../../assets/img/warning-black.svg";
import { FileUpload } from "../../../../component/fileUpload";
import { DocSuccess } from "../../../../component/docStutes";
import { propertyDocUpload } from "../../../../Devlopment/property";
import { PropertyDocList } from "./PropertyDocument";
import progess_success from "../../../../assets/img/progress_success.svg";

const Lettings = () => {
  // const { id } = location.state;
  // const { lettingDetail, id } = useContext(PropertyDocList);
  const ddd = useContext(PropertyDocList);
  const lettingDetail = ddd && ddd?.propertyDocList?.lettingDetail;
  const lettingExpiry = ddd && ddd?.propertyDocList?.lettingExpiry;
  const id = ddd && ddd?.propertyDocList?.id;
  const getDocumentList = ddd && ddd?.getDocumentList;

  var length =
    lettingDetail && Object.values(lettingDetail).filter((i) => i == null);
  var ducPendingLength = length?.length;

  var lengths = lettingDetail && Object.values(lettingDetail).filter((i) => i);
  var ducSuccessLength = lengths?.length;

  const handleUploadDoc = async (event) => {
    const payload = {
      property_id: id,
      ...event,
    };
    await propertyDocUpload(payload);
    getDocumentList();
  };

  const LettingDocs = {
    electrical_report_eicr: null,
    portable_appliance_testing: null,
    tenancy_aggrement: null,
    term_of_business: null,
    energy_performance_epc: null,
  };

  return (
    <React.Fragment>
      <div id="menu1" className="tab-pane active">
        <div className="doc_update_barStatus">
          <div className="progress-bar-container">
            <div
              className={
                ducSuccessLength == null
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
          {/* <div className="progress-bar-wrap">
            {ducSuccessLength == 7 ? (
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow="60"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "100%", backgroundColor: "#2FBF7A" }}
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
          </div> */}
          <div className="counting">
            {ducSuccessLength == 5
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
          </div>
          <div className="success_doc">
            <img src={progess_success} />
          </div>
        </div>
        <br />
        <h4 className="text-white   updating_count">
          {ducPendingLength ? ducPendingLength : "5"} Documents need updating
        </h4>
        {lettingDetail == null
          ? LettingDocs &&
            Object.keys(LettingDocs)
              .filter((i) => LettingDocs[i] == null)
              .map((item) => (
                <FileUpload
                  key={item}
                  tital={item}
                  name={item}
                  onChange={handleUploadDoc}
                />
              ))
          : lettingDetail &&
            Object.keys(lettingDetail)
              .filter((i) => lettingDetail[i] == null)
              .map((item) => (
                <FileUpload
                  key={item}
                  tital={item}
                  name={item}
                  onChange={handleUploadDoc}
                />
              ))}

        {/* <div className="monthly_statements doc_updating_wr my-3">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <div className="doc_needReupdating">
                  <div className="upload_btns mb-3">
                    <a
                      href="#"
                      className="accordion-button all_property"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      style={{ boxShadow: "none" }}
                    >
                      <img src={doc_warning_black} />
                      <span
                        style={{
                          width: "80%",
                          margin: "0 auto",
                        }}
                      >
                        {" "}
                        Monthly Statement{" "}
                      </span>
                    </a>
                  </div>
                </div>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              > */}
        {/* <FileUpload
          tital="Tenancy Agreement"
          name="tenancy_agreement"
          onChange={handleUploadDoc}
          image={doc_warning}
        /> */}
        <h4 className="text-white   updating_count">
          {ducSuccessLength} Documents successfully uploaded
        </h4>
        {lettingDetail &&
          Object.keys(lettingDetail)
            .filter((i) => lettingDetail[i] !== null)
            .map((item) => (
              <DocSuccess
                text={item}
                key={item}
                newName={lettingDetail[item]}
                expiredoc={lettingExpiry}
                test={lettingExpiry[`${item}_expiry_date`]}
                onChange={handleUploadDoc}
              />
            ))}
        {/* </div>
            </div>
          </div>
        </div> */}
        {/* <DocSuccess text=" Terms of Business " /> */}
      </div>
    </React.Fragment>
  );
};

export default Lettings;
