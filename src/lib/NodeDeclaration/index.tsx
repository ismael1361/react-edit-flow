import React, { useContext, useEffect, useRef, useState } from "react";
import InputDeclaration, { IInputProps } from "./InputDeclaration";
import ConditionDeclaration, { IConditionProps } from "./ConditionDeclaration";
import VariableDeclaration, { IVariableProps } from "./VariableDeclaration";
import { NodeLogsContext } from "../Contexts";

export type IProps<T extends Object> = T & { onChange?: (value: any) => void };

interface Log {
	type: "error" | "warning" | "info";
	message: string;
}

export type INodeDeclarationBase<P extends Object> = {
	type: string;
	tryOut?: (props: P) => Log | Log[];
} & P;

const RenderNodeDeclarations: React.FC<{
	id: string;
	declarations: INodeDeclaration[];
	onChange?: (declarations: INodeDeclaration[]) => void;
}> = ({ id, declarations, onChange }) => {
	const log = useContext(NodeLogsContext);
	const declarationsRef = useRef<INodeDeclaration[]>(declarations);
	const time = useRef<NodeJS.Timeout>();

	const verify = () => {
		clearTimeout(time.current);
		time.current = setTimeout(() => {
			log.clear();
			declarationsRef.current?.forEach(({ tryOut, ...props }) => {
				if (typeof tryOut === "function") {
					const erros = tryOut(props as any);
					(Array.isArray(erros) ? erros : [erros]).forEach(({ type, message }) => {
						log[type](message);
					});
				}
			});
		}, 100);
	};

	const byChange = (index: number) => (value: INodeDeclarationBase<any>) => {
		clearTimeout(time.current);
		time.current = setTimeout(() => {
			declarationsRef.current[index] = { ...declarationsRef.current[index], ...value };
			onChange?.(declarationsRef.current);
			verify();
		}, 100);
	};

	useEffect(() => {
		verify();
	}, [id, declarations]);

	return (
		<>
			{declarationsRef.current.map((declaration, index) => {
				return (
					<React.Fragment key={index}>
						{declaration.type === "condition" ? (
							<ConditionDeclaration {...(declaration as IConditionProps)} />
						) : declaration.type === "variable" ? (
							<VariableDeclaration
								{...(declaration as IVariableProps)}
								byId={id}
								onChange={byChange(index)}
							/>
						) : declaration.type === "input" ? (
							<InputDeclaration
								{...(declaration as IInputProps)}
								onChange={byChange(index)}
							/>
						) : null}
					</React.Fragment>
				);
			})}
		</>
	);
};

export type INodeDeclaration = IInputProps | IConditionProps | IVariableProps;

export default RenderNodeDeclarations;
