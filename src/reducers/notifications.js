import { DISPLAY_NOTIFICATION } from "../actions/constants";
import initialState from "./intitalState";

const Notification = (state = initialState.notification, action) => {
  if (action.type === DISPLAY_NOTIFICATION) return action.payload;
  else return state;
};

export default Notification;
