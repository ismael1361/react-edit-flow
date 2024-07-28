import React from "react";
import type { INodeDeclarationBase, IProps } from ".";
export interface IConditionProps extends INodeDeclarationBase {
    type: "condition";
    operation: "egual" | "different" | "greater" | "less" | "greaterOrEgual" | "lessOrEgual";
}
declare const Condition: React.FC<IProps<IConditionProps>>;
export default Condition;
