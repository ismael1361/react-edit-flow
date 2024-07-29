import React, { useContext, useEffect, useRef, useState } from "react";
import AddButton from "../AddButton";
import HeaderNode from "./HeaderNode";
import { mdiClose, mdiDelete, mdiMapMarker, mdiPencil, mdiPuzzle } from "@mdi/js";
import Icon from "@mdi/react";
import { BuilderContext } from "../../Contexts";
import { SplitLine } from "../Lines";
import { INode, INodeProps } from "../../Types";
import BodyNode from "./BodyNode";
import RenderNodeDeclarations, { INodeDeclaration } from "../../NodeDeclaration";

interface IProps extends INodeProps {}

const ActionNode: React.FC<IProps> = ({ id, name, onRemove, onChange, data, children, next, isExpanded = false }) => {
	const { registerNodes, categories } = useContext(BuilderContext);
	const declarationsRef = useRef<INodeDeclaration[]>(data?.declarations ?? []);
	const [show, setShow] = useState<boolean>(isExpanded);
	const { color: _color, icon: _icon, title = "Start", category: c = "other" } = registerNodes[name] ?? {};
	const category: string[] = Array.isArray(c) ? c : [c];

	const handleNodeClick = () => {};

	const toChange = () => {
		const node: INode = {
			id,
			name,
			type: "action",
			data: {
				...data,
				variables: data?.variables ?? [],
				declarations: declarationsRef.current,
			},
			children,
			next,
			isExpanded: show,
		};

		onChange?.(node);
	};

	useEffect(() => {
		toChange();
	}, [show]);

	const color = (Array.isArray(category) && category[0] in categories && !_color ? (categories as any)[category[0]]?.color : _color) ?? "#424242";

	const icon = (Array.isArray(category) && category[0] in categories && !_icon ? (categories as any)[category[0]]?.icon : _icon) ?? mdiMapMarker;

	return (
		<div className={`flow-ui-node`}>
			<div
				className="flow-ui-node_item flow-ui-node__content win2dp radius5"
				onClick={handleNodeClick}
				style={{ minWidth: show ? "400px" : "250px", maxWidth: show ? undefined : "250px" }}
			>
				<HeaderNode
					icon={
						icon && typeof icon !== "string" ? (
							icon
						) : (
							<Icon
								path={typeof icon === "string" ? icon : mdiPuzzle}
								size={1}
							/>
						)
					}
					color={color}
					tools={[
						{
							label: "Rename",
							action: () => {},
							icon: mdiPencil,
							disabled: true,
						},
						{
							label: "Remove",
							action: () => {
								onRemove?.(id);
							},
							icon: mdiDelete,
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
						{Array.isArray(declarationsRef.current) && (
							<RenderNodeDeclarations
								declarations={declarationsRef.current}
								onChange={(d) => {
									declarationsRef.current = d;
									toChange();
								}}
							/>
						)}
					</BodyNode>
				)}
			</div>
		</div>
	);
};

export default ActionNode;
