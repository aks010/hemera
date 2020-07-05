import { SPECIFICATIONS } from "../actions/constants";
import initialState from "./intitalState";

const Specifications = (state = initialState.specification, action) => {
  if (action.type === SPECIFICATIONS) {
    return action.payload;
  } else return state;
};

export default Specifications;
