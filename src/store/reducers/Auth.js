import * as actionTypes from "../actionTypes";
import { updateObject } from "../../util/updateObject";

const initialState = {
  authData: null,
  loading: false,
  error: null,
};

const loginStart = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const login = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const loginSuccess = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const loginFailed = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const logOut = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);

    case actionTypes.LOGIN:
      return login(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.LOGIN_FAILED:
      return loginFailed(state, action);

    case actionTypes.LOGOUT:
      return logOut(state, action);

    default:
      return state;
  }
};

export default authReducer;
