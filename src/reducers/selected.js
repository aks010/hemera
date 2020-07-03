import {
  SELECT_BANNER,
  SELECT_CATEGORY,
  SELECT_TYPE,
  SELECT_MODEL,
} from "../actions/constants";
import initialState from "./intitalState";

const Selected = (state = initialState.categoryList, action) => {
  switch (action.type) {
    case SELECT_BANNER: {
      const banner = action.payload;
      return { ...state, banner };
    }
    case SELECT_CATEGORY: {
      const category = action.payload;
      return { ...state, category };
    }
    case SELECT_TYPE: {
      const type = action.payload;
      return { ...state, type };
    }
    case SELECT_MODEL: {
      const model = action.payload;
      return { ...state, model };
    }
    default:
      return state;
  }
};

export default Selected;
