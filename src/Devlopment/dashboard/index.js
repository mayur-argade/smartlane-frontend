import PropTypes from "prop-types";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";

// ############################################## User searchPostCode   #######################################################

const getDashboardData = async (data) => {
  const response = await ApiServices("post", data, ApiEndPoints.DashboardData);

  return response;
};
const getPortfolioData = async (data) => {
  const response = await ApiServices("get", data, ApiEndPoints.SendPortfolio);

  return response;
};
// ############################################## PropTypes   #######################################################

getDashboardData.propTypes = {
  data: PropTypes.object,
};
getPortfolioData.propTypes = {
  data: PropTypes.object,
};

export { getDashboardData, getPortfolioData };
