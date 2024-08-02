import React, { ReactNode } from "react";

interface IInputProps extends INodeFieldBase {
	type: "input";
	label?: string;
	value?: Partial<
		| {
				default: string;
				type: "text" | "date" | "time" | "email" | "password";
		  }
		| {
				default: number;
				type: "number" | "datetime";
		  }
		| {
				default: boolean;
				type: "boolean";
		  }
	>;
	readonly?: boolean;
	required?: boolean;
	autoComplete?: string;
	helperText?: string;
	disabled?: boolean;
	multiline?: boolean;
	rows?: number;
	placeholder?: string;
}

interface IConditionProps extends INodeFieldBase {
	type: "condition";
	operation: "egual" | "different" | "greater" | "less" | "greaterOrEgual" | "lessOrEgual";
}

interface INodeFieldBase {
	type: string;
}
type INodeField = IInputProps | IConditionProps;

type INodeType = "start" | "end" | "condition" | "action" | "branch" | "loop";
interface INode {
	id: string;
	type: INodeType;
	name: string;
	data?: any;
	children?: INode[];
	next?: string[];
	[key: string]: any;
}
interface IRegisterNode {
	type: INodeType;
	title: string;
	category?: INodeCategory | INodeCategory[];
	icon?: React.ReactNode;
	color?: string;
	declarations?: INodeField[];
	onCall?: (node: INodeField[]) => void;
	keys?: string[];
}
interface INodeProps extends INode {
	onAdd?: (node: INode) => void;
	onChange?: (node: INode) => void;
	onRemove?: (id: string) => void;
}

type INodeCategory = "all" | "variable" | "control" | "data" | "function" | "other";
interface INodeStyle {
	color: string;
	icon: ReactNode;
	title: string;
}
type INodesNames = "start" | "end" | "operations" | INodeCategory;
interface IFlowUiContext {
	layout: "horizontal" | "vertical";
	lineColor: string;
	spaceY: number;
	spaceX: number;
	nodeStyle: Partial<{
		[k in INodesNames]: Partial<INodeStyle>;
	}>;
	categories: {
		[k in INodeCategory]: INodeStyle & {
			isAll?: boolean;
		};
	};
	registerNodes: {
		[k: string]: IRegisterNode;
	};
}

interface IProps$9 extends Partial<Omit<IFlowUiContext, "addAction" | "categories">> {
	className?: string;
	style?: any;
	nodes?: INode[];
	onChange?: (nodes: INode[]) => void;
}
declare const ReactFlowUI: React.FC<IProps$9>;

interface IProps$8 {
	onAdd: (node: INode) => void;
}
declare const AddButton: React.FC<Partial<IProps$8>>;

interface IProps$7 {
	onAdd: (node: INode) => void;
}
declare const StartNode: React.FC<Partial<IProps$7>>;

declare const EndNode: React.FC;

interface IProps$6 {
	icon?: ReactNode;
	children?: ReactNode;
	color?: string;
	actions?: Array<
		Partial<{
			label: string;
			icon: ReactNode;
			action: () => void;
		}>
	>;
	onClick?: () => void;
}
declare const HeaderNode: React.FC<Partial<IProps$6>>;

interface IProps$5 {
	children: React.ReactNode;
	className: string;
	style: React.CSSProperties;
}
declare const BodyNode: React.FC<Partial<IProps$5>>;

interface IProps$4 {
	onClone: () => void;
	onAdd: (node: INode) => void;
}
declare const OperationsNode: React.FC<IProps$4>;

interface IProps$3 extends INodeProps {}
declare const ActionNode: React.FC<IProps$3>;

declare const index_d$1_ActionNode: typeof ActionNode;
declare const index_d$1_BodyNode: typeof BodyNode;
declare const index_d$1_EndNode: typeof EndNode;
declare const index_d$1_HeaderNode: typeof HeaderNode;
declare const index_d$1_OperationsNode: typeof OperationsNode;
declare const index_d$1_StartNode: typeof StartNode;
declare namespace index_d$1 {
	export {
		index_d$1_ActionNode as ActionNode,
		index_d$1_BodyNode as BodyNode,
		index_d$1_EndNode as EndNode,
		index_d$1_HeaderNode as HeaderNode,
		index_d$1_OperationsNode as OperationsNode,
		index_d$1_StartNode as StartNode,
	};
}

interface IProps$2 {
	className?: string;
	style?: any;
}
declare const SplitLine: React.FC<IProps$2>;

interface IProps$1 {}
declare const FillLine: React.FC<IProps$1>;

interface IProps {
	full?: boolean;
	className?: string;
	style?: any;
}
declare const CoverLine: React.FC<IProps>;

declare const index_d_CoverLine: typeof CoverLine;
declare const index_d_FillLine: typeof FillLine;
declare const index_d_SplitLine: typeof SplitLine;
declare namespace index_d {
	export { index_d_CoverLine as CoverLine, index_d_FillLine as FillLine, index_d_SplitLine as SplitLine };
}

export { AddButton, type INode, type INodeField, type INodeProps, type INodeType, type IRegisterNode, index_d as Lines, index_d$1 as Nodes, ReactFlowUI, ReactFlowUI as default };
