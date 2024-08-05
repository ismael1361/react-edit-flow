import React, { useCallback, useEffect, useRef } from "react";
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

const getGridImage = (options: Partial<{ spacing: number; length: number; width: number; colour: string }>) => {
	const { spacing = 20, length = 5, width = 1, colour = "#757575" } = options;

	const positionTop = spacing / 2 - length / 2 + width / 2;
	const positionBottom = spacing / 2 + length / 2 + width / 2;
	const positionLeft = spacing / 2 + width / 2;
	const positionRight = spacing / 2 + width / 2;

	return (
		"data:image/svg+xml;base64," +
		btoa(`<svg width="${spacing}px" height="${spacing}px" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="${spacing}" height="${spacing}">
      <line stroke="${colour}" stroke-width="${width}" x1="${positionTop}" y1="${positionLeft}" x2="${positionBottom}" y2="${positionRight}"></line>
      <line stroke="${colour}" stroke-width="${width}" x1="${positionLeft}" y1="${positionTop}" x2="${positionRight}" y2="${positionBottom}"></line>
    </pattern>
  </defs>
  <rect width="${spacing}px" height="${spacing}px" fill="url(#gridPattern)" />
</svg>
`)
	);
};

const Build: React.FC<{
	variables?: Required<IVariableDefinition, "name">[];
}> = ({ variables: v = [] }) => {
	const mainDiv = useRef<HTMLDivElement>(null);
	const update = useUpdate();
	const { layout = "vertical", grid } = React.useContext(BuilderContext) ?? {};
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
	}, [nodes.current]);

	useEffect(() => {
		const time = setInterval(() => {
			const { spacing = 20 } = grid;

			const startNode = mainDiv.current?.querySelector(".flow-ui-start-node");
			if (!mainDiv.current || !startNode) {
				return;
			}

			const { left, top, width, height } = startNode.getBoundingClientRect();

			const positionX = (left % spacing) + ((width / 2) % spacing);
			const positionY = (top % spacing) - ((height / 2) % spacing);

			mainDiv.current.style.backgroundPositionX = `${positionX}px`;
			mainDiv.current.style.backgroundPositionY = `${positionY}px`;
		}, 10);

		return () => {
			clearInterval(time);
		};
	}, [grid, mainDiv.current]);

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

	const gridOptions = { spacing: 20, length: 1, width: 1, colour: "#9e9e9e" };

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
			<div
				ref={mainDiv}
				className="flow-ui-content"
				style={{
					backgroundImage: `url("${getGridImage(gridOptions)}")`,
				}}
			>
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
