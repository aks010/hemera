import { DISPLAY_NOTIFICATION } from "../actions/constants";
import initialState from "./intitalState";

const Notification = (state = initialState, action) => {
  if (action.type === DISPLAY_NOTIFICATION)
    return { ...state, ...action.payload };
  else return state;
};

export default Notification;
