import { combineReducers } from "redux";
import { appReducer } from "./app";
// import { reducer as formReducer } from "redux-form";

export default combineReducers({
  app: appReducer,
  // form: formReducer,
});