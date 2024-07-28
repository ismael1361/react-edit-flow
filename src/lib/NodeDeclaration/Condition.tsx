import React from "react";
import type { INodeDeclarationBase, IProps } from ".";

export interface IConditionProps extends INodeDeclarationBase {
	type: "condition";
	operation: "egual" | "different" | "greater" | "less" | "greaterOrEgual" | "lessOrEgual";
}

const Condition: React.FC<IProps<IConditionProps>> = ({ type }) => {
	return <></>;
};

export default Condition;
