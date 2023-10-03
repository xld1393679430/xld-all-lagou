import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/root.reducer";
import logger from "./middlewares/logger";
import thunk from "./middlewares/thunk";

export const store = createStore(rootReducer, applyMiddleware(logger, thunk));
