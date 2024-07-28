import React, { useContext, useState } from "react";
import AddButton from "../AddButton";
import HeaderNode from "./HeaderNode";
import { mdiClose, mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import { BuilderContext } from "../../Contexts";
import { SplitLine } from "../Lines";
import { INode, INodeProps } from "../../Types";
import BodyNode from "./BodyNode";
import RenderNodeDeclarations from "../../NodeDeclaration";

interface IProps extends INodeProps {}

const ActionNode: React.FC<IProps> = ({ id, name, onAdd, onRemove }) => {
	const { registerNodes } = useContext(BuilderContext);
	const [show, setShow] = useState<boolean>(false);
	const { color = "#424242", icon, title = "Start", declarations } = registerNodes[name] ?? {};

	const handleNodeClick = () => {};

	return (
		<div className={`flow-ui-node`}>
			<div
				className="flow-ui-node_item flow-ui-node__content win2dp radius5"
				onClick={handleNodeClick}
				style={{ minWidth: show ? "400px" : undefined }}
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
					actions={[
						{
							icon: (
								<Icon
									path={mdiClose}
									size={1}
								/>
							),
							action: () => {
								onRemove?.(id);
							},
							label: "Remove",
						},
					]}
					onClick={() => setShow(!show)}
				>
					{title}
				</HeaderNode>
				{show && (
					<BodyNode
						style={{
							flexDirection: "column",
							gap: "10px",
						}}
					>
						{Array.isArray(declarations) && <RenderNodeDeclarations declarations={declarations} />}
					</BodyNode>
				)}
			</div>
			<SplitLine />
			<AddButton onAdd={onAdd} />
		</div>
	);
};

export default ActionNode;
