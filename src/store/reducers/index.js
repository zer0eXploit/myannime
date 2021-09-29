import { combineReducers } from "redux";

import homeReducer from "./Home";
import animeInfoReducer from "./Anime-Info";
import animeVideoReducer from "./Video";
import toZawgyiReducer from "./ToZawgyi";
import authReducer from "./Auth";

const rootReducer = combineReducers({
  home: homeReducer,
  info: animeInfoReducer,
  video: animeVideoReducer,
  auth: authReducer,
  mmfont: toZawgyiReducer,
});

export default rootReducer;
