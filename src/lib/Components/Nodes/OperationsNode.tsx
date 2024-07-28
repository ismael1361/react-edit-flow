import React, { useContext, useEffect, useState } from "react";
import { BuilderContext } from "../../Contexts";
import HeaderNode from "./HeaderNode";
import Icon from "@mdi/react";
import { mdiArrowExpandDown, mdiClose, mdiMagnify, mdiPuzzle } from "@mdi/js";
import BodyNode from "./BodyNode";
import { TextField } from "@mui/material";
import { INode } from "../../Types";
import { uuidv4 } from "../../Utils";

interface IProps {
	onClone: () => void;
	onAdd: (node: INode) => void;
}

const OperationsNode: React.FC<IProps> = ({ onClone, onAdd }) => {
	const [typeList, setTypeList] = useState<number>(0);
	const [search, setSearch] = useState<string>("");
	const { registerNodes, nodeStyle, categories } = useContext(BuilderContext);
	const { color = "#37474f", icon, title = "Choose an operation" } = nodeStyle.operations ?? {};

	const handleNodeClick = () => {};

	const handleTapChange = (event: React.SyntheticEvent, newValue: number) => {
		setTypeList(newValue);
		setSearch("");
	};

	useEffect(() => {
		if (search.trim() !== "") {
			setTypeList(-1);
		} else {
			setTypeList(0);
		}
	}, [search]);

	return (
		<div className={`flow-ui-node`}>
			<div
				className="flow-ui-node_item flow-ui-node__content win2dp radius5"
				onClick={handleNodeClick}
				style={{ minWidth: "600px" }}
			>
				<HeaderNode
					icon={
						icon && typeof icon !== "string" ? (
							icon
						) : (
							<Icon
								path={typeof icon === "string" ? icon : mdiArrowExpandDown}
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
								onClone?.();
							},
							label: "Cancel",
						},
					]}
				>
					{title}
				</HeaderNode>
				<BodyNode
					style={{
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<TextField
						InputProps={{
							startAdornment: (
								<Icon
									path={mdiMagnify}
									size={1}
									style={{
										marginRight: "10px",
									}}
								/>
							),
						}}
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						variant="outlined"
						fullWidth
						size="small"
						autoComplete="off"
					/>
					<div className="flow-ui-node_operations_taps">
						{Object.entries(categories).map(([category, { title, icon, color }], index) => {
							return (
								<div
									key={index}
									className={typeList === index ? "active" : undefined}
									onClick={() => {
										setTypeList(index);
									}}
								>
									<div
										className="flow-ui-node_operations_tap_icon"
										style={{
											backgroundColor: color ?? "#212121",
										}}
									>
										{icon && typeof icon !== "string" ? icon : <Icon path={typeof icon === "string" ? icon : mdiPuzzle} />}
									</div>
									<div className="flow-ui-node_operations_tap_title">{title}</div>
								</div>
							);
						})}
					</div>
					<div className="flow-ui-node_operations_list">
						{Object.entries(registerNodes).map(([nodeId, { icon, color, category: c = "other", title = "", keys = [], type }], index) => {
							const category: string[] = Array.isArray(c) ? c : [c];
							const [selectId, selectItem] = Object.entries(categories)[typeList] ?? ["", {}];
							const validSearch: boolean =
								search.trim() !== "" &&
								(title.trim().toLowerCase().search(search.trim().toLowerCase()) >= 0 ||
									keys.findIndex((key) => key.trim().toLowerCase().search(search.trim().toLowerCase()) >= 0) >= 0);

							if (!(selectItem.isAll || category.includes(selectId) || validSearch)) {
								return null;
							}

							if (Array.isArray(category) && category[0] in categories && !color) {
								color = (categories as any)[category[0]]?.color ?? color;
							}

							const nodeInfo: INode = {
								id: uuidv4(),
								name: nodeId,
								type,
								data: {},
								children: [],
								next: [],
							};

							return (
								<div
									key={index}
									onClick={() => {
										onAdd?.(nodeInfo);
										onClone?.();
									}}
								>
									<div
										className="flow-ui-node_operation_icon"
										style={{
											backgroundColor: color ?? "#212121",
										}}
									>
										{icon && typeof icon !== "string" ? icon : <Icon path={typeof icon === "string" ? icon : mdiPuzzle} />}
									</div>
									<div className="flow-ui-node_operation_title">{title}</div>
								</div>
							);
						})}
					</div>
				</BodyNode>
			</div>
		</div>
	);
};

export default OperationsNode;
