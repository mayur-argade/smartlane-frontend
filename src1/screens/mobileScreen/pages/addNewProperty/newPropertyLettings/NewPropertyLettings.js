import React from "react";
import "../../../../../assets/css/style.css";
import "./newpropertyletting.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderForMobile } from "../../../../../component/header/Header";
import { formatCapilize } from "../../../../../util/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";
import { addPropertList } from "../../../../../Devlopment/property";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const NewPropertyLettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [tenant] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [error, setError] = React.useState([]);
  const [userInput, setUserInput] = React.useState({});
  const [open, setOpen] = React.useState(false);

  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];
  console.log(data.estimate)

  const NewestimatValue = data.estimate
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function re(val) {
    if (val) {
      return parseFloat(val?.replace(/,/g, ""));
    }
    return val;
  }

  const managementFee =
    (re(data?.ROI?.gross_monthly_income) * re(data?.ROI?.value)) / 100;

  const handleUpload = async () => {
    if (!validation()) {
      setOpen(true);
      const payload = {
        property: {
          property_estimate: NewestimatValue.length>1 ? NewestimatValue : data?.OwnerShip?.estimate,
          property_margin: data?.OwnerShip?.margin ? data?.OwnerShip?.margin : 0,
          property_name: data?.selectedAdd?.postcode,
          address: `${data?.selectedAdd?.line_1},${data?.selectedAdd?.line_2},${data?.selectedAdd?.line_3},${data?.selectedAdd?.country}`,
        },
        roi: {
          gross_monthly_income: re(data?.ROI?.gross_monthly_income || ""),
          mortgage_payment: re(data?.ROI?.mortgage_payment),
          management_fee: managementFee,
          ground_rent: re(data?.ROI?.ground_rent),
          service_charge: re(data?.ROI?.service_charge),
        },
        mortgage: {
          debt: re(data?.Martgage?.debt),
          type:
            data?.Martgage?.type == "Other"
              ? data?.Martgage?.owntype
              : data?.Martgage?.type,
          interest_rate: re(data?.Martgage?.value),
          provider:
            data?.Martgage?.provider == "Other"
              ? data?.Martgage?.ownprovider
              : data?.Martgage?.provider,
          expiry: moment(data?.Martgage?.expiry).format("DD/MM/YYYY"),
        },
        insurance: {
          type:
            data?.Insurance?.type == "Other"
              ? data?.Insurance?.owntype
              : data?.Insurance?.type,
          provider:
            data?.Insurance?.provider == "Other"
              ? data?.Insurance?.ownprovider
              : data?.Insurance?.provider,
          expiry: moment(data?.Insurance?.expiry).format("DD/MM/YYYY"),
        },
        ownership: {
          company_number: re(data?.ComNum?.value),
          type: data?.OwnerShip?.type,
          property_type: data?.OwnerShip?.property_type,
          construction_date: data?.OwnerShip?.construction_date,
          no_of_bedroom: re(data?.OwnerShip?.no_of_bedrooms),
          no_of_bathroom: re(data?.OwnerShip?.no_of_bathrooms),
          finish_quality: data?.OwnerShip?.finish_quality,
          outdoor_space: data?.OwnerShip?.outdoor_space,
          off_street_parking: data?.OwnerShip?.off_street_parking,
          internal_area: re(data?.OwnerShip?.internal_area),
          post_code: data?.selectedAdd?.postcode,
        },
        letting: {
          current_tenent: tenant,
          tenant_expiry: moment(userInput?.tenancy_expiry).format("DD/MM/YYYY"),
          // beneficiary_id: userInput?.beneficial_id,
          // payprop_id: userInput?.property_id,
        },
      };
      const response = await addPropertList(payload);
      setOpen(false);
      if (response?.success) {
        navigate("/dashboard");
      } else {
        toast("data already exists");
        navigate("/postcode");
      }
    }
  };

  // const handleUploadDoc = async (id) => {
  //   const payload = { property_id: id, ...data?.property_doc };
  //   await propertyDocUpload(payload);
  //   navigate("/dashboard");
  // };

  const validation = () => {
    let a = false;
    const e = [];
    if (!tenant[0]) {
      a = true;
      e["current_tenent"] = "Current Tenent field is required";
    }
    if (!userInput.tenancy_expiry) {
      a = true;
      e["tenancy_expiry"] = "Tenancy Expiry field is required";
    }
    setError(e);
    return a;
  };

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <ToastContainer />
      <HeaderForMobile
        path="/newproperty-insurance"
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
                  New Property: Lettingsss
                </h3>
                <p>Enter as many details as you can.</p>
              </div>
              <div className="roi_progres mt-3">
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_form owbnership_frm pt-5">
                <form action="/action_page.php">
                  <div className="form-group">
                    <label style={{marginLeft:"-20px"}}>CURRENT TENANT(S)</label>
                    <input
                      type="text"
                      className="form-control gdfg"
                      onChange={(e) => {
                        tenant[0] = e.target.value;
                      }}
                      name="current_tenent"
                      autoComplete="off"
                    />{" "}
                    {error.current_tenent && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.current_tenent}
                      </div>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="form-group">
                      <label>CURRENT TENANT(S)</label>
                      <input
                        type="text"
                        className="form-control gdfg"
                        onChange={(e) => {
                          tenant[1] = e.target.value;
                        }}
                        name="current_tenent"
                      />{" "}
                    </div>
                  )}
                  {index > 1 && (
                    <div className="form-group">
                      <label>CURRENT TENANT(S)</label>
                      <input
                        type="text"
                        className="form-control gdfg"
                        onChange={(e) => {
                          tenant[2] = e.target.value;
                        }}
                        name="current_tenent"
                      />{" "}
                    </div>
                  )}
                  <div
                    className="form-group add_talent mb-4"
                    onClick={() => {
                      index < 4 ? setIndex(index + 1) : null;
                    }}
                  >
                    <label style={{fontSize:"20px"}}>+ ADDITIONAL TENANT</label>
                    <input className="form-control" />
                    <span className="add_talent_box"></span>
                  </div>
                  <div className="form-group" style={{width:"100%",backgroundColor:"black",borderRadius:"16px"}}>
                    <span className="Drops pr-2 pl-4">£</span>
                    <input
                      type="date"
                      className="form-conrol gdfg pt-4"
                      name="tenancy_expiry"
                      id="dateInput"
                      style={{ backgroundColor: "black", paddingRight: "15px",borderColor:"#000",width:"220px",position:"relative",left:"12px" }}
                      onChange={handleChange}
                    />
                    <label style={{marginLeft:"-20px"}}>TENANCY EXPIRY / RENEWAL DATE</label>
                    {error.tenancy_expiry && (
                      <div
                        className="error-msgs ms-2"
                        style={{ color: "#F0AD4E" }}
                      >
                        {error.tenancy_expiry}
                      </div>
                    )}
                  </div>
                  <a className="btn all_propertyss" onClick={handleUpload}>
                    Next
                  </a>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPropertyLettings;
