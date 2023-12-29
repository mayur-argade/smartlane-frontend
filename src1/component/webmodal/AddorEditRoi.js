import React, { useEffect, useState , useRef  } from "react";
import "../../assets/css/web.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { AdminRoiEdit, propertyEdit , propertDetail  , propertDetailforAdmin} from "../../Devlopment/property";
import { allReplace } from "../../util/commonFunction";
import { Backdrop, CircularProgress } from "@mui/material";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import { toast } from "react-toastify";

const AddandEditRoi = ({
  data,
  getDetails,
  Id,
  open,
  close,
  admin,
  userId,
}) => {
  console.log("datat" , data)
  const [userInput, setUserInput] = React.useState(data);
  const [alldata , setAllData] = React.useState([data]);
  const [error, setError] = React.useState({});
  const [opens, setOpens] = React.useState(false);
  const [proprtyvalue , setPropertyValue] = useState('');
  const [inputProperty, setInputProperty] = useState('')
  const prevPropertyRef = useRef(proprtyvalue);
  //const prevsEstimateRef = useRef(defaultvalue);
  const prevDefaultValueRef = useRef(data.propertyEstimate);

  useEffect(() => {
    prevDefaultValueRef.current = data.propertyEstimate;
  }, [data.propertyEstimate]);


  const previousDefaultValue = prevDefaultValueRef.current;
  
  console.log("previousDefaultValue" , previousDefaultValue)

  console.log(setAllData)

  Object.entries(alldata).map(([key, value]) => (
    console.log(`${key}: ${value}`)
  ));

  const [updatedPropertyEstimate, setUpdatedPropertyEstimate] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [previousPropertyValue, setPreviousPropertyValue] = useState('');



const defaultvalue = data.propertyEstimate
console.log(defaultvalue)

  console.log("getDetails" , getDetails  )
  console.log("getDetails"   , proprtyvalue)
  let propertyId = Id?.property_id;
  console.log("propertyId" , propertyId)
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

console.log("set"  , setInputProperty)
  

  const editRoi = async () => {
   // validation();
    setOpens(true);
  
    const payload = {
      id: userId,
      property_id: propertyId,
      roi: {
        gross_monthly_income: userInput?.gross_monthly_income,
        mortgage_payment: userInput?.mortgage_payment,
        ground_rent: userInput?.ground_rent,
        service_charge: userInput?.service_charge,
        management_fee: userInput?.management_fee,
       // ...(admin ? {
        //  property_estimate: inputProperty ? inputProperty : defaultvalue
     //   } : { property_estimate: inputProperty ? inputProperty :  proprtyvalue }),      
     property_estimate:userInput?.propertyEstimate
      },
    };
  
    console.log("input", inputProperty);
  
    const response =
      (admin &&
        userInput.gross_monthly_income &&
        userInput.mortgage_payment &&
        userInput.ground_rent &&
        userInput.service_charge && 
        (await AdminRoiEdit(payload))) ||
      (!admin && payload.id && (await propertyEdit(payload)));
  
    if (response.success) {
      const updatedEstimate = response.data?.roi?.property_estimate;
      setUpdatedPropertyEstimate(updatedEstimate);
      console.log("Updated Property Estimate Value:", updatedEstimate);
      console.log("Previous Property Value:", proprtyvalue);
      if (updatedEstimate !== proprtyvalue) {
        setPreviousPropertyValue(proprtyvalue);
        setShowConfirmationModal(true);
        console.log("hello")
    }
    
      else{
      response?.success && close() && setOpens(false);
      toast("Property Deteils update")
      }
      
    }
  
    response.success && getDetails();
   
  
    console.log("response12", response);
  };

  const [propertyData, setPropertyData] = React.useState()


  const getPropertyDetails = async () => {
    try {
      const payload = {
        id: propertyId,
        userId: userId,
      };
  
      console.log("Payload:", payload);
  
      const response = admin
        ? await propertDetailforAdmin(payload)
        : await propertDetail(payload);
  
      console.log("API Response:", response);
  
      if (response.success) {
        setPropertyData(response?.data);
      } else {
        console.error("API request failed:", response.error);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
  
  console.log("Property Data:", propertyData);
  
  
  
  // const validation = () => {
  //   const e = [];
  //   if (!userInput.gross_monthly_income) {
  //     e["gross_monthly_income"] = "Monthly Rent is required";
  //   }
  //   if (!userInput.mortgage_payment) {
  //     e["mortgage_payment"] = "Mortgage Payment is required";
  //   }
  //   if (!userInput.management_fee) {
  //     e["management_fee"] = "Management Fee is required";
  //   }
  //   if (!userInput.ground_rent) {
  //     e["ground_rent"] = "Ground Rent is required";
  //   }
  //   if (!userInput.service_charge) {
  //     e["service_charge"] = "Service Charge is required";
  //   }
  //   setError(e);
  //   return e;
  // };

  console.log("userInput" , userInput)

  const propertList = async () => {
    try {
      const response = await ApiServices("get", "", ApiEndPoints.PropertList);
      console.log("response", response);
  
      const propertyIdToFind = Id?.property_id;
  
      const matchedProperty = response.data.find(property => property.property_id === propertyIdToFind);
  
      if (matchedProperty) {
        console.log("MatchedProperty:", matchedProperty);
        setPropertyValue(matchedProperty.property_estimate); // Corrected the typo here
        prevPropertyRef.current = matchedProperty.property_estimate; // Update useRef with the current property value
      } else {
        console.log("Property not found with id:", propertyIdToFind);
      }
  
      return response;
    } catch (error) {
      console.error("Error fetching property list:", error);
    }
  };
  
  propertList();
  


  useEffect(() => {
    const fetchData = async () => {
      await propertList(); 
    };

    fetchData();
   
  }, []);

 

  useEffect(()=>{
    getPropertyDetails
  },[])
 
  console.log("test" , setError)

  const handleCloseConfirmationModal = async() => {
    console.log("test" , previousDefaultValue)
    console.log("test" , previousPropertyValue)

  //  validation();
    setOpens(true);
  
    const payload = {
      id: userId,
      property_id: propertyId,
      roi: {
        gross_monthly_income: userInput?.gross_monthly_income,
        mortgage_payment: userInput?.mortgage_payment,
        ground_rent: userInput?.ground_rent,
        service_charge: userInput?.service_charge,
        management_fee: userInput?.management_fee,
        property_estimate: previousPropertyValue ? previousPropertyValue : previousDefaultValue
      },
    };
  
    console.log("input", payload);
  
    const response =
      (admin &&
        userInput.gross_monthly_income &&
        userInput.mortgage_payment &&
        userInput.ground_rent &&
        userInput.service_charge && 
        (await AdminRoiEdit(payload))) ||
      (!admin && payload.id && (await propertyEdit(payload)));
  
    if (response.success) {
      const updatedEstimate = response.data?.roi?.property_estimate;
      setUpdatedPropertyEstimate(updatedEstimate);
      console.log("Updated Property Estimate Value:", updatedEstimate);
      console.log("Previous Property Value:", proprtyvalue);
  
      
    }
  
    response.success && getDetails();
    response?.success && close() && setOpens(false);

   
  
    console.log("response12", response);    
   
  };

  const handleConfirmPropertyValueChange = () => {
    close() && setOpens(false);
    toast("property Value is change")
  };

  console.log(updatedPropertyEstimate)


  return (
    <React.Fragment>
    <Modal show={open} onHide={close}>
      <div>
        <div className="bg-black">
          <div
            className="container py-4"
            style={{
              backgroundColor: "#1e1e1e",
              width: "428px",
              borderRadius: "24px",
            }}
          >
            <div className="closetabcross" style={{ textAlign: "right" }}>
              <a>
                <img src={frame} onClick={close} alt="Close Icon" />
              </a>
            </div>
            <div
              className="pb-5"
              style={{ fontSize: "24px", color: "#fff", textAlign: "center" }}
            >
              Add or Edit ROI Details.
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="login_form">
                  <form action="javascript:void 0">
                    {/* New Property Value Input */}
                    {/* <div className="form-group">
                      <span className="PGuro text-white">£ 
                      
                       { inputProperty.length < 1 && proprtyvalue}    </span>
                      <label>Property Value  </label>
                      <input
                        type="number"
                        name="propertyValue"
                    onChange={(e)=>setInputProperty(e.target.value)}
                        className="form-control"
                        style={{ paddingLeft: "75px" }}
                     
                      />
                      {error.propertyValue && (
                        <div
                          className="error-msgs ms-2"
                          style={{
                            color: "#F0AD4E",
                          }}
                        >
                          {error.propertyValue}
                        </div>
                      )}
                    </div> */}

                   
                    {userInput &&
  Object.keys(userInput).map((item) => {
    // Exclude specific keys from rendering
    if (item === "net_equity" || item === "monthly_net_income" ) {
      return null; // Skip rendering for these keys
    }

    return (
      <div className="form-group" key={item}>
        <span className="PGuro text-white">£</span>
        <label>{allReplace(item, { _: " " })}</label>
        <input
          type="number"
          name={item}
          value={userInput[item]}
          onChange={handleChange}
          className="form-control"
          style={{ paddingLeft: "75px" }}
        />
        {error[item] && (
          <div
            className="error-msgs ms-2"
            style={{
              color: "#F0AD4E",
            }}
          >
            {error[item]}
          </div>
        )}
      </div>
    );
  })}

 
   

            <button
              style={{ backgroundColor: "#f9d75d", color: "#000000" }}
              className="btn login_submits"
              onClick={editRoi}
            >
              Save
            </button>
        

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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </Modal>
    <Modal className="roi_confrm" show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to change the property value?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn roi_cncl"
            onClick={handleCloseConfirmationModal}
          >
            Cancel
          </button>
          <button
            className="btn roi_cnfrm"
            onClick={handleConfirmPropertyValueChange}
          >
            Confirm
          </button>
        </Modal.Footer>
    </Modal>


  </React.Fragment>

  );
};
AddandEditRoi.propTypes = {
  data: PropTypes.any,
  Id: PropTypes.any,
  getDetails: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.any,
  webopen: PropTypes.any,
  admin: PropTypes.any,
  userId: PropTypes.any,
};

export default AddandEditRoi;
