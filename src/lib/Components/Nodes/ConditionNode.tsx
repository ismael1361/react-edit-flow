import React, { useContext, useEffect, useRef, useState } from "react";
import { INodeProps } from "../../Types";
import ActionNode from "./ActionNode";
import { CoverLine, FillLine, SplitLine } from "../Lines";
import AddButton from "../AddButton";
import { useUpdate } from "../../Hooks";
import { RenderNode } from "../ReactFlowUI";
import { BuilderContext } from "../../Contexts";
import RegisterNode from "../../RegisterNode";

interface IProps extends INodeProps {}

const ConditionNode: React.FC<IProps> = ({ node, onRemove, onChange, onExpanded }) => {
	const { isCollapsed, color: _color, icon: _icon, children } = node;
	const update = useUpdate();
	const { lineColor } = useContext(BuilderContext);
	const [show, setShow] = useState<boolean>(isCollapsed);

	const toChange = () => {
		onChange?.(node);
	};

	useEffect(() => {
		node.collapsed = show;
		toChange();
		onExpanded?.(show);
	}, [show]);

	return (
		<>
			<ActionNode
				node={node}
				onRemove={onRemove}
				onChange={(node) => {
					toChange();
				}}
				onExpanded={(expanded) => {
					setShow(expanded);
				}}
			/>
			{show && (
				<>
					{/* <SplitLine /> */}
					<div
						className="flow-ui-branch-node__conditions"
						style={{
							// borderColor: lineColor,
							marginTop: "-25px",
							zIndex: 0,
							paddingTop: "0px",
							borderWidth: "0px",
						}}
					>
						{node.children.map((n, index, self) => {
							const coverIndexClassName = index === 0 ? "cover-first" : index === self.length - 1 ? "cover-last" : "cover-middle";

							const onAdd = (i: number) => (newNode: RegisterNode) => {
								const start = n.children.slice(0, i);
								const end = n.children.slice(i);
								node.children[index].children = [...start, newNode, ...end];
								update();
								toChange();
							};

							const onRemove = (id: string) => {
								const i = n.children.findIndex((node) => node.id === id);
								n.children.splice(i, 1);
								node.children[index] = n;
								update();
								toChange();
							};

							return (
								<div
									className="flow-ui-node flow-ui-condition-node"
									key={n.id}
								>
									<CoverLine className={`cover-condition-start ${coverIndexClassName}`} />
									<div className="flow-ui-node">
										<SplitLine minSpace={35} />
										<ActionNode
											node={n}
											isEditable={false}
											isContent={false}
											fullWidth={true}
											onExpanded={(expanded) => {
												node.children[index].setCollapsed(expanded);
												update();
												toChange();
											}}
										/>
										{!n.isCollapsed ? (
											<FillLine />
										) : (
											<>
												<SplitLine />
												<AddButton
													isEnd={n.children.length === 0}
													fillLine={n.children.length === 0}
													onAdd={onAdd(0)}
												/>
												{n.children.map((child, i, self) => {
													return (
														<RenderNode
															key={i}
															node={child}
															onRemove={onRemove}
															onChange={(n) => {
																node.children[index].children[i] = n;
																toChange();
															}}
															onAdd={onAdd(i + 1)}
															isEnd={i === self.length - 1}
														/>
													);
												})}
											</>
										)}
									</div>
									<CoverLine className={`cover-condition-end ${coverIndexClassName}`} />
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default ConditionNode;
