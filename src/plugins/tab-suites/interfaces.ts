export interface AllureSuite {
    uid: string;
    name: string;
    children?: Array<AllureSuite>;
}

export interface ProcessedAllureSuite extends AllureSuite {
    children?: Array<ProcessedAllureSuite>;
    childrenUids: Array<string>;
}

export interface AllureCase {
    uid: string;
    name: string;
    status: string;
    descriptionHtml: string;
}
