import React, { useEffect, useRef, useState } from "react";
import InputDeclaration, { IInputProps } from "./InputDeclaration";
import ConditionDeclaration, { IConditionProps } from "./ConditionDeclaration";

export type IProps<T extends Object> = T & { onChange?: (value: any) => void };

export interface INodeDeclarationBase {
	type: string;
}

const RenderNodeDeclarations: React.FC<{
	declarations: INodeDeclaration[];
	onChange?: (declarations: INodeDeclaration[]) => void;
}> = ({ declarations, onChange }) => {
	const declarationsRef = useRef<INodeDeclaration[]>(declarations);

	return (
		<>
			{declarationsRef.current.map((declaration, index) => {
				return (
					<React.Fragment key={index}>
						{declaration.type === "condition" ? (
							<ConditionDeclaration {...(declaration as IConditionProps)} />
						) : declaration.type === "input" ? (
							<InputDeclaration
								{...(declaration as IInputProps)}
								onChange={(declaration) => {
									declarationsRef.current[index] = declaration;
									onChange?.(declarationsRef.current);
								}}
							/>
						) : null}
					</React.Fragment>
				);
			})}
		</>
	);
};

export type INodeDeclaration = IInputProps | IConditionProps;

export default RenderNodeDeclarations;
