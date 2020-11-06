import * as actionTypes from "../actionTypes";
import axios from "../../util/axiosMyannime";

export const clearVideoData = () => {
  return {
    type: actionTypes.CLEAR_VIDEO_DATA,
  };
};

const fetchVideoDataStart = () => {
  return {
    type: actionTypes.FETCH_VIDEO_DATA_START,
    payload: { loading: true },
  };
};

const fetchVideoDataSuccess = () => {
  return {
    type: actionTypes.FETCH_VIDEO_DATA_SUCCESS,
    payload: { loading: false },
  };
};

const fetchVideoDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_VIDEO_DATA_FAILED,
    payload: { loading: false, error: error.message },
  };
};

export const fetchVideoData = (
  episodeId = "7d6dec98-8e6d-406d-a176-fafda0adde2f",
  redirectFunc
) => (dispatch) => {
  dispatch(fetchVideoDataStart());
  axios
    .get("/episode/" + episodeId)
    .then((res) => {
      if (res.data) {
        dispatch({
          type: actionTypes.FETCH_VIDEO_DATA,
          payload: {
            episodeInfo: res.data,
          },
        });
      } else {
        redirectFunc("/");
      }
      dispatch(fetchVideoDataSuccess());
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(fetchVideoDataFailed(error));
    });
};
