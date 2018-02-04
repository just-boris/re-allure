import "./styles.scss";
import * as bem from "b_";
import * as React from "react";
import { Route } from "react-router-dom";
import SideNavigation from "../SideNavigation";

const b = bem.with('App');

export default function App() {
  const tabs = window.allure.api.getTabs();
  return (
    <div className={b()}>
      <div className={b('nav')}>
        <SideNavigation tabs={tabs} />
      </div>
      <div className={b('body')}>
        {tabs.map(({ tabId, route, render }) => (
          <Route key={tabId} path={`/${route}`} render={render} />
        ))}
      </div>
    </div>
  );
}
