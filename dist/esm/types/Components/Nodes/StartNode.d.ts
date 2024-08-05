import React from "react";
import RegisterNode from "../../RegisterNode";
interface IProps {
    onAdd: (node: RegisterNode) => void;
}
declare const StartNode: React.FC<Partial<IProps>>;
export default StartNode;
