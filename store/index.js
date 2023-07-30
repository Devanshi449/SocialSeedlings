import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";


export const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

store.subscribe(() => {
  // console.log(store.getState())
});

