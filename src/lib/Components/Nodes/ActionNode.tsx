import React, { useContext, useEffect, useRef, useState } from "react";
import AddButton from "../AddButton";
import HeaderNode from "./HeaderNode";
import { mdiDelete, mdiMapMarker, mdiPencil, mdiPuzzle, mdiUnfoldLessHorizontal, mdiUnfoldMoreHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import { BuilderContext, NodeLogsProvider } from "../../Contexts";
import { SplitLine } from "../Lines";
import { INodeProps } from "../../Types";
import BodyNode from "./BodyNode";
import RenderNodeFields, { INodeField } from "../../NodeField";

interface IProps extends INodeProps {
	isEditable?: boolean;
	fullWidth?: boolean;
	style?: React.CSSProperties;
}

const ActionNode: React.FC<IProps> = ({ node, onRemove, onChange, onExpanded, isEditable = true, style, isContent = true, fullWidth = false }) => {
	const { id, fields, isCollapsed, color: _color, icon: _icon, title = "Start", category: c = "other" } = node;
	const { categories, layout = "vertical" } = useContext(BuilderContext);
	const fieldsRef = useRef<INodeField[]>(fields ?? []);
	const [show, setShow] = useState<boolean>(!isCollapsed);
	const category: string[] = Array.isArray(c) ? c : [c];

	const handleNodeClick = () => {};

	const toChange = () => {
		node.fields = fieldsRef.current;
		node.collapsed = !show;
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
						{Array.isArray(fieldsRef.current) && (
							<RenderNodeFields
								id={id}
								node={node}
								onChange={(d) => {
									fieldsRef.current = d;
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
