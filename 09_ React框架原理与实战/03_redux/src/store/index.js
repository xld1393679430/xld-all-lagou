import { createStore } from "redux";
import reducer from "./reducers/count.reducer";

export const store = createStore(reducer);