import React from "react";
import type { INodeFieldBase, IProps } from ".";

export type IConditionProps = INodeFieldBase<{
	type: "condition";
	operation: "egual" | "different" | "greater" | "less" | "greaterOrEgual" | "lessOrEgual";
	onChange?: (value: Omit<IConditionProps, "onChange">) => void;
}>;

const ConditionField: React.FC<IProps<IConditionProps>> = ({ type }) => {
	return <></>;
};

export default ConditionField;
