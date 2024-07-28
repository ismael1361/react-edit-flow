import React from "react";
import { IFlowUiContext } from "../../Contexts";
import { INode } from "../../Types";
import "./styles.scss";
interface IProps extends Partial<Omit<IFlowUiContext, "addAction" | "categories">> {
    className?: string;
    style?: any;
    nodes?: INode[];
    onChange?: (nodes: INode[]) => void;
}
declare const ReactFlowUI: React.FC<IProps>;
export default ReactFlowUI;
