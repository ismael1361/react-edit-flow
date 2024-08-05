import React from "react";
import RegisterNode from "../../RegisterNode";
interface IProps {
    onClone: () => void;
    onAdd: (node: RegisterNode) => void;
}
declare const OperationsNode: React.FC<IProps>;
export default OperationsNode;
