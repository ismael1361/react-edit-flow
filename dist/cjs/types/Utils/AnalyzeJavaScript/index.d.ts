type FilesCode<P extends string = string> = {
    [path in P]: {
        type: "CJS" | "ESM";
        extension: "js" | "ts";
        code: string;
    };
};
export declare const FileAnalyzer: (files: FilesCode) => {
    [x: string]: {
        exports: any[];
        globals: any[];
    };
};
export {};
