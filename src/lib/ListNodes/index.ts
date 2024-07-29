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
	declarations: [],
	keys: ["variable", "initialize", "var", "let", "const"],
};

export default ListNodes;
