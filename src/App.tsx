// Dentro de `example/src/App.tsx`
import React from "react";
import ReactFlowUI, { RegisterNode } from "./lib";
import { mdiStarFourPointsCircle } from "@mdi/js";

const registerNodes: RegisterNode[] = [];

registerNodes.push(
	new RegisterNode({
		name: "CustomNode",
		init() {
			this.setTitle("Custom Node");
			this.setCategory("other");
			this.setIcon(mdiStarFourPointsCircle);
			this.setType("action");

			this.appendFieldTextInput("nome", "Name");
			this.appendFieldNumber("age", "Age", 0);
			this.appendFieldTextInput("email", "Email", "", "email");
			this.appendFieldBoolean("valido", "Valid", true);
		},
	}),
);

const flow = [
	{ name: "start", id: "0aceb982-dcfb-47e5-a4eb-8461cf5e2bba", children: [], fields: {} },
	{
		name: "variable-initialize",
		id: "dfdbeee4-7f55-425b-bb14-01e7aaf5d302",
		children: [],
		fields: {
			variable: { name: "variable01", definition: "var", value: "Hello World!", expressionType: "string" },
		},
	},
	{ name: "end", id: "53fedef2-75ee-4ccf-93a8-fc5c9da11880", children: [], fields: {} },
];

function App() {
	return (
		<div className="App">
			<ReactFlowUI
				flow={flow}
				onChange={(flow) => console.log(flow)}
				layout="vertical"
				variables={[
					{
						expressionType: "string",
						name: "nome",
					},
					{
						expressionType: "number",
						name: "age",
						default: 0,
					},
					{
						expressionType: "string",
						name: "email",
					},
					{
						expressionType: "boolean",
						name: "valido",
						default: true,
					},
				]}
				registerNodes={registerNodes}
			/>
		</div>
	);
}

export default App;
