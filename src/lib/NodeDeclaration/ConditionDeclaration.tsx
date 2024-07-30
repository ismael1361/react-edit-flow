import React from "react";
import type { INodeDeclarationBase, IProps } from ".";

export type IConditionProps = INodeDeclarationBase<{
	type: "condition";
	operation: "egual" | "different" | "greater" | "less" | "greaterOrEgual" | "lessOrEgual";
	onChange?: (value: Omit<IConditionProps, "onChange">) => void;
}>;

const ConditionDeclaration: React.FC<IProps<IConditionProps>> = ({ type }) => {
	return <></>;
};

export default ConditionDeclaration;
