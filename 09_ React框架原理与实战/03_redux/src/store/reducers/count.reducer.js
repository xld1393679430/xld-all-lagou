import { Decrement, Increment } from "../constant/counter.const";

const initialState = {
  count: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Increment:
      return {
        count: state.count + action.payload,
      };
    case Decrement:
      return {
        count: state.count - action.payload,
      };
    default:
      return state;
  }
};
