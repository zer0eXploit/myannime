import * as actionTypes from "../actionTypes";
import axios from "../../util/axiosMyannime";

const fetchAnimeDataStart = (sortMethod) => {
  return {
    type: actionTypes.FETCH_ANIME_DATA_START,
    payload: { loading: true, sortMethod: sortMethod },
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

export const fetchAnimeData = (page = 1, sortBy = "title") => (dispatch) => {
  dispatch(fetchAnimeDataStart(sortBy));
  axios
    .get("/animes", {
      params: {
        sort_by: sortBy,
        page: page,
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
