import PropTypes from "prop-types";
import ApiEndPoints from "../../Network_call/ApiEndPoints";
import ApiServices from "../../Network_call/apiservices";
import { toast } from "react-toastify";

// ############################################## User searchPostCode   #######################################################

const addPropertList = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.AddProperty);
  toast(response?.msg);
  return response;
};

const addPropertbyAdmin = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.AdminAddProperty
  );
  toast(response?.msg);
  return response;
};

const propertySaleValue = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.PropertySaleValue
  );
  !response?.success 
  return response;
};

const propertList = async () => {
  
  const response = await ApiServices("get", "", ApiEndPoints.PropertList);
  return response;
};
const adminPropertList = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.AdminPropertList
  );
  return response;
};

const allPropertList = async () => {
  const response = await ApiServices("GET", "", ApiEndPoints.AllPropertList);
  return response;
};

const Monthlyvaluation = async (data) => {
  const response = await ApiServices(
    "post",
    data,
    ApiEndPoints.MonthlyValuation
  );
  return response;
};

const propertDetail = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.PropertyDetails
  );
  return response;
};
const propertDetailforAdmin = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.PropertyDetailsAdmin
  );
  return response;
};

const propertyDocUpload = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.PropertyDocUpload,
    {},
    true
  );
  toast(response?.msg);
  return response;
};
const propertyDocUploadbyAdmin = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.AdminDocumentUpload,
    {},
    true
  );
  toast(response?.msg);
  return response;
};

const documentList = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.DocumentList);
  return response;
};

const AllDocumentList = async () => {
  const response = await ApiServices("get", "", ApiEndPoints.AllDocumentList);
  return response;
};
const GetDocuments = async (data) => {
  const response = await ApiServices(
    "get",
    "",
    ApiEndPoints.GetDocument + data
  );
  return response;
};
const GetExpiryDocuments = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.GetDocExpiry);
  return response;
};
const documentsExpire = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.DocExpire);
  return response;
};
const docNotificationList = async (data) => {
  const response = await ApiServices(
    "GET",
    data,
    ApiEndPoints.DocNotificationList
  );
  return response;
};

const adminDocumentList = async (data) => {
  const response = await ApiServices(
    "POST",
    data,
    ApiEndPoints.AdminDocumentList
  );
  return response;
};

const expireInsurace = async (data) => {
  const response = await ApiServices("POST", data, ApiEndPoints.ExpireInsurace);
  return response;
};
const deleteProperty = async (data) => {
  const response = await ApiServices(
    "delete",
    data,
    ApiEndPoints.PropertyDelete
  );
  toast(response?.msg);
  return response;
};

const propertyEdit = async (data) => {
  console.log("apicall")
 const response = await ApiServices("PUT", data, ApiEndPoints.PropertyEdit);
 // toast(response?.msg);
 console.log("response" , response)

  return response;
};

const AdminRoiEdit = async (data) => {
  console.log("apicall")
  const response = await ApiServices(
    "PUT",
    data,
    ApiEndPoints.AdminPropertyEdit
  );
  console.log("response" , response)
  toast(response?.msg);
  return response;
};

// ############################################## PropTypes   #######################################################

propertList.propTypes = {
  data: PropTypes.object,
};

adminPropertList.propTypes = {
  data: PropTypes.object,
};

propertDetail.propTypes = {
  data: PropTypes.object,
};

allPropertList.propTypes = {
  data: PropTypes.object,
};
addPropertbyAdmin.propTypes = {
  data: PropTypes.object,
};
propertDetailforAdmin.propTypes = {
  data: PropTypes.object,
};

addPropertList.propTypes = {
  data: PropTypes.object,
};

propertySaleValue.propTypes = {
  data: PropTypes.object,
};

propertyDocUpload.propTypes = {
  data: PropTypes.object,
};

documentList.propTypes = {
  data: PropTypes.object,
};
deleteProperty.propTypes = {
  data: PropTypes.object,
};
adminDocumentList.propTypes = {
  data: PropTypes.object,
};
Monthlyvaluation.propTypes = {
  data: PropTypes.any,
};
AllDocumentList.propTypes = {
  data: PropTypes.any,
};
propertyDocUploadbyAdmin.propTypes = {
  data: PropTypes.any,
};
GetDocuments.propTypes = {
  data: PropTypes.any,
};
AdminRoiEdit.propTypes = {
  data: PropTypes.any,
};
GetExpiryDocuments.propTypes = {
  data: PropTypes.any,
};
expireInsurace.propTypes = {
  data: PropTypes.any,
};
documentsExpire.propTypes = {
  data: PropTypes.any,
};
docNotificationList.propTypes = {
  data: PropTypes.any,
};

export {
  propertList,
  addPropertList,
  propertDetail,
  propertyDocUpload,
  documentList,
  propertyEdit,
  propertySaleValue,
  adminPropertList,
  allPropertList,
  deleteProperty,
  propertDetailforAdmin,
  adminDocumentList,
  addPropertbyAdmin,
  Monthlyvaluation,
  AllDocumentList,
  propertyDocUploadbyAdmin,
  GetDocuments,
  AdminRoiEdit,
  GetExpiryDocuments,
  expireInsurace,
  documentsExpire,
  docNotificationList,
};
