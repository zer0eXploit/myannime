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
    .get("/Home.json", {
      params: {
        limitToLast: 50,
        orderBy: '"$value"',
      },
    })
    .then((res) => {
      const data = res.data;
      const animeDataArray = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key].name = key;
          data[key].posterURL = data[key].pU;
          delete data[key].pU;
          animeDataArray.push(data[key]);
        }
      }
      dispatch({
        type: actionTypes.FETCH_ANIME_DATA,
        payload: {
          animeData: animeDataArray,
        },
      });
      dispatch(fetchAnimeDataSuccess());
    })
    .catch((error) => {
      console.log("[FETCH ANIME DATA] " + error.response);
      dispatch(fetchAnimeDataFailed(error));
    });
};
