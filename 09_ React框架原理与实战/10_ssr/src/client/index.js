import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../share/routes";
import Home from "../share/pages/home";
import List from "../share/pages/list";

hydrate(
  <BrowserRouter>
    <Route path="/" component={Home} exact={true}></Route>
    <Route path="/list" component={List} exact={true}></Route>
  </BrowserRouter>,
  document.getElementById("root")
);
