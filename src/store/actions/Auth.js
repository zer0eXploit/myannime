import * as actionTypes from "../actionTypes";
import axios from "../../util/axiosMyannime";

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
    payload: { loading: true, error: null },
  };
};

const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: { loading: false, error: null },
  };
};

const loginFailed = (error) => {
  let errorMessage = {};
  if (error.data.message_1) {
    for (let key in error.data) {
      errorMessage[key] = error.data[key];
    }
  } else {
    errorMessage = error.data.message;
  }

  return {
    type: actionTypes.LOGIN_FAILED,
    payload: { loading: false, error: errorMessage },
  };
};

const logOutTimeout = (timeoutPeriod) => (dispatch) => {
  console.log("Token expiring in: " + timeoutPeriod + " seconds.");
  setTimeout(() => {
    dispatch(getRefreshToken());
    console.log("Token expired. Getting new token...");
  }, timeoutPeriod * 1000);
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("username");
  localStorage.removeItem("name");

  return {
    type: actionTypes.LOGOUT,
    payload: { authData: null, error: null },
  };
};

export const autoAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.getItem("refresh_token");
    const name = localStorage.getItem("name");
    const username = localStorage.getItem("username");
    const expirationDate = localStorage.getItem("expirationDate"); // standard format
    const currentTime = new Date().getTime(); // in milliseconds
    const expirationTime = new Date(expirationDate).getTime(); // in milliseconds

    if (!token) {
      dispatch(authLogout());
    } else {
      if (expirationTime > currentTime) {
        const authData = {
          access_token: token,
          refresh_token: refresh_token,
          name: name,
          username: username,
        };
        dispatch({
          type: actionTypes.LOGIN,
          payload: {
            authData: authData,
          },
        });
        dispatch(logOutTimeout((expirationTime - currentTime) / 1000));
      } else {
        dispatch(authLogout());
      }
    }
  };
};

export const login = (username, password, redirectTo) => (dispatch) => {
  dispatch(loginStart());
  axios
    .post("/user/login", {
      username: username,
      password: password,
    })
    .then((res) => {
      const expirationDate = new Date(
        new Date().getTime() + res.data.expires_in * 1000,
      );
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("name", res.data.name);
      dispatch(logOutTimeout(res.data.expires_in));
      dispatch({
        type: actionTypes.LOGIN,
        payload: {
          authData: res.data,
        },
      });
      dispatch(loginSuccess());
      redirectTo("/MyAccount");
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(loginFailed(error.response));
    });
};

const getRefreshToken = () => async (dispatch) => {
  console.log("Getting refresh token...");
  // Get unchanging data for state update
  const refresh_token = localStorage.getItem("refresh_token");
  const name = localStorage.getItem("name");
  const username = localStorage.getItem("username");
  const expirationDate = localStorage.getItem("expirationDate");

  const headers = {
    Authorization: `Bearer ${refresh_token}`,
  };
  const response = await axios.post("/user/refresh", {}, { headers: headers });

  console.log(response);

  if (response.status === 200) {
    const newAccessToken = response.data.access_token;
    // Set the new access token
    localStorage.setItem("token", newAccessToken);

    const authData = {
      access_token: newAccessToken,
      refresh_token: refresh_token,
      name: name,
      username: username,
    };

    dispatch(logOutTimeout(expirationDate));
    dispatch({
      type: actionTypes.LOGIN,
      payload: {
        authData: authData,
      },
    });
  }
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
    payload: {
      error: null,
    },
  };
};
