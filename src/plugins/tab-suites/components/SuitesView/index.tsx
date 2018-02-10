import "./styles.scss";
import * as bem from "b_";
import axios from "axios";
import * as React from "react";
import { Route } from "react-router";
import SuitesTree from "../SuitesTree";
import SuiteResultView from "../SuiteResultView";
import { AllureSuite, ProcessedAllureSuite } from "../../interfaces";

const b = bem.with("SuitesView");

interface SuitesViewState {
  rootSuite?: ProcessedAllureSuite;
}

interface SuitesViewProps {}

function processSuite(suite: AllureSuite): ProcessedAllureSuite {
  const result = suite as ProcessedAllureSuite;
  result.childrenUids = [];
  if (suite.children) {
    suite.children.forEach(child => {
      const processed = processSuite(child);
      result.childrenUids.push(...processed.childrenUids);
    });
  } else {
    result.childrenUids = [result.uid];
  }
  return result;
}

export default class SuitesView extends React.Component<SuitesViewProps, SuitesViewState> {
  state: SuitesViewState = {};

  async componentDidMount() {
    const { data } = await axios.get("data/suites.json");
    this.setState({
      rootSuite: processSuite(data)
    });
  }

  render() {
    const { rootSuite } = this.state;
    if (!rootSuite) {
      return <div>Loading</div>;
    }

    return (
      <Route
        path="/suites/:resultUid?"
        render={props => {
          const { resultUid } = props.match.params;
          return (
            <div className={b()}>
              <div className={b("panel")}>
                <SuitesTree resultUid={resultUid} suite={rootSuite} />
              </div>
              {resultUid && (
                <div className={b("panel")}>
                  <SuiteResultView resultUid={resultUid} />
                </div>
              )}
            </div>
          );
        }}
      />
    );
  }
}
