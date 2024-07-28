import React, { useContext } from "react";
import AddButton from "../AddButton";
import HeaderNode from "./HeaderNode";
import { mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import { BuilderContext } from "../../Contexts";
import { SplitLine } from "../Lines";
import { useId } from "../../Hooks";
import { INode } from "../../Types";

interface IProps {
	onAdd: (node: INode) => void;
}

const StartNode: React.FC<Partial<IProps>> = ({ onAdd }) => {
	const id = useId();
	const { nodeStyle } = useContext(BuilderContext);
	const { color = "#2196F3", icon, title = "Start" } = nodeStyle.start ?? {};

	const handleNodeClick = () => {};

	return (
		<div className={`flow-ui-node flow-ui-start-node`}>
			<div
				className="flow-ui-node_item flow-ui-node__content win2dp radius5"
				onClick={handleNodeClick}
				style={{ minWidth: "0px" }}
			>
				<HeaderNode
					icon={
						icon && typeof icon !== "string" ? (
							icon
						) : (
							<Icon
								path={typeof icon === "string" ? icon : mdiMapMarker}
								size={1}
							/>
						)
					}
					color={color}
				>
					{title}
				</HeaderNode>
			</div>
			<SplitLine />
			<AddButton onAdd={onAdd} />
		</div>
	);
};

export default StartNode;
