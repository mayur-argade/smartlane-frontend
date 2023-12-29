import React, { useContext, useEffect } from "react";
import "../../../../assets/css/web.css";
import side_op_1 from "../../../../assets/web-img/Portfolio.png";
// import Lettings from "../../../../assets/web-img/Lettings.png";
// import Sourcing from "../../../../assets/web-img/Sourcing.png";
// import Learning from "../../../../assets/web-img/Learning.png";
import user from "../../../../assets/web-img/user.png";
import Group from "../../../../assets/web-img/Group 3.png";
import tab_head2 from "../../../../assets/web-img/tab_head2.svg";
// import tab_head3 from "../../../../assets/web-img/tab_head3.svg";
// import home from "../../../../assets/web-img/home.png";
import location from "../../../../assets/web-img/Location Icon.png";
import Header from "../../../../component/header/Header";
import arrowdown from "../../../../images/down.png";
import arrowup from "../../../../images/up.png";
import { filterUser } from "../../../../Devlopment/user/index,";
import {
  adminPropertList,
  allPropertList,
  deleteProperty,
} from "../../../../Devlopment/property";
import { formatCapilize, formatNumber } from "../../../../util/commonFunction";
import PropertyDetails from "../../pages/dashboard/propertyDetails";
// import { PropertyList } from "../../../mobileScreen/pages/propertyExpanded/context";
import swal from "sweetalert2";
import { PropertyContext } from "../../../../context";
import AddNewProperty from "../../../../component/webmodal/AddNewProperty";
import AddnewUser from "../../../../component/webmodal/AddNewUser";

const AdminDashboard = () => {
  const [expand, setExpand] = React.useState("");
  const [userList, setUserList] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const [propertylist, setPropertyList] = React.useState([]);
  const [selectedProperty, setSelectedProperty] = React.useState();
  const [filterValue, setfilterValue] = React.useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); 
  const [searchPro,setSearchPro] = React.useState("")

  const handdleAccordion = (data) => {
    setExpand((pre) => ({ ...pre, [data]: !pre[data] }));
  };

  const proertyConstext = useContext(PropertyContext);
  console.log(setfilterValue);
  useEffect(() => {
    getAllPropertyList();
  }, []);

  useEffect(() => {
    setUserList([]);
    getUserList();
  }, [filterValue]);

  const handdleSelectedPropertyadmin = (item) => {
    setSelectedProperty(item);
  };

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getUserList = async () => {
    const payload = {
      name: filterValue,
    };
    const response = await filterUser(payload);
    setUserList([]);
    setUserList(response.data);
  };

  const getAllPropertyList = async () => {
    const payload = {};
    const response = await allPropertList(payload);
    setPropertyList(response?.data);
    proertyConstext?.updateProperty(response?.data);
    response.success &&
      localStorage.setItem("property", JSON.stringify(response?.data));
  };

  const getUserPropertyList = async (id) => {
    setUserId(id);
    setSelectedProperty();
    const payload = {
      id: id,
    };
    const response = await adminPropertList(payload);
    setPropertyList(response?.data);
    if (response?.data) {
      proertyConstext?.updateProperty(response?.data);
      localStorage.setItem("property", JSON.stringify(response?.data));
    }
  };

  const deleteAlert = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#000",
        confirmButtonText: "Yes, delete it!",
        background: "#1e1e1e",
        color: "white",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePropertybydmin(id);
        }
      });
  };

  const deletePropertybydmin = async (id) => {
    const payload = { id: id };
    await deleteProperty(payload);
    getAllPropertyList();
  };

  const searchProperty = propertylist?.filter((x) =>
  x.property_address
    .toString()
    .toLowerCase()
    .includes(searchPro.toString().toLowerCase())
) 
  return (
    // <PropertyContext.Provider value={propertylist}>
    <div className="main_body">
      <Header
        onchange={(event) => {
          setSearchPro(event.target.value);
        }}

      />
      {isSidebarOpen && (
        <AddnewUser
          open={isSidebarOpen}
          close={handleSidebar}
          getdetails={getUserList}
        />
      )}
      <div className="container-fluid">
        <div className="row">
          <div className="col-1 pr-0">
            <div
              className="nav flex-column nav-pills sideBar"
              aria-orientation="vertical"
            >
              <a
                className="nav-link pb-4"
                id="v-pills-home-tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <div>
                  <img src={side_op_1} />
                </div>
                {/* <span>Portfolio</span> */}
              </a>

            </div>
          </div>
          <div className="col-11 pl-0">
            <div
              className="tab-content main_content_wr"
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="row">
                  <div className="col-md-4 pr-0">
                    <div className="tab_head">
                      <img src={user} />
                      <h5>Users</h5>
                    </div>

                    <div
                      className="tab_body prop_location_accordian"
                      style={{ paddingLeft: "0" }}
                    >
                      {/* <div className="rowadmin buttonres"> */}
                      <div
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          display: "flex",
                        }}
                      >
                        <div
                          className="btn_wr"
                          style={{ width: "45%", paddingTop: "0px" }}
                        >
                          <button
                            className="purple_btn"
                            style={{ padding: "0 15px" }}
                          >
                            {userList?.length} results
                          </button>
                        </div>
                        <div
                          className="btn_wr"
                          style={{ width: "70%", paddingTop: "0px" }}
                        >
                          <button
                            className="purple_btn purplebuttonadminbut"
                            onClick={handleSidebar}
                          >
                            + Add New User
                          </button>
                        </div>
                      </div>
                      {userList?.map((item) => (
                        <div
                          key={item?.id}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignSelf: "center",
                            display: "flex",
                            paddingLeft: "10px",
                          }}
                          className={
                            userId === item?.id ? "activess" : "nonactive"
                          }
                          onClick={() => {
                            getUserPropertyList(item?.id);
                          }}
                        >
                          <img
                            className="adminbutfirstimage1 mt-2"
                            width="50"
                            height="50"
                            src={Group}
                          />
                          <div className="colorwhite admininput">
                            {formatCapilize(item?.userName)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-4 pr-0 pl-0">
                    <div className="tab_head header_center">
                      <img src={tab_head2} />
                      <h5>Properties</h5>
                    </div>
                    <div className="tab_body prop_location_accordian tab_body_center_div newhieght">
                      <div
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          display: "flex",
                        }}
                      > 
                        <div
                          className="btn_wr"
                          style={{ width: "45%", paddingTop: "0px" }}
                        >
                          <button
                            className="purple_btn"
                            style={{ padding: "0 15px" }}
                          >
                            {searchProperty?.length} results
                          </button>
                        </div>
                        <div
                          className="btn_wr"
                          style={{ width: "70%", paddingTop: "0px" }}
                        >
                          {/* <button className="purple_btn purplebuttonadminbut">
                            + Add New Property
                          </button> */}
                          <AddNewProperty
                            getPropertyList={getAllPropertyList}
                            admin={true}
                            userId={userId || null}
                            // PortfolioDatas={PortfolioData}
                            tour="three"
                          />
                        </div>
                      </div>
                      <div className="property_accordian">
                        <div className="accordion" id="accordionExample">
                          <div className=" ">
                            {searchProperty &&
                              searchProperty.map((item) => (
                                <div
                                  className="accordion"
                                  key={item.property_id}
                                  id="accordionExample"
                                >
                                  <div className=" ">
                                    <div
                                      className={
                                        selectedProperty == item?.property_id
                                          ? "accordion-body DDD"
                                          : "accordion-body"
                                      }
                                    >
                                      <div className="prop_location newside">
                                        <span>
                                          <img
                                            src={location}
                                            alt="Location Icon"
                                            width="30"
                                          />
                                        </span>
                                        <span>
                                          <a
                                            className="text-white ms-2"
                                            onClick={() => {
                                              handdleSelectedPropertyadmin(
                                                item?.property_id
                                              );
                                            }}
                                          >
                                            {item && item.property_address
                                              ?.replace(/,/, " ")
                                              ?.replace(/,/, "")}
                                          </a>
                                        </span>
                                      </div>
                                      <div className="roi d-flex justify-content-between">
                                        <span>
                                          <span className="yellow_text">
                                            ROI
                                          </span>{" "}
                                          {item && item?.Roi.toFixed(1)}%
                                        </span>
                                        <span>
                                          <span className="yellow_text">
                                            Mortgage Expiry
                                          </span>{" "}
                                          {item && item?.mortgage_expiry}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      id={`collapse${item?.property_id}`}
                                      className="accordion-collapse collapse "
                                      aria-labelledby="headingOne"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div
                                        className={
                                          selectedProperty == item?.property_id
                                            ? "accordion-body DDD"
                                            : "accordion-body"
                                        }
                                        style={{ marginTop: "-24px" }}
                                      >
                                        {/* <div className="prop_location newside">
                                          <span>
                                            <img
                                              src={location}
                                              alt="Location Icon"
                                            />
                                          </span>
                                          <span className="ms-2">
                                            {item && item.property_address}
                                          </span>
                                        </div>
                                        <div className="roi d-flex">
                                          <span>
                                            <span className="yellow_text">
                                              ROI
                                            </span>{" "}
                                            {item && item?.Roi.toFixed(1)}%
                                          </span>
                                          <span>
                                            <span className="yellow_text">
                                              Mortgage Expiry
                                            </span>{" "}
                                            {item && item?.mortgage_expiry}
                                          </span>
                                        </div> */}
                                        <div className="mni mt-1">
                                          <span>
                                            <span className="yellow_text">
                                              Monthly Net Income
                                            </span>{" "}
                                            £
                                            {formatNumber(
                                              item && item?.Monthly_net_income
                                            )}
                                          </span>
                                        </div>
                                        <div className="neq d-flex">
                                          <span>
                                            <span className="yellow_text">
                                              Net Equity
                                            </span>{" "}
                                            £
                                            {formatNumber(
                                              item && item.Net_equity
                                            )}
                                          </span>
                                          <span>
                                            {(
                                              (item?.Net_equity /
                                                item?.Property_value) *
                                              100
                                            ).toFixed(1)}
                                            %
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <h2
                                      className="accordion-header"
                                      id="headingOne"
                                    >
                                      <button
                                        className="accordion purple_bg_btn"
                                        type="button"
                                        data-bs-target={`#collapse${item?.property_id}`}
                                        aria-expanded="true"
                                        aria-controls={`collapse${item?.property_id}`}
                                        data-bs-toggle="collapse"
                                        onClick={() => {
                                          handdleAccordion(item?.property_id);
                                        }}
                                      >
                                        <img
                                          src={
                                            expand[item?.property_id]
                                              ? arrowdown
                                              : arrowup
                                          }
                                          alt="arrow-up"
                                          className="purple_bg_btn"
                                        />
                                      </button>
                                    </h2>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {propertylist.length > 0 && (
                    <PropertyDetails
                      id={selectedProperty || propertylist[0].property_id}
                      image={true}
                      letting={false}
                      admin={true}
                      deleteAlert={deleteAlert}
                      propertyactive={handdleSelectedPropertyadmin}
                    />
                  )}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
