import { createContext } from "react";
import type { IFlowUiContext, INodeContext } from "../Types";

export const BuilderContext = createContext<IFlowUiContext>({});

export const NodeContext = createContext<INodeContext>({
	id: "",
	type: "",
	name: "",
	data: {},
	children: [],
});
