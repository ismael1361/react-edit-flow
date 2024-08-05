import React from "react";
import "./styles.scss";
import RegisterNode from "../../RegisterNode";
interface IProps {
    onAdd: (node: RegisterNode) => void;
    isEnd?: boolean;
    fillLine?: boolean;
}
declare const AddButton: React.FC<Partial<IProps>>;
export default AddButton;
