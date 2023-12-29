import PropTypes from "prop-types";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";

// ############################################## User searchPostCode   #######################################################

const searchPostCode = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.SearchPostcode);
  return response;
};

// ############################################## PropTypes   #######################################################

searchPostCode.propTypes = {
  data: PropTypes.object,
};

export { searchPostCode };
