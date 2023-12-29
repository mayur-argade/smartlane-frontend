import PropTypes from "prop-types";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";

// ############################################## User searchPostCode   #######################################################

const getUserList = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.FilterUser);
  return response;
};

const filterUser = async (data) => {
  const response = await ApiServices("post", data, ApiEndPoints.FilterUser);
  return response;
};

// ############################################## PropTypes   #######################################################

getUserList.propTypes = {
  data: PropTypes.object,
};
filterUser.propTypes = {
  data: PropTypes.object,
};

export { getUserList, filterUser };
