import { combineReducers } from "redux";
import user from "./userReducer";
import bannerList from "./banners";
import notification from "./notifications";

const reducers = {
  user,
  bannerList,
  notification,
};

export default combineReducers(reducers);
