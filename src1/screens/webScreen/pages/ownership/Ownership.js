import React from "react";
import "../../../../assets/css/web.css";
import PropertyDetails from "../dashboard/propertyDetails";
import Header from "../../../../component/header/Header";
import sideop from "../../../../assets/web-img/side_op_1.svg";
import OwnershipDocument from "./OwnershipDocument";
import OwnershipDetails from "./OwnershipDetails";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Ownership = ({ admin }) => {
  const location = useLocation();
  const data = location?.state;
  const [propertyID, setPropertyID] = React.useState(data?.id);

  const handleChange = (id) => {
    setPropertyID();
    setPropertyID(id);
  };

  return (
    <div className="main_body">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-1 pr-0">
            <div
              className="nav flex-column nav-pills sideBar"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className="nav-link active"
                id="v-pills-home-tab"
                data-toggle="pill"
                href="#v-pills-home"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <div>
                  <img src={sideop} />
                </div>
                <span>Portfolio</span>
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
                  {data?.id && (
                    <>
                      <PropertyDetails
                        id={data?.id}
                        admin={admin ? true : false}
                        onPropertyChange={handleChange}
                      />
                    </>
                  )}
                  {propertyID && (
                    <OwnershipDetails
                      id={propertyID}
                      admin={admin}
                      userId={data?.userId}
                    />
                  )}
                  {propertyID && (
                    <OwnershipDocument
                      id={propertyID}
                      admin={admin}
                      userId={data?.userId}
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

Ownership.propTypes = {
  admin: PropTypes.any,
};

export default Ownership;
