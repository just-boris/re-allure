export interface AllureSuite {
    uid: string;
    name: string;
    children?: Array<AllureSuite>;
}
