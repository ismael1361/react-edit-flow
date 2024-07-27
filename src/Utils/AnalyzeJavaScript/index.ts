import { parse } from "@babel/parser";
import { File, Node } from "@babel/types";

type FilesCode<P extends string = string> = {
	[path in P]: {
		type: "CJS" | "ESM";
		extension: "js" | "ts";
		code: string;
	};
};

export const FileAnalyzer = (files: FilesCode) => {
	const results: {
		[path in keyof FilesCode]: {
			exports: any[];
			globals: any[];
		};
	} = {};

	Object.entries(files).forEach(([path, file]) => {
		results[path] = analyzeJavaScript(file.code);
	});

	return results;
};

const types = {
	FunctionDeclaration: "function",
	VariableDeclaration: "variable",
	ClassDeclaration: "class",
	ExportNamedDeclaration: "export",
	ExportDefaultDeclaration: "export",
	Unknown: "unknown",
} as const;

type DeclarationItem = {
	type: (typeof types)[keyof typeof types];
	name: string;
	isExports: boolean;
} & (
	| {
			type: "function";
			arguments: string[];
			returnType: string;
	  }
	| {
			type: "variable";
			value: {
				type: string;
				isConstant: boolean;
			};
	  }
	| {
			type: "class";
			methods: string[];
			properties: string[];
			arguments: string[];
	  }
	| {
			type: "export";
			isDefault: boolean;
	  }
	| {
			type: "unknown";
	  }
);

const analyzeJavaScript = (code: string) => {
	const ast: File = parse(code, { sourceType: "module", plugins: ["typescript"] });
	console.log(ast.program.body);
	const scope: {
		exports: DeclarationItem[];
		globals: DeclarationItem[];
	} = {
		exports: [],
		globals: [],
	};

	let file: File | undefined;

	const visit = (node: Node) => {
		if (node.type === "File") {
			file = node;
			return;
		}
		Object.values(node).forEach((value: any) => {
			if (value && typeof value === "object") {
				if (Array.isArray(value)) {
					value.forEach((node: any) => visit(node));
				} else {
					visit(value);
				}
			}
		});
	};

	visit(ast);

	const getNameDeclaration = (node: Node, list: DeclarationItem[], declaration?: Partial<DeclarationItem>): string => {
		let name: string = "unknown";

		switch (node.type) {
			case "FunctionDeclaration": {
				name = node.id?.name ?? name;
				list.push({
					type: "function",
					name,
					isExports: declaration?.isExports === true ?? false,
					arguments: node.params.map((param) => (param.type === "Identifier" ? param.name : "unknown")),
					returnType: node.returnType?.type === "TSTypeAnnotation" ? node.returnType.typeAnnotation.type : "unknown",
				});
				break;
			}
			case "VariableDeclaration": {
				name = node.declarations[0].id.type === "Identifier" ? node.declarations[0].id.name : name;
				list.push({
					type: "variable",
					name,
					isExports: declaration?.isExports === true ?? false,
					value: {
						type: node.declarations[0].init?.type ?? "unknown",
						isConstant: node.kind === "const",
					},
				});
				break;
			}
			case "ClassDeclaration": {
				name = node.id?.name ?? name;
				list.push({
					type: "class",
					name,
					isExports: declaration?.isExports === true ?? false,
					arguments: [],
					methods: [],
					properties: [],
				});
				break;
			}
			case "ExportNamedDeclaration": {
				name = node.declaration
					? getNameDeclaration(node.declaration, list, {
							isExports: true,
							isDefault: false,
					  })
					: name;
				if (name !== "unknown") {
					return name;
				}
				list.push({
					type: "export",
					name,
					isExports: true,
					isDefault: false,
				});
				break;
			}
			case "ExportDefaultDeclaration": {
				name = node.declaration
					? getNameDeclaration(node.declaration, list, {
							isExports: true,
							isDefault: true,
					  })
					: "default";
				list.push({
					type: "export",
					name,
					isExports: true,
					isDefault: true,
				});
				break;
			}
			case "Identifier": {
				name = node.name;
				break;
			}
		}

		return name;
	};

	file?.program.body.forEach((node) => {
		const result: DeclarationItem[] = [];

		getNameDeclaration(node, result);

		scope.exports.push(...result.filter((item) => item.isExports));
		scope.globals.push(...result);
	});

	return scope;
};
