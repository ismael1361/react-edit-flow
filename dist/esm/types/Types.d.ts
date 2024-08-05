import type { INodeField } from "./NodeField";
import RegisterNode from "./RegisterNode";
export { INodeField };
export type Optional<T extends Object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T extends Object, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
export interface INodeProps {
    node: RegisterNode;
    onAdd?: (node: RegisterNode) => void;
    onChange?: (node: RegisterNode) => void;
    onRemove?: (id: string) => void;
    onExpanded?: (expanded: boolean) => void;
    isContent?: boolean;
}
export interface IVariableDefinition {
    name: string;
    expressionType: ("string" | "number" | "boolean" | "any" | "unknown" | "Function" | "Object" | "Array" | "Date") & string;
    default?: string | number | boolean;
    value?: string | number | boolean;
    isConstant: boolean;
    definition: "var" | "let" | "const";
    color: string;
    byId?: string;
}
