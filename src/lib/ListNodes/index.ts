import { LogHelper } from "../Helpers";
import RegisterNode from "../RegisterNode";

const ListNodes: RegisterNode[] = [];

ListNodes.push(
	new RegisterNode({
		name: "condition",
		init() {
			this.setType("condition");
			this.setTitle("Condition");
			this.setCategory("control");
			this.setKeys(["condition", "if", "else"]);
		},
	}),
);

ListNodes.push(
	new RegisterNode({
		name: "variable-initialize",
		init() {
			this.setType("action");
			this.setTitle("Initialize Variable");
			this.setCategory("variable");
			this.appendFieldVariable("variable");
			this.setKeys(["variable", "initialize", "var", "let", "const"]);
		},
		validate() {
			const messages = new LogHelper();

			const { name = "", definition = "var", value } = this.getField("variable") ?? {};

			if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
				messages.error(
					'Variable name is not valid! Remember, a valid variable must only begin with a lowercase letter, uppercase letter, "_" or "$" followed by a lowercase letter, uppercase letter, number, "_" or "$".',
				);
			} else if ((name ?? "").length <= 1) {
				messages.info("It is recommended that you define a variable name with more than one character.");
			}

			if (definition === "const" && value === undefined) {
				messages.warning('The variable was defined as "const", but no value was provided!');
			}

			return messages;
		},
	}),
);

export default ListNodes;
