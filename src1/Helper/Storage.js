const setUserData = async (userData) => {
  window.localStorage.setItem("@userData", userData);
};
const getUserdata = async () => {
  let value = await window.localStorage.getItem("@userData");
  if (value !== null) {
    return value;
  }
  return null;
};

const setToken = async (userToken) => {
  window.localStorage.setItem("@userToken", userToken);
};

const getToken = async () => {
  let value = await window.localStorage.getItem("@userToken");

  if (value !== null) {
    return value;
  }
  return null;
};

export { setUserData, setToken, getToken, getUserdata };
