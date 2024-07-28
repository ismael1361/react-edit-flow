import React from "react";
import "./styles.scss";
import { INode } from "../../Types";
interface IProps {
    onAdd: (node: INode) => void;
}
declare const AddButton: React.FC<Partial<IProps>>;
export default AddButton;
