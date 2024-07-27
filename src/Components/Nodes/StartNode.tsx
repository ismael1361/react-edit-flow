import React from "react";
import AddButton from "../AddButton";

const StartNode: React.FC = () => {
	const handleNodeClick = () => {};

	return (
		<div className={`flow-ui-node flow-ui-start-node`}>
			<div
				className="flow-ui-node__content"
				onClick={handleNodeClick}
			>
				<h1>START</h1>
			</div>

			<AddButton />
		</div>
	);
};

export default StartNode;
