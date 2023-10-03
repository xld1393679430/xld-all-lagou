import { Hide, Show } from "../constant/modal.const";

const initialState = {
  visible: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Show:
      return {
        ...state,
        visible: true,
      };
    case Hide:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};
