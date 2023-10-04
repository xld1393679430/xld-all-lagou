import { createSlice } from "@reduxjs/toolkit";

export const PREPARE = "prepare";

const { reducer: PrepareReducer, actions } = createSlice({
  name: PREPARE,
  initialState: [],
  reducers: {
    addTodoPrepare: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (state) => {
        return { payload: { ...state, id: Math.random()} }
      }
    }
  },
});

export const { addTodoPrepare } = actions;

export default PrepareReducer;
