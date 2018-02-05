export interface AllureSuite {
    uid: string;
    name: string;
    children?: Array<AllureSuite>;
}

export interface AllureCase {
    uid: string;
    name: string;
    status: string;
    descriptionHtml: string;
}
