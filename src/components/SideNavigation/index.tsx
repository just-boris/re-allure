import "./styles.scss";
import * as bem from "b_";
import * as React from "react";
import { TabConfiguration } from "../../allure";
import { NavLink } from "react-router-dom";

const b = bem.with("SideNavigation");

interface SideNavigationProps {
  tabs: Array<TabConfiguration>;
}

export default function SideNavigation({ tabs }: SideNavigationProps) {
  return (
    <>
      <h1 className={b("title")}>Allure</h1>
      {tabs.map(({ tabId, route, title }) => (
        <NavLink
          className={b("item")}
          activeClassName={`${b("item")}_active`}
          key={tabId}
          to={`/${route}`}
        >
          {title}
        </NavLink>
      ))}
    </>
  );
}
