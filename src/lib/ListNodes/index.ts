import { mdiCheckCircle, mdiCloseCircle, mdiToggleSwitchOffOutline } from "@mdi/js";
import { IRegisterNode } from "../Types";

const ListNodes: {
	[k: string]: IRegisterNode;
} = {};

ListNodes["if"] = {
	type: "action",
	title: "If yes",
	color: "#4CAF50",
	icon: mdiCheckCircle,
	category: "control",
	declarations: [],
	operable: false,
};

ListNodes["else"] = {
	type: "action",
	title: "If no",
	color: "#F44336",
	icon: mdiCloseCircle,
	category: "control",
	declarations: [],
	operable: false,
};

ListNodes["condition"] = {
	type: "condition",
	title: "Condition",
	category: "control",
	declarations: [],
	keys: ["condition", "if", "else"],
};

ListNodes["variable-initialize"] = {
	type: "action",
	title: "Initialize Variable",
	category: "variable",
	declarations: [
		{
			type: "variable",
			name: "",
			tryOut(props) {
				const messages: {
					type: "error" | "warning" | "info";
					message: string;
				}[] = [];

				if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(props.name)) {
					messages.push({
						type: "error",
						message:
							'Variable name is not valid! Remember, a valid variable must only begin with a lowercase letter, uppercase letter, "_" or "$" followed by a lowercase letter, uppercase letter, number, "_" or "$".',
					});
				} else if ((props.name ?? "").length <= 1) {
					messages.push({
						type: "info",
						message: "It is recommended that you define a variable name with more than one character.",
					});
				}

				if (props.definition === "const" && props.value === undefined) {
					messages.push({
						type: "warning",
						message: 'The variable was defined as "const", but no value was provided!',
					});
				}

				return messages;
			},
		},
	],
	keys: ["variable", "initialize", "var", "let", "const"],
};

export default ListNodes;
