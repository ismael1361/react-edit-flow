import React, { useContext } from "react";
import { SplitLine } from "../Lines";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import { BodyNode, OperationsNode } from "../Nodes";

import "./styles.scss";
import { BuilderContext } from "../../Contexts";
import { INode } from "../../Types";

interface IProps {
	onAdd: (node: INode) => void;
}

const AddButton: React.FC<Partial<IProps>> = ({ onAdd }) => {
	const [showOperations, setShowOperations] = React.useState<boolean>(false);
	const { lineColor } = useContext(BuilderContext);

	return (
		<>
			{!showOperations && (
				<div
					className="flow-ui-node_item"
					onClick={() => {
						setShowOperations(true);
					}}
					style={{ minWidth: "100px" }}
				>
					<BodyNode
						className="low-ui-node__content flow-ui-node__add"
						style={{
							borderColor: lineColor,
							borderStyle: "dashed",
							padding: "0px",
						}}
					>
						<Icon
							className="flow-ui-node__add__icon"
							path={mdiPlusCircle}
							size={1}
							color={lineColor}
						/>
					</BodyNode>
				</div>
			)}
			{showOperations && (
				<OperationsNode
					onClone={() => {
						setShowOperations(false);
					}}
					onAdd={(node) => {
						onAdd?.(node);
					}}
				/>
			)}
			<SplitLine />
		</>
	);
};

export default AddButton;
