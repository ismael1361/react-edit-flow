// Dentro de `example/src/App.tsx`
import React from "react";
import ReactFlowUI from "./lib";
import { mdiStarFourPointsCircle } from "@mdi/js";

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
				registerNodes={{
					CustomNode: {
						title: "Custom Node",
						type: "action",
						declarations: [
							{
								type: "input",
								label: "Name",
							},
							{
								type: "input",
								label: "Age",
								value: {
									type: "number",
									default: 0,
								},
							},
							{
								type: "input",
								label: "Email",
								value: {
									type: "email",
									default: "",
								},
							},
							{
								type: "input",
								label: "Válido",
								value: {
									type: "boolean",
									default: true,
								},
							},
						],
					},
				}}
			/>
		</div>
	);
}

export default App;
