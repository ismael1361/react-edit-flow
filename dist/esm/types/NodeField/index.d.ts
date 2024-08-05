import React from "react";
import { IInputProps } from "./InputField";
import { IConditionProps } from "./ConditionField";
import { IVariableProps } from "./VariableField";
import RegisterNode from "../RegisterNode";
export type IProps<T extends Object> = T & {
    onChange?: (value: any) => void;
};
interface Log {
    type: "error" | "warning" | "info";
    message: string;
}
export type INodeFieldBase<P extends Object> = {
    type: string;
    fieldName: string;
    value?: any;
    hidden?: boolean;
    tryOut?: (props: P) => Log | Log[];
    onChange?: (props: P) => P;
} & P;
declare const RenderNodeFields: React.FC<{
    id: string;
    node: RegisterNode;
    onChange?: (fields: INodeField[]) => void;
}>;
export type INodeField = IInputProps | IConditionProps | IVariableProps;
export default RenderNodeFields;
