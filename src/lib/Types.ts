import React from "react";
import type { INodeDeclaration } from "./NodeDeclaration";
import type { INodeCategory } from "./Contexts";

export { INodeDeclaration };

export type Optional<T extends Object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T extends Object, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;

export type INodeType = "start" | "end" | "condition" | "action";

export interface INode {
	id: string;
	type: INodeType;
	name: string;
	data?: {
		declarations: INodeDeclaration[];
		variables: Required<IVariableDefinition, "name">[];
		[key: string]: any;
	};
	children?: INode[];
	next?: string[];
	isExpanded?: boolean;
	[key: string]: any;
}

export interface IRegisterNode<T extends INodeDeclaration[] = INodeDeclaration[]> {
	type: INodeType;
	title: string;
	category?: INodeCategory | INodeCategory[];
	icon?: React.ReactNode;
	color?: string;
	declarations?: T;
	onCall?: (node: T) => void;
	keys?: string[];
	variables?: Required<IVariableDefinition, "name">[];
	operable?: boolean;
}

export interface INodeProps extends INode {
	onAdd?: (node: INode) => void;
	onChange?: (node: INode) => void;
	onRemove?: (id: string) => void;
	onExpanded?: (expanded: boolean) => void;
	isContent?: boolean;
}

export interface IVariableDefinition {
	name: string;
	expressionType: ("string" | "number" | "boolean" | "any" | "unknown" | "Function" | "Object" | "Array" | "Date") & string;
	default?: string | number | boolean;
	value?: string | number | boolean;
	isConstant: boolean;
	definition: "var" | "let" | "const";
	color: string;
	byId?: string;
}
