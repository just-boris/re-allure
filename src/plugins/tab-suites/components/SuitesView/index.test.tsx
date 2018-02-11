import * as React from "react";
import * as moxios from "moxios";
import { shallow } from "enzyme";
import { SuitesView } from "./index";
import SuitesTree from "../SuitesTree";
import SuiteResultView from "../SuiteResultView";
import { AllureSuite } from "../../interfaces";

describe("<SuitesView />", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const testResponse: AllureSuite = {
    uid: "0",
    name: "Root",
    children: [
      { uid: "1", name: "Child 1", children: [] },
      { uid: "2", name: "Child 2", children: [] }
    ]
  };

  function createComponent(params = {}) {
    const match = { params, isExact: false, path: "/", url: "" };
    return shallow(<SuitesView match={match} />);
  }

  test("renders and sends a request on initial render", done => {
    const component = createComponent();
    moxios.wait(() => {
      expect(component.find(SuitesTree)).toHaveLength(0);
      expect(component.find(SuiteResultView)).toHaveLength(0);
      expect(moxios.requests.count()).toBe(1);
      expect(moxios.requests.mostRecent().url).toBe("data/suites.json");
      done();
    });
  });

  test("renders tree when data is loaded", done => {
    moxios.stubRequest("data/suites.json", { response: testResponse });
    const component = createComponent();
    moxios.wait(() => {
      component.update();
      expect(component.find(SuitesTree)).toHaveLength(1);
      expect(component.find(SuiteResultView)).toHaveLength(0);
      done();
    });
  });

  test("renders result view when url param is provided", done => {
    moxios.stubRequest("data/suites.json", { response: testResponse });
    const component = createComponent({ resultUid: "1" });
    moxios.wait(() => {
      component.update();
      expect(component.find(SuitesTree)).toHaveLength(1);
      expect(component.find(SuiteResultView)).toHaveLength(1);
      done();
    });
  });
});
