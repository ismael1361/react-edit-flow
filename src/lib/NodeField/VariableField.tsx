import React, { useEffect } from "react";
import type { INodeFieldBase } from ".";
import { Box, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { useId } from "../Hooks";
import Icon from "@mdi/react";
import {
	mdiAlphaA,
	mdiAlphabeticalVariant,
	mdiAlphaC,
	mdiAlphaCCircle,
	mdiAlphaL,
	mdiAlphaLBox,
	mdiAlphaR,
	mdiAlphaV,
	mdiAlphaVBoxOutline,
	mdiCalendar,
	mdiClockTimeEight,
	mdiCodeBraces,
	mdiCodeBrackets,
	mdiFunction,
	mdiInformationSymbol,
	mdiMapMarker,
	mdiNumeric,
	mdiToggleSwitchOffOutline,
} from "@mdi/js";
import InputField, { IInputValueType } from "./InputField";
import { IVariableDefinition, Required } from "../Types";
import { TextareaField } from "../Components";

interface IVariableType {
	icon: React.ReactNode;
	color: string;
	name: string;
	type: IInputValueType;
	disabled?: boolean;
}

export type IVariableProps = INodeFieldBase<
	Required<IVariableDefinition, "name"> & {
		type: "variable";
		validTypes?: IVariableType[];
	}
>;

export const variablesColors: {
	[type: string]: string;
} = {
	string: "#FF5733", // Laranja
	number: "#33B5E5", // Azul
	boolean: "#E91E63", // Rosa
	any: "#9E9E9E", // Cinza
	unknown: "#795548", // Marrom
	Function: "#8BC34A", // Verde
	Object: "#FF9800", // Laranja escuro
	Array: "#673AB7", // Roxo
	Date: "#3F51B5", // Azul escuro
};

const posibleTypes: IVariableType[] = [
	{
		icon: mdiAlphaA,
		color: variablesColors.any,
		name: "any",
		type: "text",
	},
	{
		icon: mdiAlphabeticalVariant,
		color: variablesColors.string,
		name: "string",
		type: "text",
	},
	{
		icon: mdiNumeric,
		color: variablesColors.number,
		name: "number",
		type: "number",
	},
	{
		icon: mdiToggleSwitchOffOutline,
		color: variablesColors.boolean,
		name: "boolean",
		type: "boolean",
	},
	{
		icon: mdiCalendar,
		color: variablesColors.Date,
		name: "Date",
		type: "datetime",
	},
	{
		icon: mdiCodeBraces,
		color: variablesColors.Object,
		name: "Object",
		type: "text",
	},
	{
		icon: mdiCodeBrackets,
		color: variablesColors.Array,
		name: "Array",
		type: "text",
	},
	{
		icon: mdiFunction,
		color: variablesColors.Function,
		name: "Function",
		type: "text",
	},
];

const VariableField: React.FC<
	IVariableProps & {
		onMutate?: (value: Omit<IVariableProps, "validTypes">) => void;
	}
> = ({ fieldName, validTypes = [], definition = "var", expressionType: variableType = "any", name: n = "", value: v = "", color, byId, onMutate }) => {
	const types: IVariableType[] = [...posibleTypes, ...validTypes];
	const id_01 = useId();
	const id_02 = useId();
	const [def, setDef] = React.useState<"var" | "let" | "const">(definition);
	const [type, setType] = React.useState<string>(variableType);
	const [valueType, setValueType] = React.useState<string>(types.find((t) => t.name === variableType)?.type ?? "text");

	const [name, setName] = React.useState<string>(n);

	const [value, setValue] = React.useState<{ [k: string]: { value: string | number | boolean; default?: string | number | boolean } }>({
		[valueType]: { value: v, default: v },
	});

	useEffect(() => {
		onMutate?.({
			fieldName,
			type: "variable",
			name,
			expressionType: type as any,
			default: value[valueType]?.default,
			value: value[valueType]?.value,
			isConstant: def === "const",
			definition: def,
			color: color ?? variablesColors[valueType] ?? types.find((t) => t.name === valueType)?.color ?? variablesColors.any,
			byId,
		});
	}, [def, type, valueType, name, value]);

	const currentValue = value?.[valueType]?.value ?? value?.[valueType]?.default ?? (valueType === "number" ? 0 : valueType === "boolean" ? true : "");

	return (
		<>
			<Box
				component="form"
				sx={{
					"& > *": { margin: "5px !important" },
					"width": "100%",
					"display": "flex",
					"flexDirection": "row",
				}}
				noValidate
				autoComplete="off"
			>
				<FormControl
					size="small"
					style={{
						minWidth: "80px",
						width: "auto",
					}}
				>
					<InputLabel id={id_01}>Def.</InputLabel>
					<Select
						labelId={id_01}
						sx={{
							"& > *": {
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							},
							".MuiListItemIcon-root": {
								width: "auto",
								minWidth: "auto",
							},
							".MuiSelect-select": {
								display: "flex",
							},
							".MuiListItemText-root": {
								display: "none",
							},
						}}
						value={def}
						onChange={(event) => {
							setDef((event.target.value as any) ?? "var");
						}}
					>
						<MenuItem value={"var"}>
							<ListItemIcon>
								<Icon
									path={mdiAlphaVBoxOutline}
									size={1}
									color={"#1565c0"}
								/>
							</ListItemIcon>
							<ListItemText primary={"Var"} />
						</MenuItem>
						<MenuItem value={"let"}>
							<ListItemIcon>
								<Icon
									path={mdiAlphaLBox}
									size={1}
									color={"#3f51b5"}
								/>
							</ListItemIcon>
							<ListItemText primary={"Let"} />
						</MenuItem>
						<MenuItem value={"const"}>
							<ListItemIcon>
								<Icon
									path={mdiAlphaCCircle}
									size={1}
									color={"#6a1b9a"}
								/>
							</ListItemIcon>
							<ListItemText primary={"Const"} />
						</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="Key"
					value={name}
					onChange={(event) => {
						setName(event.target.value);
					}}
					size="small"
					fullWidth
				/>
			</Box>
			<Box
				component="form"
				sx={{
					"& > *": { margin: "5px !important" },
					"width": "100%",
					"display": "flex",
					"flexDirection": "row",
				}}
				noValidate
				autoComplete="off"
			>
				<FormControl
					size="small"
					style={{
						minWidth: "80px",
						width: "auto",
					}}
				>
					<InputLabel id={id_02}>Type</InputLabel>
					<Select
						size="small"
						labelId={id_02}
						label="Age"
						sx={{
							"& > *": {
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							},
							".MuiListItemIcon-root": {
								width: "auto",
								minWidth: "auto",
							},
							".MuiSelect-select": {
								display: "flex",
							},
							".MuiListItemText-root": {
								display: "none",
							},
						}}
						value={type}
						onChange={(event) => {
							setType(event.target.value as string);
							setValueType(types.find((t) => t.name === event.target.value)?.type ?? "text");
						}}
					>
						{types.map(({ name, icon, color }, index) => {
							return (
								<MenuItem
									value={name}
									key={index}
								>
									<ListItemIcon>
										<Icon
											path={typeof icon === "string" ? icon : mdiInformationSymbol}
											size={1}
											color={color}
										/>
									</ListItemIcon>
									<ListItemText primary={name} />
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<InputField
					fieldName={""}
					type={"input"}
					label="Value"
					value={{
						value: currentValue,
						...(value?.[valueType] as any),
						type: valueType,
					}}
					onMutate={(v) => {
						setValue((p) => {
							return {
								...p,
								[valueType]: {
									value: v.value?.value,
									default: p?.[valueType]?.default ?? undefined,
								},
							};
						});
					}}
				/>
			</Box>
			<TextareaField />
		</>
	);
};

export default VariableField;
