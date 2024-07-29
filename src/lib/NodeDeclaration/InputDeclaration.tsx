import { Chip, FormControl, FormHelperText, Input, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, OutlinedInput, Paper, Select, TextField } from "@mui/material";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useId } from "../Hooks";
import type { INodeDeclarationBase, IProps } from ".";
import { createRegexRenderer, RichTextarea, RichTextareaHandle } from "rich-textarea";
import { IVariableDefinition } from "../Types";
import { createPortal } from "react-dom";
import { NodeContext } from "../Contexts";

type IInputValueType = "text" | "date" | "time" | "email" | "password" | "number" | "datetime" | "boolean";

type IInputValue<T extends IInputValueType> = {
	default: any;
	value: any;
	type: T;
} & (
	| {
			default: string;
			value: string;
			type: "text" | "date" | "time" | "email" | "password";
	  }
	| {
			default: number;
			value: number;
			type: "number" | "datetime";
			max?: number;
			min?: number;
			step?: number;
	  }
	| {
			default: boolean;
			value: boolean;
			type: "boolean";
	  }
);

export interface IInputProps<T extends IInputValueType = any> extends INodeDeclarationBase {
	type: "input";
	label?: string;
	value?: Partial<IInputValue<T>>;
	readonly?: boolean;
	required?: boolean;
	autoComplete?: string;
	helperText?: string;
	disabled?: boolean;
	multiline?: boolean;
	rows?: number;
	placeholder?: string;
	onChange?: (value: IInputProps<T>) => void;
}

const variablesColors: {
	[type: string]: string;
} = {
	string: "#FF5733", // Laranja
	number: "#33B5E5", // Azul
	boolean: "#fdd835", // Amarelo
	any: "#9E9E9E", // Cinza
	unknown: "#795548", // Marrom
	Function: "#8BC34A", // Verde
	Object: "#FF9800", // Laranja escuro
	Array: "#673AB7", // Roxo
	Date: "#3F51B5", // Azul escuro
};

const MenuVariables: React.FC<{
	variables: IVariableDefinition[];
	index: number;
	top: number;
	left: number;
	complete: (index: number) => void;
}> = ({ variables, index, top, left, complete }) => {
	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mainRef.current) return;
		const { top, left, width, height } = mainRef.current.getBoundingClientRect();
		if (left + width > window.innerWidth) {
			mainRef.current.style.left = `${window.innerWidth - width}px`;
		} else if (left < 0) {
			mainRef.current.style.left = "0px";
		}

		if (top + height > window.innerHeight) {
			mainRef.current.style.top = `${window.innerHeight - height}px`;
		} else if (top < 0) {
			mainRef.current.style.top = "0px";
		}
	}, [mainRef.current, top, left]);

	return (
		<Paper
			ref={mainRef}
			sx={{
				position: "fixed",
				top: top,
				left: left,
				zIndex: 9999,
				width: "90%",
				maxWidth: 250,
			}}
			elevation={5}
		>
			<List
				sx={{
					width: "100%",
				}}
			>
				{variables.map((c, i) => (
					<ListItem
						key={c.name}
						secondaryAction={
							<div
								style={{
									marginRight: "5px",
									display: "inline-block",
									borderRadius: "20px",
									border: `1px solid rgba(0, 0, 0, 0.1)`,
									padding: "2px 10px",
									background: c.color ?? variablesColors[c.type] ?? "#2A6AD3",
									color: "white",
								}}
							>
								{c.type}
							</div>
						}
						disablePadding
						onMouseDown={(e) => {
							e.preventDefault();
							complete(i);
						}}
					>
						<ListItemButton>
							<ListItemText primary={c.name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

const MENTION_REG = /(?<!\\)\{([a-zA-Z_$][a-zA-Z0-9_$]*)?$/;
const mentionRenderer = (variables: IVariableDefinition[]) => {
	const style: React.CSSProperties = {
		background: "#455a64",
		color: "#ffffff",
		borderRadius: "3px",
		padding: "2px 0px",
	};

	return createRegexRenderer(
		variables.map(({ name, color, type }) => {
			return [new RegExp(`(?<!\\\\)\\{(${name})\\}`, "g"), { ...style, background: color ?? variablesColors[type] ?? style.background }];
		}),
	);
};

const TextareaVariables = forwardRef<
	HTMLTextAreaElement,
	{
		variables?: IVariableDefinition[];
		style?: React.CSSProperties;
		rows?: number;
		autoHeight?: boolean;
		defaultValue?: string;
	} & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ variables = [], style, rows, autoHeight = true, defaultValue, ...props }, ref) => {
	const mainRef = useRef<RichTextareaHandle>(null);

	const [text, setText] = useState<string>(defaultValue ?? "");
	const [pos, setPos] = useState<{
		top: number;
		left: number;
		caret: number;
	} | null>(null);
	const [index, setIndex] = useState<number>(0);

	const targetText = pos ? text.slice(0, pos.caret) : text;
	const match = pos && targetText.match(MENTION_REG);
	const name = match?.[1] ?? "";

	const filtered = useMemo(() => variables.filter((v) => v.name.includes(name)), [name]);

	const complete = (i: number) => {
		if (!mainRef.current || !pos) return;
		const selected = filtered[i].name;
		mainRef.current.setRangeText(`{${selected}} `, pos.caret - name.length - 1, pos.caret, "end");
		setPos(null);
		setIndex(0);
	};

	React.useImperativeHandle(
		ref,
		() => {
			return mainRef.current?.parentElement?.querySelector("textarea") as any;
		},
		[mainRef.current],
	);

	return (
		<div style={{ width: "100%", fontSize: "inherit", display: "flex", flexDirection: "column", ...(style ?? {}) }}>
			<RichTextarea
				ref={mainRef}
				{...props}
				style={{ width: "100%", border: "0px", fontSize: "inherit", resize: "none", outline: "0px" }}
				onChange={(e) => {
					setText(e.target.value);
					props.onChange?.(e);
				}}
				value={text}
				autoHeight={autoHeight}
				rows={rows}
				onKeyDown={(e) => {
					if (!pos || !filtered.length) return;
					switch (e.code) {
						case "ArrowUp":
							e.preventDefault();
							const nextIndex = index <= 0 ? filtered.length - 1 : index - 1;
							setIndex(nextIndex);
							break;
						case "ArrowDown":
							e.preventDefault();
							const prevIndex = index >= filtered.length - 1 ? 0 : index + 1;
							setIndex(prevIndex);
							break;
						case "Enter":
							e.preventDefault();
							complete(index);
							break;
						case "Escape":
							e.preventDefault();
							setPos(null);
							setIndex(0);
							break;
						default:
							break;
					}
				}}
				onSelectionChange={(r) => {
					if (r.focused && MENTION_REG.test(text.slice(0, r.selectionStart))) {
						setPos({
							top: r.top + r.height,
							left: r.left,
							caret: r.selectionStart,
						});
						setIndex(0);
					} else {
						setPos(null);
						setIndex(0);
					}
				}}
			>
				{mentionRenderer(filtered)}
			</RichTextarea>
			{pos &&
				filtered.length > 0 &&
				createPortal(
					<MenuVariables
						top={pos.top}
						left={pos.left}
						variables={filtered}
						index={index}
						complete={complete}
					/>,
					document.body,
				)}
		</div>
	);
});

const InputDeclaration: React.FC<IProps<IInputProps<any>>> = ({
	required = false,
	label,
	value = {
		type: "text",
		default: "",
		value: "",
	},
	autoComplete,
	helperText,
	disabled,
	multiline,
	rows = 1,
	placeholder,
	onChange,
	...props
}) => {
	const id = useId();
	const { getVariables } = React.useContext(NodeContext);

	const toChange = (v: string | number | boolean) => {
		onChange?.({ required, label, value: { ...value, value: v }, autoComplete, helperText, disabled, multiline, rows, placeholder, ...props });
	};

	const v = value?.value ?? value?.default ?? (value?.type === "boolean" ? false : value?.type === "number" ? 0 : "");

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
						defaultValue={v ? "1" : "0"}
						onChange={(e) => {
							toChange(e.target.value === "1");
						}}
					>
						<MenuItem value={"1"}>True</MenuItem>
						<MenuItem value={"0"}>False</MenuItem>
					</Select>
					{helperText && <FormHelperText>{helperText}</FormHelperText>}
				</FormControl>
			) : (
				<TextField
					onChange={(e) => {
						value?.type === "number" ? toChange(parseFloat(e.target.value)) : toChange(e.target.value);
					}}
					required={required}
					label={label}
					defaultValue={v}
					type={value?.type}
					autoComplete={autoComplete}
					helperText={helperText}
					disabled={disabled}
					multiline={["text"].includes(value?.type ?? "text") || multiline}
					rows={rows}
					placeholder={placeholder}
					fullWidth
					size="small"
					sx={{
						margin: "5px 0px",
					}}
					InputProps={
						["text"].includes(value?.type ?? "text")
							? ({
									inputComponent: TextareaVariables,
									inputProps: {
										variables: getVariables(),
										rows,
									},
							  } as any)
							: value?.type === "number"
							? {
									inputProps: {
										max: (value as any).max ?? Infinity,
										min: (value as any).min ?? -Infinity,
										step: (value as any).step ?? 1,
									},
							  }
							: {}
					}
				/>
			)}
		</>
	);
};

export default InputDeclaration;
