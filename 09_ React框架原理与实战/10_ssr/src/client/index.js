import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../share/routes";
import Home from "../share/pages/home";
import List from "../share/pages/list";
import store from "./store";

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Home} exact={true} />
      <Route path="/list" component={List} exact={true} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
