import { CATEGORY_LIST } from "../actions/constants";
import initialState from "./intitalState";

const CategoryList = (state = initialState.categoryList, action) => {
  if (action.type === CATEGORY_LIST) {
    return action.payload;
  } else return state;
};

export default CategoryList;
