import React, { useContext } from "react";
import HeaderNode from "./HeaderNode";
import { mdiStarFourPointsCircle } from "@mdi/js";
import Icon from "@mdi/react";
import { BuilderContext } from "../../Contexts";
import { useId } from "../../Hooks";

const EndNode: React.FC = () => {
	const id = useId();
	const { nodeStyle } = useContext(BuilderContext);
	const { color = "#9c27b0", icon, title = "End" } = nodeStyle.end ?? {};

	const handleNodeClick = () => {};

	return (
		<div className={`flow-ui-node flow-ui-end-node`}>
			<div
				className="flow-ui-node_item flow-ui-node__content win2dp radius5"
				onClick={handleNodeClick}
				style={{ minWidth: "110px" }}
			>
				<HeaderNode
					icon={
						icon && typeof icon !== "string" ? (
							icon
						) : (
							<Icon
								path={typeof icon === "string" ? icon : mdiStarFourPointsCircle}
								size={1}
							/>
						)
					}
					color={color}
				>
					{title}
				</HeaderNode>
			</div>
		</div>
	);
};

export default EndNode;
