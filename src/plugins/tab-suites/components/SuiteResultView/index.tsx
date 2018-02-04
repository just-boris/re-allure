import * as React from "react";
import { Link } from "react-router-dom";

export default function SuiteResultView({ resultUid }: { resultUid: string }) {
  return (
    <div>
      <h1>result {resultUid}</h1>
      <Link to="/suites">Close</Link>
    </div>
  );
}
