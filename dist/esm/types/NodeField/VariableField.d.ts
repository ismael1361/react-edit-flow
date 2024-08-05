import React from "react";
import type { INodeFieldBase } from ".";
import { IInputValueType } from "./InputField";
import { IVariableDefinition, Required } from "../Types";
interface IVariableType {
    icon: React.ReactNode;
    color: string;
    name: string;
    type: IInputValueType;
    disabled?: boolean;
}
export type IVariableProps = INodeFieldBase<Required<IVariableDefinition, "name"> & {
    type: "variable";
    validTypes?: IVariableType[];
}>;
export declare const variablesColors: {
    [type: string]: string;
};
declare const VariableField: React.FC<IVariableProps & {
    onMutate?: (value: Omit<IVariableProps, "validTypes">) => void;
}>;
export default VariableField;
