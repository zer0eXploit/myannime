import * as actionTypes from "../actionTypes";
import axios from "../../util/axiosMyannime";

const fetchAnimeDataStart = () => {
  return {
    type: actionTypes.FETCH_ANIME_DATA_START,
    payload: { loading: true },
  };
};

const fetchAnimeDataSuccess = () => {
  return {
    type: actionTypes.FETCH_ANIME_DATA_SUCCESS,
    payload: { loading: false },
  };
};

const fetchAnimeDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_ANIME_DATA_FAILED,
    payload: { loading: false, error: error.message },
  };
};

export const fetchAnimeData = () => (dispatch) => {
  dispatch(fetchAnimeDataStart());
  axios
    .get("http://127.0.0.1:5000/v1/animes", {
      params: {
        sort_by: "rating",
      },
    })
    .then((res) => {
      dispatch({
        type: actionTypes.FETCH_ANIME_DATA,
        payload: {
          animeData: res.data,
        },
      });
      dispatch(fetchAnimeDataSuccess());
    })
    .catch((error) => {
      console.log("[FETCH ANIME DATA] " + error.response);
      dispatch(fetchAnimeDataFailed(error));
    });
};
