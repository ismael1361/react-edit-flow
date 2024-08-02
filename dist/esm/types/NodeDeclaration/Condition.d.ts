import React from "react";
import type { INodeFieldBase, IProps } from ".";
export interface IConditionProps extends INodeFieldBase {
	type: "condition";
	operation: "egual" | "different" | "greater" | "less" | "greaterOrEgual" | "lessOrEgual";
}
declare const Condition: React.FC<IProps<IConditionProps>>;
export default Condition;
