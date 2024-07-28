import React from "react";
import { INode } from "../../Types";
interface IProps {
    onClone: () => void;
    onAdd: (node: INode) => void;
}
declare const OperationsNode: React.FC<IProps>;
export default OperationsNode;
