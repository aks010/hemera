import { combineReducers } from "redux";
import user from "./users";
import bannerList from "./bannerList";
import categoryList from "./categoryList";
import notification from "./notifications";
import selected from "./selected";
import modelList from "./modelList";
import specification from "./specification";
import modelTypes from "./modelTypes";

const reducers = {
  user,
  bannerList,
  notification,
  categoryList,
  selected,
  modelList,
  modelTypes,
  specification,
};

export default combineReducers(reducers);
