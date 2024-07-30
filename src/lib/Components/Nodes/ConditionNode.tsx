import React, { useContext, useEffect, useRef, useState } from "react";
import { INode, INodeProps } from "../../Types";
import ActionNode from "./ActionNode";
import { CoverLine, FillLine, SplitLine } from "../Lines";
import AddButton from "../AddButton";
import { useUpdate } from "../../Hooks";
import { RenderNode } from "../ReactFlowUI";
import { BuilderContext } from "../../Contexts";

interface IProps extends INodeProps {}

// onRemove, onChange, data, children, next, isExpanded = false

const ConditionNode: React.FC<IProps> = ({ id, type, name, onRemove, onChange, onExpanded, data, children = [], next, isExpanded = false, ...node }) => {
	const update = useUpdate();
	const { lineColor } = useContext(BuilderContext);
	const [show, setShow] = useState<boolean>(isExpanded);
	const nodes = useRef<INode[]>(children);
	const dataRef = useRef(data);

	const toChange = () => {
		const node: INode = {
			id,
			name,
			type,
			data: dataRef.current,
			children: nodes.current,
			next,
			isExpanded: show,
		};

		onChange?.(node);
	};

	useEffect(() => {
		toChange();
		onExpanded?.(show);
	}, [show]);

	return (
		<>
			<ActionNode
				{...node}
				type="action"
				id={id}
				name={name}
				data={data}
				children={children}
				next={[]}
				isExpanded={isExpanded}
				onRemove={onRemove}
				onChange={({ data }) => {
					dataRef.current = data;
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
						{nodes.current.map(({ children = [], ...node }, index, self) => {
							const coverIndexClassName = index === 0 ? "cover-first" : index === self.length - 1 ? "cover-last" : "cover-middle";

							const onAdd = (i: number) => (node: INode) => {
								const start = children.slice(0, i);
								const end = children.slice(i);
								nodes.current[index].children = [...start, node, ...end];
								update();
								toChange();
							};

							const onRemove = (id: string) => {
								const i = children.findIndex((node) => node.id === id);
								children.splice(i, 1);
								nodes.current[index].children = children;
								update();
								toChange();
							};

							return (
								<div
									className="flow-ui-node flow-ui-condition-node"
									key={node.id}
								>
									<CoverLine className={`cover-condition-start ${coverIndexClassName}`} />
									<div className="flow-ui-node">
										<SplitLine minSpace={35} />
										<ActionNode
											{...node}
											isEditable={false}
											isContent={false}
											fullWidth={true}
											onExpanded={(expanded) => {
												nodes.current[index].isExpanded = expanded;
												update();
												toChange();
											}}
										/>
										{!node.isExpanded ? (
											<FillLine />
										) : (
											<>
												<SplitLine />
												<AddButton
													isEnd={children.length === 0}
													fillLine={children.length === 0}
													onAdd={onAdd(0)}
												/>
												{children.map((child, i, self) => {
													return (
														<RenderNode
															key={i}
															{...child}
															onRemove={onRemove}
															onChange={(node) => {
																self[i] = node;
																nodes.current[index].children = self;
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
