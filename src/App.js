import React from "react";
import "./App.css";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
// import { ThemeProvider, createTheme } from "@mui/material";
// import { getToken } from "./Helper/Storage";
import PublicRouter from "./router/PublicRouter";
import { PropertyContext, UserContext } from "./context";

// const theme = createTheme("dark");
function App() {
  const data = localStorage?.getItem("@userData");
  const userdata = data && JSON?.parse(data);
  const property = localStorage?.getItem("property");
  const PropertyData = property && JSON?.parse(property);
  const [userType, setUserType] = React.useState(userdata?.user_type);
  const [propertyData, setPropertyData] = React.useState(PropertyData || []);

  const updateUserType = (usertype) => {
    setUserType(usertype);
  };
  const updateProperty = (data) => {
    setPropertyData(data);
  };

  const token = window.localStorage.getItem("@userToken");
  return (
    <UserContext.Provider value={{ userType, updateUserType }}>
      <PropertyContext.Provider value={{ propertyData, updateProperty }}>
        <React.Fragment>
          {/* <ThemeProvider theme={theme}> */}
          <ToastContainer />
          {token ? <AppRouter /> : <PublicRouter />}
          {/* </ThemeProvider> */}
        </React.Fragment>
      </PropertyContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
