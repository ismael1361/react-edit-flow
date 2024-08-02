import React, { useEffect, useRef } from "react";
import { FileAnalyzer, uuidv4 } from "../../Utils";
import { ActionNode, ConditionNode, EndNode, OperationsNode, StartNode } from "../Nodes";
import { BuilderContext, BuilderProvider, IFlowUiContext, NodeContext, NodeProvider } from "../../Contexts";
import { INodeProps, IVariableDefinition, Required } from "../../Types";
import ListNodes from "../../ListNodes";

import "./styles.scss";
import { SplitLine } from "../Lines";
import AddButton from "../AddButton";
import { useUpdate } from "../../Hooks";
import RegisterNode from "../../RegisterNode";

interface IProps extends Partial<Omit<IFlowUiContext, "addAction" | "categories">> {
	className?: string;
	style?: any;
	nodes?: RegisterNode[];
	onChange?: (nodes: RegisterNode[]) => void;
}

export const RenderNode: React.FC<INodeProps & { isEnd?: boolean }> = ({ node, onRemove, onChange, onAdd, isEnd = false }) => {
	return (
		<React.Fragment key={node.id}>
			{node.type === "action" ? (
				<ActionNode
					key={node.id}
					node={node}
					onRemove={onRemove}
					onChange={onChange}
				/>
			) : node.type === "condition" ? (
				<ConditionNode
					key={node.id}
					node={node}
					onRemove={onRemove}
					onChange={onChange}
				/>
			) : null}
			<SplitLine />
			<AddButton
				onAdd={onAdd}
				isEnd={isEnd}
				fillLine={isEnd}
			/>
		</React.Fragment>
	);
};

const MainNode = new RegisterNode({ name: "main", init() {} });

const Build: React.FC<{
	variables?: Required<IVariableDefinition, "name">[];
}> = ({ variables: v = [] }) => {
	const update = useUpdate();
	const context = React.useContext(BuilderContext) ?? {};
	const { layout = "vertical" } = context;
	const beforeNodes = React.useContext(NodeContext);
	const nodeRef = useRef<RegisterNode>(MainNode.createNode());
	const nodes = useRef<RegisterNode[]>([]);
	const [variables, setVariables] = React.useState<Required<IVariableDefinition, "name">[]>([]);

	useEffect(() => {
		nodeRef.current.children = [
			new RegisterNode({
				name: "start",
				init(node) {
					node.setType("start");
				},
			}),
			...nodes.current,
			new RegisterNode({
				name: "end",
				init(node) {
					node.setType("end");
				},
			}),
		];
	}, [nodes]);

	const onAdd = (index: number) => (node: RegisterNode) => {
		const start = nodes.current.slice(0, index);
		const end = nodes.current.slice(index);
		nodes.current = [...start, node, ...end];
		update();
	};

	const onRemove = (id: string) => {
		const index = nodes.current.findIndex((node) => node.id === id);
		nodes.current.splice(index, 1);
		update();
	};

	return (
		<NodeProvider
			value={{
				node: nodeRef.current,
				defineVariable: () => {},
				getVariables: () => {
					return v.concat(beforeNodes.getVariables(), variables);
				},
			}}
		>
			<div className="flow-ui-content">
				<div
					className={`flow-ui flow-ui-${layout}`}
					style={{ zoom: `${100}%` }}
				>
					<StartNode onAdd={onAdd(0)} />
					{nodes.current.map((node, index) => {
						return (
							<RenderNode
								key={index}
								node={node}
								onRemove={onRemove}
								onChange={(node) => {
									nodes.current[index] = node;
								}}
								onAdd={onAdd(index + 1)}
							/>
						);
					})}
					<EndNode />
				</div>
			</div>
		</NodeProvider>
	);
};

const ReactFlowUI: React.FC<IProps> = ({ className = "", style = {}, registerNodes = [], variables, ...options }) => {
	(window as any).FileAnalyzer = FileAnalyzer;

	return (
		<BuilderProvider
			value={{
				lineColor: "#9e9e9e",
				spaceX: 15,
				spaceY: 15,
				...options,
				registerNodes: [...ListNodes, ...registerNodes],
			}}
		>
			<Build variables={variables} />
		</BuilderProvider>
	);
};

export default ReactFlowUI;
