import "./styles.scss";
import * as bem from "b_";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { ProcessedAllureSuite } from "../../interfaces";

const b = bem.with("TreeNode");

interface Props {
  suite: ProcessedAllureSuite;
  resultUid: string;
}

interface State {
  expanded: boolean;
}

export default class TreeNode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { suite, resultUid } = props;
    this.state = {
      expanded: suite.childrenUids ? suite.childrenUids.indexOf(resultUid) > -1 : false
    };
  }

  onExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render(): React.ReactNode {
    const { suite, resultUid } = this.props;
    const { expanded } = this.state;

    if (suite.children) {
      return (
        <div className={b("node")}>
          <h3 className={`${b("title", { expanded })} long-line`} onClick={this.onExpandClick}>
            {suite.name}
          </h3>
          {expanded &&
            suite.children.map(suite => (
              <TreeNode key={suite.uid} resultUid={resultUid} suite={suite} />
            ))}
        </div>
      );
    }
    return (
      <div className={b("node")}>
        <NavLink
          className={b("item")}
          activeClassName={`${b("item")}_active`}
          to={`/suites/${suite.uid}`}
        >
          {suite.name}
        </NavLink>
      </div>
    );
  }
}
