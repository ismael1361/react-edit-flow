import React from "react";
import type { INodeDeclaration } from "./NodeDeclaration";
import type { INodeCategory } from "./Contexts";

export { INodeDeclaration };

export type INodeType = "start" | "end" | "condition" | "action" | "branch" | "loop";

export interface INode {
	id: string;
	type: INodeType;
	name: string;
	data?: {
		declarations: INodeDeclaration[];
		variables: IVariableDefinition[];
		[key: string]: any;
	};
	children?: INode[];
	next?: string[];
	isExpanded?: boolean;
	[key: string]: any;
}

export interface IRegisterNode {
	type: INodeType;
	title: string;
	category?: INodeCategory | INodeCategory[];
	icon?: React.ReactNode;
	color?: string;
	declarations?: INodeDeclaration[];
	onCall?: (node: INodeDeclaration[]) => void;
	keys?: string[];
	variables?: IVariableDefinition[];
}

export interface INodeProps extends INode {
	onAdd?: (node: INode) => void;
	onChange?: (node: INode) => void;
	onRemove?: (id: string) => void;
}

export interface IVariableDefinition {
	name: string;
	type: ("string" | "number" | "boolean" | "any" | "unknown" | "Function" | "Object" | "Array" | "Date") & string;
	default?: string | number | boolean;
	isConstant?: boolean;
	color?: string;
	byId?: string;
}
