import React , {useRef} from "react";
import PropTypes from "prop-types";
import "../../assets/css/style.css";
import frame from "../../assets/img/Frame.svg";
import { Modal } from "react-bootstrap";
import emailjs from '@emailjs/browser';



import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { toast } from "react-toastify";

const SideBar = ({ isOpen, onClose }) => {

  const navigate = useNavigate();
  const [opens, setOpens] = React.useState(false);

 const handleClose = () =>{
  setOpens(false)
 }

 const handleOpen=()=>{
  setOpens(true)

 }

 const form = useRef();

 const sendEmail = (e) => {
   e.preventDefault();

     const name = form.current.user_name.value.trim();
     const email = form.current.user_email.value.trim();
     const message = form.current.message.value.trim();
 
     if (!name || !email || !message) {
      toast('Please fill  all required fields');
       return;
     }


   emailjs.sendForm('service_xfqbh9g', 
   'template_vpnq65b', 
   form.current, 'I8Ktm-jJ0Q48l3MIP')
     .then((result) => {
         console.log(result.text);
         toast("We will connect soon")
         form.current.reset();

       
         handleClose();
     }, (error) => {
         console.log(error.text);
     });
 };

 const Logout = () => {
  localStorage.clear();
    localStorage.setItem("showJoyride", JSON.stringify(false));
  navigate("/");
  window.location.reload();
};




  // const Logout = () => {
  //   localStorage.clear();
  //   navigate("/welcome-login");
  // };
  const sidebarContent = (
    <div className="right-sidebar">
      <div className="">
        <div className="menubarconatiner">
          <div className="container">
            <div className="closetabcross">
              <a>
                <img src={frame} onClick={onClose} />
              </a>
            </div>
            {/* <div className="sidebarmenu-button-conatiner pt-3">
              <div>
                <button>My Account</button>
              </div>
            </div>
            <div className="sidebarmenu-button-conatiner pt-3">
              <div>
                <button>Settings</button>
              </div>  
            </div> */}
            <div className="sidebarmenu-button-conatiner pt-4">
              <div>
                <button onClick={Logout}>Logout</button>
              </div>
            </div>
            <div className="sidebarmenu-button-conatiner pt-4">
              <div>
                <button onClick={handleOpen}>Contact us</button>
              </div>
            </div>
          
          </div>
        </div>
      </div>
      <Modal className="contact_modal" show={opens} onHide={handleClose} centered >
  <Modal.Header >

    <Modal.Title>
      <div style={{display:'flex' , justifyContent:"space-between"}}>
      <div>  Contact</div>
     
      </div>
    
     
    
    </Modal.Title>
    <div className="crossclosetab" style={{cursor:"pointer"}}><img src={frame} onClick={handleClose} />
</div>
  </Modal.Header>
  <Modal.Body style={{ position: "relative", top: "20px"}}>
 <p className="contactsubhead" style={{marginLeft:"24px"}} >For connect us please fill all inputs!</p>
    <Modal.Body style={{ width: "400px" }}>
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
        <div className="mb-3 postrel">
          <label>Name</label>
          <input type="text" name="user_name" className="form-control" 
          />
        </div>
        <div className="mb-3 postrel">
          <label>Email</label>
          <input type="email" name="user_email" className="form-control" />
        </div>
        <div className="mb-5 postrel">
          <label>Message</label>
          <textarea style={{padding: "23px 0px 5px 64px"}} name="message" className="form-control" rows="3" />
        </div>
        <div className="mb-3 mt-4" >
          <input type="submit" value="Send" style={{margin:'0px' , padding:'0px'}} className="btn login_submits continuebutton" />
        </div>
        </div>
      </form>
    </Modal.Body>
  </Modal.Body>

</Modal>


    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose} />
      {sidebarContent}
    </>
  );
};
SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBar;
