import React from "react";
import type { INodeFieldBase, IProps } from ".";
export type IInputValueType = "text" | "date" | "time" | "email" | "password" | "number" | "datetime" | "boolean";
export type IInputValue<T extends IInputValueType> = {
    default: any;
    value: any;
    type: T;
} & ({
    default: string;
    value: string;
    type: "text" | "date" | "time" | "email" | "password";
} | {
    default: number;
    value: number;
    type: "number" | "datetime";
    max?: number;
    min?: number;
    step?: number;
} | {
    default: boolean;
    value: boolean;
    type: "boolean";
});
export type IInputProps<T extends IInputValueType = any> = INodeFieldBase<{
    type: "input";
    label?: string;
    value?: Partial<IInputValue<T>>;
    readonly?: boolean;
    required?: boolean;
    autoComplete?: string;
    helperText?: string;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    placeholder?: string;
}>;
declare const InputField: React.FC<IProps<IInputProps<any>> & {
    fullWidth?: boolean;
    onMutate?: (value: IInputProps<any>) => void;
}>;
export default InputField;
