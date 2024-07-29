import React, { createContext, ReactNode } from "react";
import type { INode, IRegisterNode, IVariableDefinition } from "../Types";
import { mdiCodeBlockBraces, mdiDatabaseOutline, mdiFunction, mdiPuzzle, mdiSelectAll, mdiVariable } from "@mdi/js";

export type INodeCategory = "all" | "variable" | "control" | "data" | "function" | "other";

const categories: {
	[k in INodeCategory]: INodeStyle & { isAll?: boolean };
} = {
	all: {
		color: "#546e7a",
		icon: mdiSelectAll,
		title: "All",
		isAll: true,
	},
	variable: {
		color: "#d84315",
		icon: mdiVariable,
		title: "Variable",
	},
	control: {
		color: "#424242",
		icon: mdiCodeBlockBraces,
		title: "Control",
	},
	data: {
		color: "#6a1b9a",
		icon: mdiDatabaseOutline,
		title: "Data",
	},
	function: {
		color: "#0277bd",
		icon: mdiFunction,
		title: "Function",
	},
	other: {
		color: "#00796b",
		icon: mdiPuzzle,
		title: "Other",
	},
};

interface INodeStyle {
	color: string;
	icon: ReactNode;
	title: string;
}

type INodesNames = "start" | "end" | "operations" | INodeCategory;

export interface IFlowUiContext {
	layout: "horizontal" | "vertical";
	lineColor: string;
	spaceY: number;
	spaceX: number;
	nodeStyle: Partial<{
		[k in INodesNames]: Partial<INodeStyle>;
	}>;
	categories: {
		[k in INodeCategory]: INodeStyle & { isAll?: boolean };
	};
	registerNodes: {
		[k: string]: IRegisterNode;
	};
	variables: IVariableDefinition[];
}

const defaultBuilderContext: IFlowUiContext = {
	layout: "vertical",
	lineColor: "black",
	spaceX: 25,
	spaceY: 25,
	nodeStyle: {
		...categories,
	},
	categories,
	registerNodes: {},
	variables: [],
};

export const BuilderContext = createContext<IFlowUiContext>(defaultBuilderContext);

interface ProviderProps<V extends Object> {
	children: ReactNode;
	value: Partial<V>;
}

export const BuilderProvider: React.FC<ProviderProps<IFlowUiContext>> = ({ children, value }) => {
	const contextValue = { ...defaultBuilderContext, ...value };
	return <BuilderContext.Provider value={contextValue}>{children}</BuilderContext.Provider>;
};

export interface INodeContext extends INode {
	getVariables: () => IVariableDefinition[];
	defineVariable: (...variable: IVariableDefinition[]) => void;
}

const defaultNodeContext: INodeContext = {
	id: "",
	type: "action",
	name: "",
	children: [],
	variables: [],
	getVariables: () => [],
	defineVariable: () => {},
};

export const NodeContext = React.createContext<INodeContext>(defaultNodeContext);

export const NodeProvider: React.FC<ProviderProps<INodeContext>> = ({ children, value }) => {
	const contextValue = { ...defaultNodeContext, ...value };
	return <NodeContext.Provider value={contextValue}>{children}</NodeContext.Provider>;
};
