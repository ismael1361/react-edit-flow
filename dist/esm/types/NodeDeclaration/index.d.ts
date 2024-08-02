import React from "react";
import { IInputProps } from "./Input";
import { IConditionProps } from "./Condition";
export type IProps<T extends Object> = T & {
	onChange?: (value: any) => void;
};
export interface INodeFieldBase {
	type: string;
}
declare const RenderNodeDeclarations: React.FC<{
	declarations: INodeField[];
}>;
export type INodeField = IInputProps | IConditionProps;
export default RenderNodeDeclarations;
