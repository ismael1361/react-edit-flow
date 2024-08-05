import React, { useContext, useEffect, useRef, useState } from "react";
import InputField, { IInputProps } from "./InputField";
import ConditionField, { IConditionProps } from "./ConditionField";
import VariableField, { IVariableProps } from "./VariableField";
import { BuilderContext, NodeLogsContext } from "../Contexts";
import RegisterNode from "../RegisterNode";

export type IProps<T extends Object> = T & { onChange?: (value: any) => void };

interface Log {
	type: "error" | "warning" | "info";
	message: string;
}

export type INodeFieldBase<P extends Object> = {
	type: string;
	fieldName: string;
	value?: any;
	hidden?: boolean;
	tryOut?: (props: P) => Log | Log[];
	onChange?: (props: P) => P;
} & P;

const RenderNodeFields: React.FC<{
	id: string;
	node: RegisterNode;
	onChange?: (fields: INodeField[]) => void;
}> = ({ id, node, onChange }) => {
	const log = useContext(NodeLogsContext);
	const fieldsRef = useRef<INodeField[]>(node.fields);
	const time = useRef<NodeJS.Timeout>();

	const verify = () => {
		clearTimeout(time.current);
		time.current = setTimeout(() => {
			log.clear();
			if (typeof node.validate === "function") {
				const erros = node.validate();
				(Array.isArray(erros) ? erros : [erros]).forEach(({ type, message }) => {
					log[type](message);
				});
			}
		}, 100);
	};

	const byChange = (index: number) => (value: INodeFieldBase<any>) => {
		clearTimeout(time.current);
		time.current = setTimeout(() => {
			fieldsRef.current[index] = { ...fieldsRef.current[index], ...value };
			if (typeof fieldsRef.current[index].onChange === "function") {
				fieldsRef.current[index] = (fieldsRef.current[index] as any).onChange(fieldsRef.current[index]);
			}
			node.fields = fieldsRef.current;
			node.update?.();
			onChange?.(fieldsRef.current);
			fieldsRef.current = node.getFields();
			verify();
		}, 100);
	};

	useEffect(() => {
		fieldsRef.current = node.fields;
		verify();
	}, [id, node]);

	return (
		<>
			{fieldsRef.current.map((field, index) => {
				return (
					<React.Fragment key={index}>
						{field.type === "condition" ? (
							<ConditionField {...(field as IConditionProps)} />
						) : field.type === "variable" ? (
							<VariableField
								{...(field as IVariableProps)}
								byId={id}
								onMutate={byChange(index)}
							/>
						) : field.type === "input" ? (
							<InputField
								{...(field as IInputProps)}
								onMutate={byChange(index)}
							/>
						) : null}
					</React.Fragment>
				);
			})}
		</>
	);
};

export type INodeField = IInputProps | IConditionProps | IVariableProps;

export default RenderNodeFields;
