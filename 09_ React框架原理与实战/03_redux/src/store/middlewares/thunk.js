import { Decrement, Increment } from "../constant/counter.const";

// eslint-disable-next-line import/no-anonymous-default-export
export default (store) => (next) => (action) => {
  if (typeof action === 'function') {
	return action(store.dispatch)
  }
  next(action)
};
