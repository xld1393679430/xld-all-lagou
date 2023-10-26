import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../share/routes";

export default (req, store) => {
  const Component = routes.find((item) => item.path === req.path).component;
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>{<Component />}</StaticRouter>
    </Provider>
  );

  return `
  <html>
	  <head>
		  <title>React SSR</title>
	  </head>
	  <body>
		  <div id="root">${content}</div>
		  <script src="client.js"></script>
	  </body>
  </html>
  `;
};
