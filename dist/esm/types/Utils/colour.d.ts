export declare function getHsvSaturation(): number;
export declare function setHsvSaturation(newSaturation: number): void;
export declare function getHsvValue(): number;
export declare function setHsvValue(newValue: number): void;
export declare const colourNames: {
    [key: string]: string;
};
export declare function parse(str: string | number): string | null;
export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function rgbToHsv(r: number, g: number, b: number): {
    h: number;
    s: number;
    v: number;
};
export declare function hexToRgb(colour: string): {
    r: number;
    g: number;
    b: number;
};
export declare function hsvToHex(h: number, s: number, v: number): string;
export declare function parseBlockColour(colour?: number | string): {
    hue: number | null;
    hex: string;
};
