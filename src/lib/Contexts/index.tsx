import React, { createContext, ReactNode, useRef } from "react";
import type { IVariableDefinition, Required } from "../Types";
import { mdiCodeBlockBraces, mdiDatabaseOutline, mdiFunction, mdiPuzzle, mdiSelectAll, mdiVariable } from "@mdi/js";
import { useUpdate } from "../Hooks";
import { clear } from "console";
import RegisterNode, { RegisterNodeJSON } from "../RegisterNode";

export type INodeCategory = "all" | "variable" | "control" | "data" | "function" | "other";

export const categoriesList: {
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
	grid: Partial<{
		spacing: number;
		length: number;
		width: number;
		colour: string;
	}>;
	nodeStyle: Partial<{
		[k in INodesNames]: Partial<INodeStyle>;
	}>;
	categories: {
		[k in INodeCategory]: INodeStyle & { isAll?: boolean };
	};
	registerNodes: RegisterNode[];
	variables: Required<IVariableDefinition, "name">[];
}

const defaultBuilderContext: IFlowUiContext = {
	layout: "vertical",
	lineColor: "black",
	spaceX: 25,
	spaceY: 25,
	grid: {},
	nodeStyle: {
		...categoriesList,
	},
	categories: categoriesList,
	registerNodes: [],
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

export interface INodeContext {
	node?: RegisterNode;
	getVariables: () => Required<IVariableDefinition, "name">[];
	defineVariable: (...variable: Required<IVariableDefinition, "name">[]) => void;
}

const defaultNodeContext: INodeContext = {
	node: undefined,
	getVariables: () => [],
	defineVariable: () => {},
};

export const NodeContext = React.createContext<INodeContext>(defaultNodeContext);

export const NodeProvider: React.FC<ProviderProps<INodeContext>> = ({ children, value }) => {
	const contextValue = { ...defaultNodeContext, ...value };
	return <NodeContext.Provider value={contextValue}>{children}</NodeContext.Provider>;
};

export interface INodeLog {
	type: "error" | "warning" | "info";
	message: string;
}

export const NodeLogsContext = React.createContext<{
	logs: INodeLog[];
	error: (message: string) => void;
	warning: (message: string) => void;
	info: (message: string) => void;
	clear: () => void;
}>({
	logs: [],
	error: () => {},
	warning: () => {},
	info: () => {},
	clear: () => {},
});

export const NodeLogsProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const update = useUpdate();
	const logsRef = useRef<INodeLog[]>([]);
	const time = useRef<NodeJS.Timeout>();

	const byLog =
		(type: INodeLog["type"]) =>
		(message: string = "") => {
			clearTimeout(time.current);
			logsRef.current.push({ type, message });
			time.current = setTimeout(() => {
				update();
			}, 100);
		};

	return (
		<NodeLogsContext.Provider
			value={{
				logs: logsRef.current,
				error: byLog("error"),
				warning: byLog("warning"),
				info: byLog("info"),
				clear: () => {
					logsRef.current = [];
					update();
				},
			}}
		>
			{children}
		</NodeLogsContext.Provider>
	);
};
