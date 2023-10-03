import { combineReducers } from "redux";
import counter from "./counter.reducer";
import modal from "./modal.reducer";
import counter2 from './counter2.reducer'

const rootReducer = combineReducers({
  counter,
  counter2,
  modal,
});

export default rootReducer