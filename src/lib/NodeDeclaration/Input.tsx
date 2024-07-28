import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { useId } from "../Hooks";
import type { INodeDeclarationBase, IProps } from ".";

export interface IInputProps extends INodeDeclarationBase {
	type: "input";
	label?: string;
	value?: Partial<
		| {
				default: string;
				type: "text" | "date" | "time" | "email" | "password";
		  }
		| {
				default: number;
				type: "number" | "datetime";
		  }
		| {
				default: boolean;
				type: "boolean";
		  }
	>;
	readonly?: boolean;
	required?: boolean;
	autoComplete?: string;
	helperText?: string;
	disabled?: boolean;
	multiline?: boolean;
	rows?: number;
	placeholder?: string;
}

const Input: React.FC<IProps<IInputProps>> = ({ type, required = false, label, value, autoComplete, helperText, disabled, multiline, rows, placeholder }) => {
	const id = useId();

	return (
		<>
			{value?.type === "boolean" ? (
				<FormControl
					disabled={disabled}
					fullWidth
					size="small"
					sx={{
						margin: "5px 0px",
					}}
				>
					{label && <InputLabel id={id}>{label}</InputLabel>}
					<Select
						labelId={id}
						label={label}
						defaultValue={value?.default ? 1 : 0}
					>
						<MenuItem value={1}>True</MenuItem>
						<MenuItem value={0}>False</MenuItem>
					</Select>
					{helperText && <FormHelperText>{helperText}</FormHelperText>}
				</FormControl>
			) : (
				<TextField
					required={required}
					label={label}
					defaultValue={value?.default}
					type={value?.type}
					autoComplete={autoComplete}
					helperText={helperText}
					disabled={disabled}
					multiline={multiline}
					rows={rows}
					placeholder={placeholder}
					fullWidth
					size="small"
					sx={{
						margin: "5px 0px",
					}}
				/>
			)}
		</>
	);
};

export default Input;
