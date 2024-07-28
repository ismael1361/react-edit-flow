import React from "react";
import { FileAnalyzer } from "../../Utils";
import { ActionNode, EndNode, OperationsNode, StartNode } from "../Nodes";
import { BuilderContext, BuilderProvider, IFlowUiContext, NodeProvider } from "../../Contexts";
import { INode, IRegisterNode } from "../../Types";
import ListNodes from "../../ListNodes";

import "./styles.scss";

interface IProps extends Partial<Omit<IFlowUiContext, "addAction" | "categories">> {
	className?: string;
	style?: any;
	nodes?: INode[];
	onChange?: (nodes: INode[]) => void;
}

const Build: React.FC = () => {
	const { layout = "vertical" } = React.useContext(BuilderContext) ?? {};
	const [nodes, setNodes] = React.useState<INode[]>([]);

	const onAdd = (node: INode) => {
		setNodes([...nodes, node]);
	};

	const onRemove = (id: string) => {
		setNodes(nodes.filter((node) => node.id !== id));
	};

	return (
		<div className="flow-ui-content">
			<div
				className={`flow-ui flow-ui-${layout}`}
				style={{ zoom: `${100}%` }}
			>
				<StartNode onAdd={onAdd} />
				{nodes.map((node, index) => {
					return (
						<React.Fragment key={index}>
							{node.type === "action" ? (
								<ActionNode
									{...node}
									onAdd={onAdd}
									onRemove={onRemove}
								/>
							) : null}
						</React.Fragment>
					);
				})}
				<EndNode />
			</div>
		</div>
	);
};

const ReactFlowUI: React.FC<IProps> = ({ className = "", style = {}, registerNodes = {}, ...options }) => {
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
			<Build />
		</BuilderProvider>
	);
};

export default ReactFlowUI;
