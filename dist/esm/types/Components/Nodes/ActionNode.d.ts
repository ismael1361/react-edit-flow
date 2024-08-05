import React from "react";
import { INodeProps } from "../../Types";
interface IProps extends INodeProps {
    isEditable?: boolean;
    fullWidth?: boolean;
    style?: React.CSSProperties;
}
declare const ActionNode: React.FC<IProps>;
export default ActionNode;
