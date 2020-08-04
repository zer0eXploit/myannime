import * as actionTypes from "../actionTypes";
import { updateObject } from "../../util/updateObject";

const initialState = {
  animeData: null,
  loading: false,
  error: null,
};

const fetchAnimeDataStart = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchAnimeData = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchAnimeDataSuccess = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const fetchAnimeDataFailed = (state, action) => {
  return updateObject(state, { ...action.payload });
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ANIME_DATA_START:
      return fetchAnimeDataStart(state, action);

    case actionTypes.FETCH_ANIME_DATA:
      return fetchAnimeData(state, action);

    case actionTypes.FETCH_ANIME_DATA_SUCCESS:
      return fetchAnimeDataSuccess(state, action);

    case actionTypes.FETCH_ANIME_DATA_FAILED:
      return fetchAnimeDataFailed(state, action);

    default:
      return state;
  }
};

export default homeReducer;
