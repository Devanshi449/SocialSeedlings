
import { combineReducers } from "redux";
import dataReducer from "./data";

const reducers = combineReducers({
  data: dataReducer,
});

export default reducers;
