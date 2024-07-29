import React, { useRef } from "react";
import { FileAnalyzer, uuidv4 } from "../../Utils";
import { ActionNode, ConditionNode, EndNode, OperationsNode, StartNode } from "../Nodes";
import { BuilderContext, BuilderProvider, IFlowUiContext, NodeContext, NodeProvider } from "../../Contexts";
import { INode, INodeProps, IRegisterNode, IVariableDefinition } from "../../Types";
import ListNodes from "../../ListNodes";

import "./styles.scss";
import { SplitLine } from "../Lines";
import AddButton from "../AddButton";
import { useUpdate } from "../../Hooks";

interface IProps extends Partial<Omit<IFlowUiContext, "addAction" | "categories">> {
	className?: string;
	style?: any;
	nodes?: INode[];
	onChange?: (nodes: INode[]) => void;
}

export const RenderNode: React.FC<INodeProps & { isEnd?: boolean }> = ({ onRemove, onChange, onAdd, isEnd = false, ...node }) => {
	return (
		<React.Fragment key={node.id}>
			{node.type === "action" ? (
				<ActionNode
					key={node.id}
					{...node}
					onRemove={onRemove}
					onChange={onChange}
				/>
			) : node.type === "condition" ? (
				<ConditionNode
					key={node.id}
					{...node}
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

const Build: React.FC<{
	variables?: IVariableDefinition[];
}> = ({ variables: v = [] }) => {
	const update = useUpdate();
	const context = React.useContext(BuilderContext) ?? {};
	const { layout = "vertical" } = context;
	const beforeNodes = React.useContext(NodeContext);
	const nodes = useRef<INode[]>([]);
	const [variables, setVariables] = React.useState<IVariableDefinition[]>([]);

	const onAdd = (index: number) => (node: INode) => {
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
				type: "action",
				id: uuidv4(),
				name: "main",
				children: [
					{
						type: "start",
						id: uuidv4(),
						name: "start",
						children: [],
						variables: [],
					},
					...nodes.current,
					{
						type: "end",
						id: uuidv4(),
						name: "end",
						children: [],
						variables: [],
					},
				],
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
								{...node}
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

const ReactFlowUI: React.FC<IProps> = ({ className = "", style = {}, registerNodes = {}, variables, ...options }) => {
	(window as any).FileAnalyzer = FileAnalyzer;

	return (
		<BuilderProvider
			value={{
				lineColor: "#9e9e9e",
				spaceX: 15,
				spaceY: 15,
				...options,
				registerNodes: {
					...ListNodes,
					...Object.fromEntries(
						Object.entries(registerNodes)
							.filter(([key]) => {
								return !(key in ListNodes);
							})
							.map(([key, value]) => {
								value.category = value.category ?? "other";
								value.category = Array.isArray(value.category) ? [...value.category, "other"] : [value.category];
								return [key, value as IRegisterNode];
							}),
					),
				},
			}}
		>
			<Build variables={variables} />
		</BuilderProvider>
	);
};

export default ReactFlowUI;
