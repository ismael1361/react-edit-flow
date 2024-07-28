import React, { ReactNode } from "react";
import type { INode, IRegisterNode } from "../Types";
export type INodeCategory = "all" | "variable" | "control" | "data" | "function" | "other";
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
        [k in INodeCategory]: INodeStyle & {
            isAll?: boolean;
        };
    };
    registerNodes: {
        [k: string]: IRegisterNode;
    };
}
export declare const BuilderContext: React.Context<IFlowUiContext>;
interface ProviderProps<V extends Object> {
    children: ReactNode;
    value: Partial<V>;
}
export declare const BuilderProvider: React.FC<ProviderProps<IFlowUiContext>>;
export interface INodeContext extends INode {
    addAction: (node: INode) => void;
}
export declare const NodeContext: React.Context<INodeContext>;
export declare const NodeProvider: React.FC<ProviderProps<INodeContext>>;
export {};
