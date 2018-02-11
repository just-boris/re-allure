import { processSuite } from "./util";
import { AllureSuite } from "../../interfaces";

function processorTest(name: string, source: AllureSuite, output: any) {
  test(name, () => {
    expect(processSuite(source)).toEqual(output);
  });
}

const part = expect.objectContaining;

describe("SuitesView utils", () => {
  processorTest(
    "handles empty tree",
    {
      uid: "0",
      name: "Test",
      children: []
    },
    part({ childrenUids: [] })
  );

  processorTest(
    "collects children uids",
    {
      uid: "0",
      name: "Root",
      children: [
        {
          uid: "1",
          name: "Suite 1",
          children: [
            {
              uid: "2",
              name: "Result 1"
            },
            {
              uid: "3",
              name: "Result 2"
            }
          ]
        },
        {
          uid: "4",
          name: "Suite 2",
          children: [
            {
              uid: "5",
              name: "Result 3"
            }
          ]
        }
      ]
    },
    part({
      childrenUids: ["2", "3", "5"],
      children: [part({ childrenUids: ["2", "3"] }), part({ childrenUids: ["5"] })]
    })
  );

  processorTest(
    "works on multiple levels of nesting",
    {
      uid: "0",
      name: "Root",
      children: [
        {
          uid: "1",
          name: "Suite 1",
          children: [
            {
              uid: "2",
              name: "Sub-suite 1",
              children: [{ uid: "3", name: "Result 1" }, { uid: "4", name: "Result 2" }]
            },
            {
              uid: "5",
              name: "Sub-suite 2",
              children: [{ uid: "6", name: "Result 3" }, { uid: "7", name: "Result 4" }]
            }
          ]
        }
      ]
    },
    part({
      childrenUids: ["3", "4", "6", "7"],
      children: [
        part({
          childrenUids: ["3", "4", "6", "7"],
          children: [part({ childrenUids: ["3", "4"] }), part({ childrenUids: ["6", "7"] })]
        })
      ]
    })
  );
});
