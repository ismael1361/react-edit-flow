import React from "react";
import type { INodeField } from "./NodeDeclaration";
import type { INodeCategory } from "./Contexts";
export { INodeField };
export type INodeType = "start" | "end" | "condition" | "action" | "branch" | "loop";
export interface INode {
	id: string;
	type: INodeType;
	name: string;
	data?: any;
	children?: INode[];
	next?: string[];
	[key: string]: any;
}
export interface IRegisterNode {
	type: INodeType;
	title: string;
	category?: INodeCategory | INodeCategory[];
	icon?: React.ReactNode;
	color?: string;
	declarations?: INodeField[];
	onCall?: (node: INodeField[]) => void;
	keys?: string[];
}
export interface INodeProps extends INode {
	onAdd?: (node: INode) => void;
	onChange?: (node: INode) => void;
	onRemove?: (id: string) => void;
}
