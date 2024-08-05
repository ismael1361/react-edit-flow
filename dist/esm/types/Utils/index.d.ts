export * from "./AnalyzeJavaScript";
export * from "./colour";
export declare const uuidv4: () => string;
export declare const cloneValue: <T>(obj: T, seen?: Map<any, any>) => T;
export declare const joinObjects: <T extends Object>(...objects: T[]) => T;
