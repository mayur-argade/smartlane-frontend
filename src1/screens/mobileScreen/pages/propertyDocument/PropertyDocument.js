import React, { createContext, useContext } from "react";
import "../../../../assets/css/style.css";
import mbtogel from "../../../../assets/img/mb-togel.svg";
import group from "../../../../assets/img/Group 201.svg";
import bg1 from "../../../../assets/img/property.png";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { HeaderForMobile } from "../../../../component/header/Header";
import { documentList } from "../../../../Devlopment/property";
import { PropertyList } from "../propertyExpanded/context";
import leftarrow from "../../../../assets/img/leftarrow.svg";

export const PropertyDocList = createContext(null);

const PropertyDocument = () => {
  const [propertyDocList, setPropertyDocList] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useContext(PropertyList);
  const allData = data;
  const [newId, setNewId] = React.useState(
    allData?.findIndex((x) => x?.property_id == id || 0)
  );
  const [currentIndex, setCurrentIndex] = React.useState(
    allData?.findIndex((x) => x?.property_id == id || 0)
  );
  const location = useLocation();
  const { status } = location.state || {};

  React.useEffect(() => {
    getDocumentList();
  }, [newId]);

  const getDocumentList = async () => {
    const payload = { property_id: id };
    const response = await documentList(payload);
    response.success && setPropertyDocList(response.data);
  };
  const handlePropertyChangeNext = (event) => {
    event.preventDefault();
    setNewId(newId + 1);
    navigate(
      `/property-document/${status}/${allData[newId + 1]?.property_id}`,
      {
        state: { status: status },
      }
    );
    if (currentIndex < allData?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePropertyChangePrev = (event) => {
    event.preventDefault();
    setNewId(newId - 1);
    navigate(
      `/property-document/${status}/${allData[newId - 1]?.property_id}`,
      {
        state: { status: status },
      }
    );
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <PropertyDocList.Provider value={{ propertyDocList, getDocumentList }}>
      <div className="welcome_main" style={{ paddingTop: "0" }}>
        <HeaderForMobile
          path={`/property-expanded/${id}`}
          states={{ status: status }}
          logo={mbtogel}
          title={`${status} info`}
          notification={true}
        />
        <div className="lead_slide" style={{ marginTop: "5px" }}></div>
        <div className="main_lead_board bgColor_forProp">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="property_top">
                  {currentIndex > 0 && (
                    <a
                      className="prevbtn"
                      href=""
                      onClick={handlePropertyChangePrev}
                    >
                      <img
                        className="widthhundererd"
                        style={{ width: "30px", paddingBottom: "10px" }}
                        src={leftarrow}
                      />
                    </a>
                  )}
                  <p className="fonttwenty pt-2">
                    {allData &&
                      allData[currentIndex]?.property_address
                        ?.replace(/,/, " ")
                        ?.replace(/,/, "")}
                    &nbsp;
                    {allData && allData[currentIndex]?.property_name}
                  </p>
                  {currentIndex < allData?.length - 1 && (
                    <a
                      className="arrow_nextBtn arrowbuttonnext"
                      href=""
                      onClick={handlePropertyChangeNext}
                    >
                      <img
                        className="widthhundererd"
                        style={{ width: "20px", paddingBottom: "5px" }}
                        src={group}
                      />
                    </a>
                  )}
                </div>
                <div className="lead_slide slideleadtwo"></div>
              </div>
            </div>
          </div>
          <div className="lead_bar mb-3 text-center">
            <img src={bg1} className="w-100" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                {/* <div className="text-white pt-2">
                  <h4>Checklist</h4>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check1"
                    />
                    <label className="form-check-label" htmlFor="Check1">
                      Upload or Update 4 Property Documents
                    </label>
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Check2"
                    />
                    <label className="form-check-label" htmlFor="Check2">
                      Upload or Update 2 Lettings Documents
                    </label>
                  </div>
                </div> */}
              </div>
              <div className="col-sm-12">
                <div className="head_leet d-csflex">
                  <h4>Documents</h4>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="letting_tab">
                  <div className="tab-content">
                    {propertyDocList && <Outlet />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PropertyDocList.Provider>
  );
};

export default PropertyDocument;
