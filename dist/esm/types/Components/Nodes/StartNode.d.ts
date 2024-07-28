import React from "react";
import { INode } from "../../Types";
interface IProps {
    onAdd: (node: INode) => void;
}
declare const StartNode: React.FC<Partial<IProps>>;
export default StartNode;
