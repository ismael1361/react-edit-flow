// Dentro de `example/src/App.tsx`
import React from "react";
import ReactFlowUI from "./lib";
import { mdiStarFourPointsCircle } from "@mdi/js";

function App() {
	return (
		<div className="App">
			<ReactFlowUI
				registerNodes={{
					CustomNode: {
						title: "Custom Node",
						icon: mdiStarFourPointsCircle,
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
