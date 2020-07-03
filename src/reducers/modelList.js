import { MODEL_LIST } from "../actions/constants";
import initialState from "./intitalState";

const ModelList = (state = initialState.bannerList, action) => {
  if (action.type === MODEL_LIST) {
    return action.payload;
  } else return state;
};

export default ModelList;
