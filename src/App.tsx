// Dentro de `example/src/App.tsx`
import React from "react";
import ReactFlowUI, { RegisterNode } from "./lib";
import { mdiStarFourPointsCircle } from "@mdi/js";

const registerNodes: RegisterNode[] = [];

registerNodes.push(
	new RegisterNode({
		name: "CustomNode",
		init(node) {
			node.setTitle("Custom Node");
			node.setCategory("other");
			node.setIcon(mdiStarFourPointsCircle);
			node.setType("action");

			node.appendFieldTextInput("nome", "Name");
			node.appendFieldNumber("age", "Age", 0);
			node.appendFieldTextInput("email", "Email", "email");
			node.appendFieldBoolean("valido", "Valid", true);
		},
	}),
);

function App() {
	return (
		<div className="App">
			<ReactFlowUI
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
