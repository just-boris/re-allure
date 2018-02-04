import { ReactChild } from "react";

interface TabConfiguration {
  tabId: string;
  title: string;
  icon?: string;
  route: string;
  render: () => ReactChild;
}

interface AllurePlugins {
  addTab(config: TabConfiguration): void;

  getTabs(): Array<TabConfiguration>;
}

interface AllureApi {
  api: AllurePlugins;
}

declare global {
  interface Window {
    allure: AllureApi;
  }
}
