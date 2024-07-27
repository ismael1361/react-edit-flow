export interface INode {
	id: string;
	type: string;
	name: string;
	data?: any;
	children?: INode[];
	path?: string[];
	configuring?: boolean;
	validateStatusError?: boolean;
	next?: string[];
	[key: string]: any;
}

export interface INodeContext extends INode {}

export interface IFlowUiContext {}
