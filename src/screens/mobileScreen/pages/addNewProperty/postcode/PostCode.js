import React, { useState } from "react";
import "../../../../../assets/css/style.css";
// import "../../../../../assets/css/web.css";
import "./postcode.css";
import mbtogel from "../../../../../assets/img/mb-togel.svg";
import search from "../../../../../images/search.png";
import close from "../../../../../images/close.png";
import { useNavigate } from "react-router-dom";
import { searchPostCode } from "../../../../../Devlopment/postCode/index";
import { HeaderForMobile } from "../../../../../component/header/Header";
import { formatCapilize } from "../../../../../util/commonFunction";

const PostCode = () => {
  const [addData, setAddData] = useState();
  const [code, setCode] = useState("");
  const [selectedAdd, setSelectedAdd] = React.useState();
  const navigate = useNavigate();
  let values = window.localStorage.getItem("@userData");
  const userInfo = values ? JSON.parse(values) : "";
  var userName = userInfo?.full_name?.split(" ")[0];
  React.useEffect(() => {
    handleChange();
  }, [code]);

  const handleChange = async () => {
    handleSelect();
    const payload = { postcode: code };
    const response = await searchPostCode(payload);
    response?.data && setAddData(response?.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    selectedAdd &&
      navigate("/newproperty-roi", { state: { selectedAdd: selectedAdd } });
  };

  const handleSelect = (item) => {
    setSelectedAdd(item);
  };
  return (
    <div className="welcome_main" style={{ paddingTop: "0" }}>
      <HeaderForMobile
        path="/dashboard"
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
                  Add a New Property
                </h3>
                <p>Enter the postcode of any of your properties.</p>
              </div>
            </div>
            <div className="col-sm-12">
              <div className=" file_upld_frm pt-5 add_property_passcode">
                <div className="login_form">
                  <form action="">
                    <p className="text-white" style={{ fontSize: "20px" }}>
                      {selectedAdd &&
                        selectedAdd?.line_1 +
                          selectedAdd?.line_2 +
                          selectedAdd?.line_3}
                    </p>
                    <div className="form-group searchInput">
                      <img src={search} />
                      <label>POSTCODE</label>
                      <input
                        type="text"
                        className="form-control"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                      />
                      {code == "" ? (
                        <img className="close_btn " src={close} />
                      ) : (
                        <img
                          className="close_btns"
                          src={close}
                          onClick={() => setCode("")}
                        />
                      )}
                      <ul
                        style={{
                          listStyleType: "none",
                          backgroundColor: "black",
                          maxHeight: "300px",
                          color: "white",
                          overflow: "scroll",
                          marginTop: "-10px",
                          borderRadius: "0  0 15px 15px",
                        }}
                      >
                        {code &&
                          addData &&
                          !selectedAdd &&
                          addData.map((item) => (
                            <li
                              key={item?.id}
                              onClick={() => {
                                handleSelect(item);
                              }}
                            >
                              {item?.line_1 + item?.line_2 + item?.line_3}
                            </li>
                          ))}
                      </ul>
                      {addData && !selectedAdd && (
                        <div
                          className="error-msgs ms-2"
                          // style={{ color: "#F0AD4E" }}
                        >
                          Select address!
                        </div>
                      )}
                      {/* <Link to={"/newproperty-docs"}> */}
                      <a
                        href=""
                        onClick={handleSubmit}
                        className={
                          !selectedAdd
                            ? "all_propertys btn"
                            : "all_propertyss btn"
                        }
                      >
                        Next
                      </a>
                      {/* </Link> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCode;

// const addressData = [
//   "Flat 1, 41 Colville Terrace, London",
//   " Flat 2, 41 Colville Terrace, London",
//   " Flat 3, 41 Colville Terrace, London",
//   " Flat 4, 41 Colville Terrace, London",
//   " Flat 5, 41 Colville Terrace, London",
//   " Flat 6, 41 Colville Terrace, London",
// ];
