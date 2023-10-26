import { matchRoutes } from "react-router-config";
import app from "./http";
import renderer from "./renderer";
import createStore from "./store";
import routes from "../share/routes";

app.get("*", (req, res) => {
  const store = createStore();
  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    console.log(23333, route);
    if (route.loadData) {
      return route.loadData(store);
    }
  });
  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});
