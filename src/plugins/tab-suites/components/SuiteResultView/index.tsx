import "./styles.scss";
import * as bem from "b_";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import { AllureCase } from "../../interfaces";

const b = bem.with("SuiteResultView");

interface Props {
  resultUid: string;
}

interface State {
  testcase?: AllureCase;
  error?: Error;
}

export default class SuiteResultView extends React.Component<Props, State> {
  state: State = {};

  componentDidMount() {
    this.loadResult();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.resultUid !== prevProps.resultUid) {
      this.loadResult();
    }
  }

  async loadResult() {
    try {
      const { data } = await axios.get(`data/test-cases/${this.props.resultUid}.json`);
      this.setState({ testcase: data, error: undefined });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { testcase, error } = this.state;
    if (error) {
      return <div>{error.message}</div>;
    }
    if (!testcase) {
      return <div>loading...</div>;
    }
    return (
      <div className={b()}>
        <div className={b("header")}>
          <h1>{testcase.name}</h1>
          <span>{testcase.status}</span>
          <Link to="/suites">Close</Link>
        </div>
        <h3>Description</h3>
        <div dangerouslySetInnerHTML={{ __html: testcase.descriptionHtml }} />
      </div>
    );
  }
}
