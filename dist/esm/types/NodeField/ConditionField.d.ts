import React from "react";
import type { INodeFieldBase, IProps } from ".";
export type IConditionProps = INodeFieldBase<{
    type: "condition";
    operation: "egual" | "different" | "greater" | "less" | "greaterOrEgual" | "lessOrEgual";
    onChange?: (value: Omit<IConditionProps, "onChange">) => void;
}>;
declare const ConditionField: React.FC<IProps<IConditionProps>>;
export default ConditionField;
