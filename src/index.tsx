import * as React from "react";
import { render } from "react-dom";
import "./pluginApi";
import App from "./components/App";

const pluginsRequire = require.context(
  "./plugins",
  true,
  /^\.\/[^\/]+\/index\.tsx$/
);

pluginsRequire.keys().forEach(plugin => pluginsRequire(plugin));

render(<App />, document.getElementById("app"));
