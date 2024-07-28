import React from "react";
import { IInputProps } from "./Input";
import { IConditionProps } from "./Condition";
export type IProps<T extends Object> = T & {
    onChange?: (value: any) => void;
};
export interface INodeDeclarationBase {
    type: string;
}
declare const RenderNodeDeclarations: React.FC<{
    declarations: INodeDeclaration[];
}>;
export type INodeDeclaration = IInputProps | IConditionProps;
export default RenderNodeDeclarations;
