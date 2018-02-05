import "./styles.scss";
import * as bem from "b_";
import axios from "axios";
import * as React from "react";
import { Route } from "react-router";
import SuitesTree from "../SuitesTree";
import SuiteResultView from "../SuiteResultView";
import { AllureSuite } from "../../interfaces";

const b = bem.with("SuitesView");

interface SuitesViewState {
  rootSuite?: AllureSuite;
}

interface SuitesViewProps {}

export default class SuitesView extends React.Component<SuitesViewProps, SuitesViewState> {
  state: SuitesViewState = {};

  async componentDidMount() {
    const { data } = await axios.get("data/suites.json");
    this.setState({
      rootSuite: data
    });
  }

  render() {
    const { rootSuite } = this.state;
    if (!rootSuite) {
      return <div>Loading</div>;
    }

    return (
      <div className={b()}>
        <div className={b("panel")}>
            <SuitesTree suite={rootSuite} />
        </div>
        <div className={b("panel")}>
            <Route
                path="/suites/:resultUid"
                render={props => <SuiteResultView resultUid={props.match.params.resultUid} />}
            />
        </div>
      </div>
    );
  }
}
