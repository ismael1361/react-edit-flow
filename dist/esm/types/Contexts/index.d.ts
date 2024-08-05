import React, { ReactNode } from "react";
import type { IVariableDefinition, Required } from "../Types";
import RegisterNode from "../RegisterNode";
export type INodeCategory = "all" | "variable" | "control" | "data" | "function" | "other";
export declare const categoriesList: {
    [k in INodeCategory]: INodeStyle & {
        isAll?: boolean;
    };
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
        [k in INodeCategory]: INodeStyle & {
            isAll?: boolean;
        };
    };
    registerNodes: RegisterNode[];
    variables: Required<IVariableDefinition, "name">[];
}
export declare const BuilderContext: React.Context<IFlowUiContext>;
interface ProviderProps<V extends Object> {
    children: ReactNode;
    value: Partial<V>;
}
export declare const BuilderProvider: React.FC<ProviderProps<IFlowUiContext>>;
export interface INodeContext {
    node?: RegisterNode;
    getVariables: () => Required<IVariableDefinition, "name">[];
    defineVariable: (...variable: Required<IVariableDefinition, "name">[]) => void;
}
export declare const NodeContext: React.Context<INodeContext>;
export declare const NodeProvider: React.FC<ProviderProps<INodeContext>>;
export interface INodeLog {
    type: "error" | "warning" | "info";
    message: string;
}
export declare const NodeLogsContext: React.Context<{
    logs: INodeLog[];
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    clear: () => void;
}>;
export declare const NodeLogsProvider: React.FC<{
    children: ReactNode;
}>;
export {};
