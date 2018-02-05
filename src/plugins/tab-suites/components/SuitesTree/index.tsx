import * as React from "react";
import { AllureSuite } from "../../interfaces";
import Node from "../TreeNode";

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
