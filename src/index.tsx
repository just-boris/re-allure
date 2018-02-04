import "./styles.scss";
import * as React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import "./pluginApi";
import App from "./components/App";

const pluginsRequire = require.context("./plugins", true, /^\.\/[^\/]+\/index\.tsx$/);

pluginsRequire.keys().forEach(plugin => pluginsRequire(plugin));

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("app")
);
