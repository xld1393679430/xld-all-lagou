import React from 'react'
import { renderToString } from "react-dom/server";
import app from "./http";
import Home from "../share/pages/home";

app.get("/", (req, res) => {
  const home = renderToString(<Home />);

  console.log("333", home);

  res.send(`
	<html>
		<head>
			<title>React SSR</title>
		</head>
		<body>
			<div id="root">${home}</div>
			<script src="bundle.js"></script>
		</body>
	</html>
	`);
});
