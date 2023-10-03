import { handleActions as createReducer } from "redux-actions";
import { decrement, increment } from "../actions/counter2.redux-actions";

const initialState = {
  count: 0,
};

export default createReducer(
  {
    [increment]: (state, action) => ({ ...state, count: state.count + 1 }),
    [decrement]: (state, action) => ({ ...state, count: state.count - 1 }),
  },
  initialState
);
