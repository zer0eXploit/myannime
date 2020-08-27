import * as actionTypes from "../actionTypes";
import { updateObject } from "../../util/updateObject";

const initialState = {
  currentEpisode: null,
  currentUrl: null,
  streamUrls: null,
  loading: false,
  error: null,
};

const clearVideoData = (state) => {
  return updateObject(state, { ...initialState });
};

const fetchVideoDataStart = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchVideoData = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchVideoDataSuccess = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchVideoDataFailed = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const changeStreamUrl = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_VIDEO_DATA:
      return clearVideoData(state);

    case actionTypes.FETCH_VIDEO_DATA_START:
      return fetchVideoDataStart(state, action);

    case actionTypes.FETCH_VIDEO_DATA:
      return fetchVideoData(state, action);

    case actionTypes.FETCH_VIDEO_DATA_SUCCESS:
      return fetchVideoDataSuccess(state, action);

    case actionTypes.FETCH_VIDEO_DATA_FAILED:
      return fetchVideoDataFailed(state, action);

    case actionTypes.CHANGE_STREAM_URL:
      return changeStreamUrl(state, action);

    default:
      return state;
  }
};

export default videoReducer;
