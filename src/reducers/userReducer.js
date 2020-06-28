import initialState from "./intitalState";
import { USER_DETAILS } from "../actions/constants";

const UserReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case USER_DETAILS:
      return { ...state, ...actions.payload };
    default:
      return state;
  }
};

export default UserReducer;
