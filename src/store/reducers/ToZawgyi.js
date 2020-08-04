import * as actionTypes from "../actionTypes";
import { updateObject } from "../../util/updateObject";

const initialState = {
  isZawgyi: false,
};

const toZawgyi = (state) => {
  return updateObject(state, { isZawgyi: !state.isZawgyi });
};

const toZawgyiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TO_ZAWGYI:
      return toZawgyi(state);
    default:
      return state;
  }
};

export default toZawgyiReducer;
