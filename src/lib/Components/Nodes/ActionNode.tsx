import React, { useContext, useEffect, useRef, useState } from "react";
import AddButton from "../AddButton";
import HeaderNode from "./HeaderNode";
import { mdiClose, mdiDelete, mdiMapMarker, mdiPencil, mdiPuzzle, mdiUnfoldLessHorizontal, mdiUnfoldMoreHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import { BuilderContext, NodeLogsProvider } from "../../Contexts";
import { SplitLine } from "../Lines";
import { INode, INodeProps } from "../../Types";
import BodyNode from "./BodyNode";
import RenderNodeDeclarations, { INodeDeclaration } from "../../NodeDeclaration";

interface IProps extends INodeProps {
	isEditable?: boolean;
	fullWidth?: boolean;
	style?: React.CSSProperties;
}

const ActionNode: React.FC<IProps> = ({ id, name, onRemove, onChange, onExpanded, data, children, next, isExpanded = false, isEditable = true, style, isContent = true, fullWidth = false }) => {
	const { registerNodes, categories, layout = "vertical" } = useContext(BuilderContext);
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
		onExpanded?.(show);
	}, [show]);

	const color = (Array.isArray(category) && category[0] in categories && !_color ? (categories as any)[category[0]]?.color : _color) ?? "#424242";

	const icon = (Array.isArray(category) && category[0] in categories && !_icon ? (categories as any)[category[0]]?.icon : _icon) ?? mdiMapMarker;

	const showContent = show && isContent;

	return (
		<NodeLogsProvider>
			<div
				className={`flow-ui-node`}
				style={{ zIndex: 1, ...(style ?? {}), width: fullWidth && layout !== "horizontal" ? "100%" : undefined }}
			>
				<div
					className={`flow-ui-node_item flow-ui-node__content ${showContent ? "show" : "hide"} win2dp radius5`}
					onClick={handleNodeClick}
					style={{
						minWidth: showContent ? "400px" : "250px",
						width: fullWidth && layout !== "horizontal" ? "100%" : showContent ? undefined : "250px",
					}}
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
						actions={[
							{
								label: show ? "Minimize" : "Expand",
								action: () => {
									setShow(!show);
								},
								icon: show ? mdiUnfoldLessHorizontal : mdiUnfoldMoreHorizontal,
							},
						]}
						tools={
							isEditable
								? [
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
								  ]
								: undefined
						}
						onClick={() => setShow(!show)}
					>
						{title}
					</HeaderNode>
					<BodyNode
						style={{
							flexDirection: "column",
							gap: "10px",
						}}
					>
						{Array.isArray(declarationsRef.current) && (
							<RenderNodeDeclarations
								id={id}
								declarations={declarationsRef.current}
								onChange={(d) => {
									declarationsRef.current = d;
									toChange();
								}}
							/>
						)}
					</BodyNode>
				</div>
			</div>
		</NodeLogsProvider>
	);
};

export default ActionNode;
