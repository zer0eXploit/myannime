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

export const fetchInfoData =
  (animeId, redirectFunc, accessToken) => (dispatch) => {
    dispatch(fetchInfoDataStart());
    let headers = null;
    if (accessToken) {
      headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
    axios
      .get("/anime/" + animeId, { headers: headers })
      .then((res) => {
        const data = res.data;
        if (data) {
          if (data.anime_bookmarked) {
            dispatch({
              type: actionTypes.SET_BOOKMARK_OPTION,
              payload: { animeBookmarked: true },
            });
          } else {
            dispatch({
              type: actionTypes.SET_BOOKMARK_OPTION,
              payload: { animeBookmarked: false },
            });
          }
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

export const setBookmarkOption = (animeBookmarked, animeId) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  let METHOD = "POST";
  // because animeBookmarked passed as argument is the opposite of current state
  // re-negate animeBookmarked to get the current state
  // if animeBookmarked is True, we need to remove the anime from user's collection
  // else add the anime to user's collection
  if (!animeBookmarked) {
    METHOD = "DELETE";
  }

  return async (dispatch) => {
    const result = await axios({
      method: METHOD,
      url: "/user/save_anime",
      data: {
        anime_id: animeId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.status === 200 || result.status === 201) {
      dispatch({
        type: actionTypes.SET_BOOKMARK_OPTION,
        payload: { animeBookmarked: animeBookmarked },
      });
    }
  };
};
