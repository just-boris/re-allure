import "./styles.scss";
import * as React from "react";
import * as bem from "b_";
import { NavLink } from "react-router-dom";
import { AllureSuite } from "../../interfaces";

const b = bem.with("SuitesTree");

const Node: React.SFC<{ suite: AllureSuite }> = ({ suite }) => {
  if (suite.children) {
    return (
      <div className={b("node")}>
        <h3 className="long-line">{suite.name}</h3>
        {suite.children.map(suite => <Node key={suite.uid} suite={suite} />)}
      </div>
    );
  }
  return (
    <div className={b("node")}>
      <NavLink className={b("item")} activeClassName={`${b("item")}_active`} to={`/suites/${suite.uid}`}>
        {suite.name}
      </NavLink>
    </div>
  );
};

const SuitesTree: React.SFC<{ suite: AllureSuite }> = ({ suite }) => {
  return (
    <div>
      <h1>Test suites</h1>
      <p>Summary: TODO</p>
      {suite.children &&
        suite.children.map((suite: AllureSuite) => <Node key={suite.uid} suite={suite} />)}
    </div>
  );
};
export default SuitesTree;
