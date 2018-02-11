import "./styles.scss";
import * as bem from "b_";
import axios from "axios";
import * as React from "react";
import { match, Route } from "react-router";
import SuitesTree from "../SuitesTree";
import SuiteResultView from "../SuiteResultView";
import { ProcessedAllureSuite } from "../../interfaces";
import { processSuite } from "./util";

const b = bem.with("SuitesView");

interface SuitesViewState {
  rootSuite?: ProcessedAllureSuite;
}

interface SuitesViewProps {
  match: match<{ resultUid?: string }>;
}

export class SuitesView extends React.Component<SuitesViewProps, SuitesViewState> {
  state: SuitesViewState = {};

  async componentDidMount() {
    const { data } = await axios.get("data/suites.json");
    this.setState({
      rootSuite: processSuite(data)
    });
  }

  render() {
    const { rootSuite } = this.state;
    const { resultUid } = this.props.match.params;
    if (!rootSuite) {
      return <div>Loading</div>;
    }

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
  }
}

export default function SuitesViewRoute() {
  return <Route path="/suites/:resultUid?" component={SuitesView} />;
}
