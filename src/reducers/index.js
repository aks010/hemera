import { combineReducers } from "redux";
import user from "./userReducer";
import bannerList from "./bannerList";
import categoryList from "./categoryList";
import notification from "./notifications";
import selected from "./selected";
import modelList from "./modelList";

const reducers = {
  user,
  bannerList,
  notification,
  categoryList,
  selected,
  modelList,
};

export default combineReducers(reducers);
