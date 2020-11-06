import * as actionTypes from "../actionTypes";
import { updateObject } from "../../util/updateObject";

const initialState = {
  animeInfo: null,
  error: null,
  loading: false,
};

const fetchInfoDataStart = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchInfoData = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchInfoDataSuccess = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchInfoDataFailed = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INFO_DATA_START:
      return fetchInfoDataStart(state, action);

    case actionTypes.FETCH_INFO_DATA:
      return fetchInfoData(state, action);

    case actionTypes.FETCH_INFO_DATA_SUCCESS:
      return fetchInfoDataSuccess(state, action);

    case actionTypes.FETCH_INFO_DATA_FAILED:
      return fetchInfoDataFailed(state, action);

    default:
      return state;
  }
};

export default infoReducer;
