import React from "react";
import "../../assets/css/style.css";
import frame from "../../assets/img/Frame.svg";
import PropTypes from "prop-types";
import { propertyEdit } from "../../Devlopment/property/index";
import "../sidebar/sidebar.css";
import { Modal } from "react-bootstrap";
import { allReplace } from "../../util/commonFunction";
import { Dialog } from "@mui/material";
import { useState , useEffect , useRef } from "react";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import { toast } from "react-toastify";

const AddorEditRoi = ({ data, getDetails, Id, open, close, webopen }) => {
  const [userInput, setUserInput] = React.useState(data);
  const [error, setError] = React.useState({});
  const [opens, setOpens] = React.useState(false);
  const [proprtyvalue , setPropertyValue] = useState('');
  const [inputProperty, setInputProperty] = useState('');
  const prevPropertyRef = useRef(proprtyvalue);
  const [updatedPropertyEstimate, setUpdatedPropertyEstimate] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [previousPropertyValue, setPreviousPropertyValue] = useState('');
  const [heelo , setHello] = useState('hello')
  
  console.log("updatedPropertyEstimate" ,  opens ,updatedPropertyEstimate)
  console.log("data" , data)
  console.log("userInput" , userInput )
  let propertyId = Id?.property_id;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editRoi = async () => {
    // validation();
    setOpens(true);
    const payload = {
      property_id: propertyId,
      roi: {
        gross_monthly_income: userInput?.gross_monthly_income,
        mortgage_payment: userInput?.mortgage_payment,
        ground_rent: userInput?.ground_rent,
        service_charge: userInput?.service_charge,
        management_fee: userInput?.management_fee,
        property_estimate: userInput.propertyEstimate
        ,

      },
    };
    const response =
      userInput.gross_monthly_income &&
      userInput.mortgage_payment &&
      userInput.ground_rent &&
      userInput.service_charge &&
      (await propertyEdit(payload));


      if (response.success) {
        const updatedEstimate = response.data?.roi?.property_estimate;
        setUpdatedPropertyEstimate(updatedEstimate);
        console.log("Updated Property Estimate Value:", updatedEstimate);
    
      
        console.log("Previous Property Value:", proprtyvalue);
        if (response.success) {
          const updatedEstimate = response.data?.roi?.property_estimate;
          setUpdatedPropertyEstimate(updatedEstimate);
          console.log("Updated Property Estimate Value:", updatedEstimate);
          console.log("Previous Property Value:", proprtyvalue);
          if (updatedEstimate !== proprtyvalue) {
            setPreviousPropertyValue(proprtyvalue);
            HandleOPen1();
            setHello("bolo");
            setOpens(true);
            console.log("hello")
        }
          else{
          response?.success && close() && setOpens(false);
          toast("Property Deteils update")
          }
          
        }

      
      }

      response.success && getDetails();


  };

  // const shoemodel=()=>{
  //   console.log("open")
  //   setShowConfirmationModal(true);
  // }

  // const validation = () => {

  //   const e = [];
  //   if (!userInput.gross_monthly_income) {
  //     e["gross_monthly_income"] = "Net Monthly Income is required";
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

  console.log(setError)

  const propertList = async () => {
    try {
      const response = await ApiServices("get", "", ApiEndPoints.PropertList);
      console.log("response", response);
  
      const propertyIdToFind = Id?.property_id;
  
      const matchedProperty = response.data.find(property => property.property_id === propertyIdToFind);
  
      if (matchedProperty) {
        console.log("MatchedProperty:", matchedProperty);
        setPropertyValue(matchedProperty.property_estimate); // Corrected the typo here
        prevPropertyRef.current = matchedProperty.property_estimate;
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


  const HandleOPen1=()=>{
    setShowConfirmationModal(true);
      console.log("testing 1")
  }

  const handleCloseConfirmationModal = async() => {
    console.log("verify")
   // validation();
    setOpens(true);
  
    const payload = {
      property_id: propertyId,
      roi: {
        gross_monthly_income: userInput?.gross_monthly_income,
        mortgage_payment: userInput?.mortgage_payment,
        ground_rent: userInput?.ground_rent,
        service_charge: userInput?.service_charge,
        management_fee: userInput?.management_fee,
        property_estimate:  previousPropertyValue,

      },
    };
    const response =
      userInput.gross_monthly_income &&
      userInput.mortgage_payment &&
      userInput.ground_rent &&
      userInput.service_charge &&
      (await propertyEdit(payload));
    console.log("input", payload)
  
   
        userInput.gross_monthly_income &&
        userInput.mortgage_payment &&
        userInput.ground_rent &&
        userInput.service_charge && 
       propertyEdit
 
 

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
      response.success && close();
   
  
    console.log("response12", response);    
   
  };

  const handleConfirmPropertyValueChange = () => {
    close() 
    toast("property Value is change")
  };

  console.log(updatedPropertyEstimate  , inputProperty , setInputProperty)
 

  
  const addeditroi = (
    <React.Fragment>
      <div>
        <Dialog
          fullScreen={!webopen ? true : false}
          open={open}
          onClose={close}
          sx={{ m: 1 }}
        >
          <div className="main_lead_boardroi mainleadboaredroi Nfd_md">
            <div className="cover_mb"></div>
            <div className="container">
              <div className="closetabcross">
                <a>
                  <img src={frame} onClick={close} />
                </a>
              </div>
              <div
                className="row"
                style={{ paddingBottom: "5%", backgroundColor: "#1E1E1E" }}
              >
                <div className="col-sm-12">
                  <div className="passcode_head">
                    <h4 className="colorclasswhite text-center">
                      Add or Edit ROI Details.
                    </h4>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="login_form pt-3">

                    {heelo === "bolo" ?
                    <>
                   
                    <p className="colorclasswhite text-center">Are you sure you want to change the property value?</p>
          <div style={{display:'flex' , justifyContent:'space-evenly'}}>
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
          </div> 
          </>  :
                      
                      <form>
                  
                    {userInput &&
  Object.keys(userInput)
    .filter((item) => item !== "monthly_net_income" && item !== "net_equity")
    .map((item) => (



            
            <div className="form-group" key={item}>
            {item === "gross_monthly_income" ? (
              <>
            
    
                <span className="PGuro text-white">£</span>
                <label>Monthly Rent</label>
                <input
                  type="number"
                  name={item}
                  value={userInput[item]}
                  defaultValue={userInput[item]}
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
              </>
            ) : (
              <>
                <span className="PGuro text-white">£</span>
                <label>{allReplace(item, { _: " " })}</label>
                <input
                  disabled={item === "net_equity"}
                  type="number"
                  name={item}
                  value={userInput[item]}
                  defaultValue={userInput[item]}
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
              </>
            )}
          </div>
    
           


   
  

    ))}
<a className="btn all_property" onClick={editRoi}>
  Save
</a>

<div className="roi_confirm">



</div>

                 
                    </form>}
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </Dialog> 
        
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

      </div>
    </React.Fragment>
  );
  return <>{addeditroi}</>;
};
AddorEditRoi.propTypes = {
  data: PropTypes.any,
  Id: PropTypes.any,
  getDetails: PropTypes.any,
  open: PropTypes.bool,
  close: PropTypes.any,
  webopen: PropTypes.any,
};

export default AddorEditRoi;
