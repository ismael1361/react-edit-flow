import React, { useContext } from "react";
import { FillLine, SplitLine } from "../Lines";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import { BodyNode, OperationsNode } from "../Nodes";

import "./styles.scss";
import { BuilderContext } from "../../Contexts";
import RegisterNode from "../../RegisterNode";

interface IProps {
	onAdd: (node: RegisterNode) => void;
	isEnd?: boolean;
	fillLine?: boolean;
}

const AddButton: React.FC<Partial<IProps>> = ({ onAdd, isEnd = false, fillLine = false }) => {
	const [showOperations, setShowOperations] = React.useState<boolean>(false);
	let { lineColor, layout, spaceX, spaceY } = useContext(BuilderContext);

	const size = 20;
	const width = layout === "vertical" ? 100 : spaceX * 2 + size;
	const height = layout === "horizontal" ? 40 : spaceY * 2 + size;

	return (
		<>
			{!showOperations && (
				<div
					className="flow-ui-node_item"
					onClick={() => {
						setShowOperations(true);
					}}
					style={{
						minWidth: `${width}px`,
						minHeight: `${height}px`,
						marginTop: layout === "vertical" ? `${spaceY * -1}px` : undefined,
						marginBottom: layout === "vertical" ? `${spaceY * -1}px` : undefined,
						marginLeft: layout === "horizontal" ? `${spaceX * -1}px` : undefined,
						marginRight: layout === "horizontal" ? `${spaceX * -1}px` : undefined,
						backgroundColor: "transparent",
						zIndex: 1,
						borderRadius: 0,
					}}
				>
					<BodyNode
						className={`low-ui-node__content flow-ui-node__add ${isEnd ? "flow-ui-node__add__end" : ""}`}
						style={
							{
								"--lineColor": lineColor,
								"borderColor": lineColor,
							} as React.CSSProperties
						}
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
			{fillLine ? <FillLine /> : <SplitLine />}
		</>
	);
};

export default AddButton;
