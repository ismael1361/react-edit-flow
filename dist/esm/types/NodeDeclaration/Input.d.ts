import React from "react";
import type { INodeDeclarationBase, IProps } from ".";
export interface IInputProps extends INodeDeclarationBase {
    type: "input";
    label?: string;
    value?: Partial<{
        default: string;
        type: "text" | "date" | "time" | "email" | "password";
    } | {
        default: number;
        type: "number" | "datetime";
    } | {
        default: boolean;
        type: "boolean";
    }>;
    readonly?: boolean;
    required?: boolean;
    autoComplete?: string;
    helperText?: string;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    placeholder?: string;
}
declare const Input: React.FC<IProps<IInputProps>>;
export default Input;
