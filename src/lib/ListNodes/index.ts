import { mdiToggleSwitchOffOutline } from "@mdi/js";
import { IRegisterNode } from "../Types";

const ListNodes: {
	[k: string]: IRegisterNode;
} = {};

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
