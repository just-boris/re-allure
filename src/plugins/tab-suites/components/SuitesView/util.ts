import {AllureSuite, ProcessedAllureSuite} from "../../interfaces";

export function processSuite(suite: AllureSuite): ProcessedAllureSuite {
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
