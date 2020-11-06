import * as actionTypes from "../actionTypes";
import axios from "../../util/axiosMyannime";

const fetchInfoDataStart = () => {
  return {
    type: actionTypes.FETCH_INFO_DATA_START,
    payload: { loading: true },
  };
};

const fetchInfoDataSuccess = () => {
  return {
    type: actionTypes.FETCH_INFO_DATA_SUCCESS,
    payload: { loading: false },
  };
};

const fetchInfoDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_INFO_DATA_FAILED,
    payload: { loading: false, error: error.message },
  };
};

export const fetchInfoData = (animeId, redirectFunc) => (dispatch) => {
  dispatch(fetchInfoDataStart());
  axios
    .get("/anime/" + animeId)
    .then((res) => {
      const data = res.data;
      if (data) {
        dispatch({
          type: actionTypes.FETCH_INFO_DATA,
          payload: {
            animeInfo: data,
          },
        });
        dispatch(fetchInfoDataSuccess());
      } else {
        redirectFunc("/");
        // dispatch(fetchInfoDataFailed({ message: "returned null" }));
      }
    })
    .catch((error) => {
      console.log("[FETCH ANIME INFO] " + error.response);
      dispatch(fetchInfoDataFailed(error));
    });
};
