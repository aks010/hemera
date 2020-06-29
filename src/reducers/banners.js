import { BANNER_LIST } from "../actions/constants";
import initialState from "./intitalState";

const BannersList = (state = initialState, action) => {
  if (action.type === BANNER_LIST) {
    return action.payload;
  } else return state;
};

export default BannersList;
