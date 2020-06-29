import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import initialState from "./reducers/intitalState";
const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
