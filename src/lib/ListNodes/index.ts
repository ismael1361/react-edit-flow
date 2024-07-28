import { mdiToggleSwitchOffOutline } from "@mdi/js";
import { IRegisterNode } from "../Types";

const ListNodes: {
	[k: string]: IRegisterNode;
} = {};

ListNodes["condition"] = {
	type: "condition",
	title: "Condition",
	category: "control",
	icon: mdiToggleSwitchOffOutline,
	declarations: [],
	keys: ["condition", "if", "else"],
};

export default ListNodes;
