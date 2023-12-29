import PropTypes from "prop-types";
import React, { createContext } from "react";
export const PropertyList = createContext(null);
const Property = ({ children }) => {
  const propert = localStorage.getItem("propertyData");

  const propertData = propert ? [] : JSON.parse(propert);
  const [data, setData] = React.useState(propertData || []);

  const updateData = (newData) => {
    setData(newData);
  };
  return (
    <PropertyList.Provider value={{ data, updateData }}>
      {children}
    </PropertyList.Provider>
  );
};
Property.propTypes = {
  children: PropTypes.any,
};
export default Property;
