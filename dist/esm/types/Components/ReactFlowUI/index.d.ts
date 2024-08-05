import React from "react";
import { IFlowUiContext } from "../../Contexts";
import { INodeProps } from "../../Types";
import "./styles.scss";
import RegisterNode, { RegisterNodeJSON } from "../../RegisterNode";
interface IProps extends Partial<Omit<IFlowUiContext, "addAction" | "categories">> {
    className?: string;
    style?: any;
    nodes?: RegisterNode[];
    onChange?: (flow: RegisterNodeJSON[]) => void;
    flow?: RegisterNodeJSON[];
}
export declare const RenderNode: React.FC<INodeProps & {
    isEnd?: boolean;
}>;
declare const ReactFlowUI: React.FC<IProps>;
export default ReactFlowUI;
