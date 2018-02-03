import { AllurePlugins, TabConfiguration } from "./allure";

class AllurePluginsRegistry implements AllurePlugins {
  private tabs: Array<TabConfiguration> = [];

  addTab(config: TabConfiguration) {
    this.tabs.push(config);
  }

  getTabs() {
    return this.tabs;
  }
}

window.allure = {
  api: new AllurePluginsRegistry()
};
