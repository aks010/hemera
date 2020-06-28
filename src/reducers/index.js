import { combineReducers } from "redux";
import UserReducer from "./userReducer";

const reducers = {
  user: UserReducer,
};

export default combineReducers(reducers);
