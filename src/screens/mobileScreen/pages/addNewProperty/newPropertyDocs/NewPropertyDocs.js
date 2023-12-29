import React from "react";
import "../../../../../assets/css/style.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import fileupload from "../../../../../assets/img/file_upload.svg";
import "../../../../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderForMobile } from "../../../../../component/header/Header";
import { formatCapilize } from "../../../../../util/commonFunction";

const NewPropertyDocs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInput, setUserInput] = React.useState({});
  const [fileName, setFileName] = React.useState();
  const [fileNametwo, setFileNametwo] = React.useState();
  const data = location.state;
  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];

  const handleChange = (event) => {
    const { name, files } = event.target;
    setFileName(files[0]?.name);
    setUserInput((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };
  const handleChanges = (event) => {
    const { name, files } = event.target;
    setFileNametwo(files[0]?.name);
    setUserInput((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  }; 
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/newproperty-roi", {
      state: { ...data, property_doc: { ...userInput } },
    });
  };

  // const validation = () => {
  //   let a = false;
  //   const e = [];
  //   if (!userInput.mortgage_statement) {
  //     a = true;
  //     e["mortgage_statement"] = "Please upload document";
  //   }
  //   if (!userInput.tenancy_aggrement) {
  //     a = true;
  //     e["tenancy_aggrement"] = "Please upload document";
  //   }
  //   setError(e);
  //   return a;
  // };
  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/postcode"
        logo={mbtogel}
        title={`Hi ${formatCapilize(userName)}`}
      />
      <div className="lead_slide" style={{ marginTop: "5px" }}></div>
      <div className="main_lead_board Nfd_md">
        <div className="cover_mb"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="passcode_head">
                <h3 className="text-white" style={{ fontWeight: 700 }}>
                  New Property Docs
                </h3>
                <p>
                  Choose whether to upload your own documents or enter details
                  manually.
                </p>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_form file_upld_frm pt-5">
                <form action="">
                  <h2>Upload Files</h2>
                  <div className="form-group">
                    <img src={fileupload} />
                    <label
                      style={{
                        fontSize: "medium",
                        width: "60%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "start",
                      }}
                    >
                      {fileName ? fileName : "Mortgage Statement"}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleChange}
                      name="mortgage_statement"
                    />
                    <span></span>
                  </div>
                  <div className="form-group">
                    <img src={fileupload} />
                    <label
                      style={{
                        fontSize: "medium",
                        width: "60%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "start",
                      }}
                    >
                      {fileNametwo ? fileNametwo : "Tenancy Agreement"}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleChanges}
                      name="tenancy_aggrement"
                    />
                    <span></span>
                  </div>
                  <a onClick={handleSubmit} className="all_property btn mt-5">
                    Ccntinue/Skip
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPropertyDocs;
