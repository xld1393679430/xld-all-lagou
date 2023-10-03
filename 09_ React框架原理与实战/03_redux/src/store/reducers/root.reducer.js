import { combineReducers } from "redux";
import counter from "./counter.reducer";
import modal from "./modal.reducer";

const rootReducer = combineReducers({
  counter,
  modal,
});

export default rootReducer