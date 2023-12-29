import React from "react";
import "../../../../../assets/css/style.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderForMobile } from "../../../../../component/header/Header";
import { formatCapilize } from "../../../../../util/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";
import { propertySaleValue } from "../../../../../Devlopment/property";

const NewPropertyOwnershipThird = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [error, setError] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);
  const [userInput, setUserInput] = React.useState({});
  const [estimate, setEstimate] = React.useState('');
  const [resultvslue , setResultvalue] = React.useState([]);

  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];

  const handleChanges = (event) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    validation();
    let payload;

    if (openInput) {
      // If openInput is true, include the estimate value in the payload
      payload = {
        estimate: estimate,
        outdoor_space: userInput?.outdoor_space,
        off_street_parking: userInput?.off_street_parking,
      };
    } else {
      // If openInput is false, include the regular payload properties
      payload = {
        postcode: data?.selectedAdd?.postcode,
        property_type: data?.OwnerShip?.property_type,
        construction_date: data?.OwnerShip?.construction_date,
        internal_area: re(data?.OwnerShip?.internal_area),
        bedrooms: data?.OwnerShip?.no_of_bedrooms,
        bathrooms: data?.OwnerShip?.no_of_bathrooms,
        finish_quality: data?.OwnerShip?.finish_quality,
        outdoor_space: userInput?.outdoor_space,
        off_street_parking: userInput?.off_street_parking,
      };
    }

    try {
      const response = await propertySaleValue(payload);
      setResultvalue(response?.data?.result)
      if (response.success) {
        navigate("/newproperty-insurance", {
          state: {
            ...data,
            estimate,
            OwnerShip: {
              ...data.OwnerShip,
              ...userInput,
              ...response?.data?.result,
            },
          },
        });
      } else {
        setOpenInput(true);
        AddEstimatevalue();
        
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors from the API call
    }

    setOpen(false);
  };

  const validation = () => {
    const e = [];
    if (!userInput.outdoor_space) {
      e["outdoor_space"] = "Outdoor Space is required";
    }
    if (!userInput.off_street_parking) {
      e["off_street_parking"] = "Off Street Parking is required";
    }

    setError(e);
  };

  const AddEstimatevalue = () => {
    console.log("addestimate", estimate);
    if(estimate.length>1){
      navigate("/newproperty-insurance", {
        state: {
          ...data,
          estimate : estimate , 
          OwnerShip: {
            ...data.OwnerShip,
            ...userInput,
            ...resultvslue
          },
        },
      });
    }
  };

  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/newproperty-ownership-second"
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
                  New Property: Ownership
                </h3>
                <p>Enter as many details as you can.</p>
              </div>
              <div className="roi_progres mt-3">
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "65%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_form owbnership_frm pt-5">
                <form action="/action_page.php">
                  {openInput ? (
                    <>
                      <input
                        type="number"
                        placeholder="add estimated value"
                        onChange={(e) => setEstimate(e.target.value)}
                        className="form-conrol gdfg pt-4"
                        style={{ backgroundColor: "black", paddingRight: "15px",borderColor:"#000",width:"280px",position:"relative",left:"35px"  , color:"white" ,
                      borderRadius:"15px"
                      }}
                       
                      />
                    
                    </>
                  ) : (
                    <>
                      <div className="form-group">
                        <label>OUTDOOR SPACE</label>
                        <select onChange={handleChanges} name="outdoor_space">
                          <option hidden></option>
                          <option value="none">None</option>
                          <option value="balcony_terrace">Balcony Terrace</option>
                          <option value="garden">Garden</option>
                          <option value="garden_very_large">Garden Very Large</option>
                        </select>
                        {error.outdoor_space && (
                          <div className="error-msgs ms-2" style={{ color: "#F0AD4E" }}>
                            {error.outdoor_space}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>OFF STREET PARKING</label>
                        <select onChange={handleChanges} name="off_street_parking">
                          <option hidden></option>
                          <option>0 Spaces</option>
                          <option>1 Spaces</option>
                          <option>2 Spaces</option>
                          <option>3+ Spaces</option>
                        </select>
                        {error.off_street_parking && (
                          <div className="error-msgs ms-2" style={{ color: "#F0AD4E" }}>
                            {error.off_street_parking}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <a href="" onClick={handleSubmit} className="btn all_property">
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

export default NewPropertyOwnershipThird;
