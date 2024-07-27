import React from "react";
import { FileAnalyzer } from "../../Utils";
import { StartNode } from "../Nodes";

import "./styles.scss";

const ReactFlowUI: React.FC = () => {
	(window as any).FileAnalyzer = FileAnalyzer;

	return (
		<div className="flow-ui-content">
			<div
				className={`flow-ui`}
				style={{ zoom: `${100}%` }}
			>
				<StartNode />
			</div>
		</div>
	);
};

export default ReactFlowUI;
