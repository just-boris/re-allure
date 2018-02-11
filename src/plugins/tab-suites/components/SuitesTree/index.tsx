import * as React from "react";
import { ProcessedAllureSuite } from "../../interfaces";
import TreeNode from "../TreeNode";

interface Props {
  suite: ProcessedAllureSuite;
  resultUid?: string;
}

const SuitesTree: React.SFC<Props> = ({ suite, resultUid }) => {
  return (
    <div>
      <h1>Test suites</h1>
      <p>Summary: TODO</p>
      {suite.children &&
        suite.children.map(suite => (
          <TreeNode key={suite.uid} resultUid={resultUid} suite={suite} />
        ))}
    </div>
  );
};
export default SuitesTree;
