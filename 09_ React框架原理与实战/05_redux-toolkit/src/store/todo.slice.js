import { createSlice } from "@reduxjs/toolkit";

export const TODOS = "todos";

const { reducer: TodosReducer, actions } = createSlice({
  name: TODOS,
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTodo } = actions;

export default TodosReducer;
