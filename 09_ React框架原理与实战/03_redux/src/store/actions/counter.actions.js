import { Decrement, Increment } from "../constant/counter.const";

export const increment = (payload) => ({ type: Increment, payload });
export const decrement = (payload) => ({ type: Decrement, payload });

export const incrementAsync = (payload) => (dispatch) => {
  setTimeout(() => {
    dispatch(increment(payload));
  }, 2000);
};

export const decrementAsync = (payload) => (dispatch) => {
  setTimeout(() => {
    dispatch(decrement(payload));
  }, 2000);
};
