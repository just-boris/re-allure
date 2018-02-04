import * as React from "react";
import SuitesView from "./components/SuitesView";

window.allure.api.addTab({
  tabId: "suites",
  title: "Suites",
  route: "suites",
  render: () => <SuitesView />
});
