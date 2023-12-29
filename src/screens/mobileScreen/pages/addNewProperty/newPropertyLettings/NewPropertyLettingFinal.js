import React from "react";
import "../../../../../assets/css/style.css";
// import "../../../../../assets/css/web.css";
import "./newpropertyletting.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addPropertList,
  propertyDocUpload,
} from "../../../../../Devlopment/property";
import { HeaderForMobile } from "../../../../../component/header/Header";
import { formatCapilize } from "../../../../../util/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";

const NewPropertyLettingsFinal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [userInput, setUserInput] = React.useState({});
  const [open, setOpen] = React.useState(false);

  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];
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

  const handleUpload = async () => {
    // validation();
    setOpen(true);

    const payload = {
      property: {
        property_estimate: data?.OwnerShip?.estimate,
        property_margin: data?.OwnerShip?.margin,
        property_name: data?.selectedAdd?.postcode,
        address: `${data?.selectedAdd?.line_1},${data?.selectedAdd?.line_2},${data?.selectedAdd?.line_3}`,
      },
      roi: {
        gross_monthly_income: re(data?.ROI?.gross_monthly_income || ""),
        mortgage_payment: re(data?.ROI?.mortgage_payment),
        management_fee: re(data?.ROI?.management_fee),
        ground_rent: re(data?.ROI?.ground_rent),
        service_charge: re(data?.ROI?.service_charge),
      },
      mortgage: {
        debt: re(data?.Martgage?.debt),
        type: data?.Martgage?.type,
        interest_rate: re(data?.Martgage?.interest_rate),
        provider: data?.Martgage?.provider,
        expiry: data?.Martgage?.expiry,
      },
      insurance: {
        type: data?.Insurance?.type,
        provider: data?.Insurance?.provider,
        expiry: data?.Insurance?.expiry,
      },
      ownership: {
        company_number: re(data?.OwnerShip?.company_number),
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
        current_tenent: data?.letting?.current_tenent,
        tenant_expiry: data?.letting?.tenancy_expiry,
        beneficiary_id: userInput?.beneficial_id,
        payprop_id: userInput?.property_id,
      },
    };
    const response = await addPropertList(payload);
    setOpen(false);
    if (response?.success) {
      navigate("/dashboard");
      response?.data && handleUploadDoc(response?.data?.property?.id);
    }
  };

  const handleUploadDoc = async (id) => {
    const payload = { property_id: id, ...data?.property_doc };
    await propertyDocUpload(payload);
    navigate("/dashboard");
  };

  // const validation = () => {
  //   const e = [];
  //   if (!userInput.beneficial_id) {
  //     e["beneficial_id"] = "Beneficial id is required";
  //   }
  //   if (!userInput.property_id) {
  //     e["propeerty_id"] = "Property id is required";
  //   }
  //   setError(e);
  // };

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
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
                  New Property: Lettings
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
                    <label>BENEFICIARY ID</label>
                    <input
                      type="text"
                      className="form-control gdfg"
                      onChange={handleChange}
                      name="beneficial_id"
                    />{" "}
                  </div>

                  <div className="form-group">
                    <span className="Drops pr-2">£</span>
                    <label>PROPERTY ID</label>
                    <input
                      type="text"
                      className="form-control gdfg"
                      name="property_id"
                      id="dateInput"
                      style={{ backgroundColor: "black", paddingRight: "15px" }}
                      onChange={handleChange}
                    />
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
                {/* <button onClick={searchApi}>searchApi</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPropertyLettingsFinal;
