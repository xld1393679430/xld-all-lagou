import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import counter from "./store/counter";
import todos from "./store/todos";

const root = document.getElementById("root");
render(
  <Provider counter={counter} todos={todos}>
    <App />
  </Provider>,
  root
);
