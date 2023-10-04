import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

export const TODOS = "todos";

const todosAdapter = createEntityAdapter()

console.log(todosAdapter.getInitialState(), 99998);

const getTodos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ title: "任务x" }, { title: "任务y" }]);
    }, 1000);
  });
};

export const loadTodos = createAsyncThunk(`${TODOS}/loadTodos`, (payload) => getTodos());

const { reducer: TodosReducer, actions } = createSlice({
  name: TODOS,
  initialState: [],
  // 同步reducer
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    setTodos: (state, action) => {
      action.payload.forEach((todo) => state.push(todo));
    },
  },
  // 异步reducers
  extraReducers: {
    [loadTodos.fulfilled]: (state, action) => {
      action.payload.forEach((todo) => state.push(todo));
    }
  }
});

export const { addTodo, setTodos } = actions;

export default TodosReducer;
