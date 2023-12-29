import PropTypes from "prop-types";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";

// ############################################## User searchPostCode   #######################################################

const notificationList = async (data) => {
  const response = await ApiServices(
    "get",
    data,
    ApiEndPoints.NotificationList
  );

  return response;
};
const notificationClear = async () => {
  const response = await ApiServices("put", "", ApiEndPoints.ClearNotification);
  return response;
};
const notificationClearDoc = async () => {
  const response = await ApiServices(
    "put",
    "",
    ApiEndPoints.ClearDocNotification
  );
  return response;
};
const notificationSeen = async (data) => {
  const response = await ApiServices(
    "put",
    data,
    ApiEndPoints.SeenNotification
  );
  return response;
};
const notificationSeenDoc = async (data) => {
  const response = await ApiServices(
    "put",
    data,
    ApiEndPoints.SeenDocNotification
  );
  return response;
};
const CountNotification = async (data) => {
  const response = await ApiServices(
    "get",
    data,
    ApiEndPoints.CountNotification
  );
  return response;
};

// ############################################## PropTypes   #######################################################

notificationList.propTypes = {
  data: PropTypes.object,
};
notificationSeen.propTypes = {
  data: PropTypes.object,
};

notificationClear.propTypes = {
  data: PropTypes.object,
};
CountNotification.propTypes = {
  data: PropTypes.object,
};
notificationSeenDoc.propTypes = {
  data: PropTypes.object,
};
notificationClearDoc.propTypes = {
  data: PropTypes.object,
};

export {
  notificationList,
  notificationClear,
  notificationSeen,
  CountNotification,
  notificationSeenDoc,
  notificationClearDoc,
};
