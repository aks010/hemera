import { MODEL_TYPES } from "../actions/constants";
import initialState from "./intitalState";

const ModelTypes = (state = initialState.modelTypes, action) => {
  console.log("AT REDUCER");
  console.log(action.type);
  console.log(action.payload);
  if (action.type == MODEL_TYPES) {
    return action.payload;
  } else return state;
};

export default ModelTypes;
