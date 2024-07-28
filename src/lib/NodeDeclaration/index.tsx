import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { useId } from "../Hooks";
import Input, { IInputProps } from "./Input";
import Condition, { IConditionProps } from "./Condition";

export type IProps<T extends Object> = T & { onChange?: (value: any) => void };

export interface INodeDeclarationBase {
	type: string;
}

const RenderNodeDeclarations: React.FC<{
	declarations: INodeDeclaration[];
}> = ({ declarations }) => {
	return (
		<>
			{declarations.map((declaration, index) => {
				return (
					<React.Fragment key={index}>
						{declaration.type === "condition" ? <Condition {...(declaration as IConditionProps)} /> : declaration.type === "input" ? <Input {...(declaration as IInputProps)} /> : null}
					</React.Fragment>
				);
			})}
		</>
	);
};

export type INodeDeclaration = IInputProps | IConditionProps;

export default RenderNodeDeclarations;
