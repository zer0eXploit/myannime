import * as actionTypes from "../actionTypes";
import axios from "../../util/axiosMyannime";

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

export const fetchVideoData = (pathName, redirectFunc) => (dispatch) => {
  dispatch(fetchVideoDataStart());
  axios
    .get("/Episodes/" + pathName + ".json")
    .then((res) => {
      const data = res.data;
      if (data) {
        const streamUrls = [];
        for (let key in data) {
          streamUrls.push(data[key]);
        }
        dispatch({
          type: actionTypes.FETCH_VIDEO_DATA,
          payload: {
            currentEpisode: pathName.split("/")[1],
            currentUrl: streamUrls[0],
            streamUrls: streamUrls,
          },
        });
      } else {
        redirectFunc("/Anime/" + pathName.split("/")[0]);
      }
      dispatch(fetchVideoDataSuccess());
    })
    .catch((error) => {
      console.log("[FETCH ANIME VIDEO DATA] " + error.response);
      dispatch(fetchVideoDataFailed(error));
    });
};

export const changeStreamUrl = (newUrl) => {
  return {
    type: actionTypes.CHANGE_STREAM_URL,
    payload: {
      currentUrl: newUrl,
    },
  };
};
