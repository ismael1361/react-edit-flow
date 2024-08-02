import React from "react";
import { INodeField } from "./NodeField";
import { IVariableDefinition, Required } from "./Types";
import { parseBlockColour, uuidv4 } from "./Utils";
import { mdiCheckCircle, mdiCloseCircle } from "@mdi/js";

export type INodeType = "start" | "end" | "condition" | "action";

class RegisterNode {
	readonly id: string = uuidv4();

	// Defina o tipo do bloco.
	type: INodeType = "action";
	// Defina o nome do bloco.
	name: string = "";
	// Defina o titulo do bloco.
	title: string = "";
	// Defina a categoria do bloco.
	category: string[] = [];
	// Defina o ícone do bloco.
	icon: React.ReactNode = "";
	// Defina a cor do bloco.
	color?: string;
	// Define a URL de ajuda do bloco.
	helpUrl: string = "";
	// Define as chaves de busca do bloco.
	keys: string[] = [];
	// Define se o bloco é operável.
	operable: boolean = true;
	// Define os filhos do bloco.
	children: RegisterNode[] = [];
	// Define se o bloco está colapsado.
	collapsed: boolean = false;
	// Define se o bloco pode ser deletado.
	deletable: boolean = true;

	// Campos personalizados do bloco.
	fields: INodeField[] = [];
	// Variáveis do bloco.
	variables?: Required<IVariableDefinition, "name">[];

	// Defina se outro bloco pode ser encadeado na parte superior deste bloco.
	previousStatement: boolean = true;
	// Uma string ou uma matriz de strings que contém os tipos de blocos que podem ser encadeados.
	checkPreviousStatement: string[] | null = null;
	// Defina se outro bloco pode ser encadeado na parte inferior deste bloco.
	nextStatement: boolean = true;
	// Uma string ou uma matriz de strings que contém os tipos de blocos que podem ser encadeados.
	checkNextStatement: string[] | null = null;
	// Define o texto de dica de ferramenta do bloco.
	tooltip: string | (() => string) = "";

	readonly generator?: (this: RegisterNode, node: RegisterNode, typeCode: "javascript" | "python" | "java" | "lua" | "dart") => string;
	readonly validate?: (this: RegisterNode, node: RegisterNode) => Array<{ type: "error" | "warning" | "info"; message: string }>;

	constructor(
		readonly options: {
			name: string;
			init: (this: RegisterNode, node: RegisterNode) => void;
			generator?: (this: RegisterNode, node: RegisterNode, typeCode: "javascript" | "python" | "java" | "lua" | "dart") => string;
			validate?: (this: RegisterNode, node: RegisterNode) => Array<{ type: "error" | "warning" | "info"; message: string }>;
		},
	) {
		this.generator = options.generator ? options.generator.bind(this) : undefined;
		this.validate = options.validate ? options.validate.bind(this) : undefined;

		options.init.call(this, this);

		if (this.type === "condition") {
			this.children = [];
			this.children.push(
				new RegisterNode({
					name: "if",
					init(node) {
						node.setType("action");
						node.setTitle("If yes");
						node.setIcon(mdiCheckCircle);
						node.setColour("#4CAF50");
						node.setCategory("control");
						node.setOperable(false);
					},
				}),
			);
			this.children.push(
				new RegisterNode({
					name: "else",
					init(node) {
						node.setType("action");
						node.setTitle("If no");
						node.setIcon(mdiCloseCircle);
						node.setColour("#F44336");
						node.setCategory("control");
						node.setOperable(false);
					},
				}),
			);
		}
	}

	createNode() {
		return new RegisterNode(this.options);
	}

	get isCollapsed() {
		return this.collapsed;
	}

	/**
	 * Definir se o bloco está colapsado.
	 * @param collapsed Verdadeiro se o bloco estiver colapsado.
	 */
	setCollapsed(collapsed: boolean) {
		this.collapsed = collapsed;
	}

	/**
	 * Defina o tipo do bloco.
	 * @param type O tipo do bloco.
	 */
	setType(type: INodeType) {
		this.type = type;
	}

	/**
	 * Defina o titulo do bloco.
	 * @param title O título do bloco.
	 */
	setTitle(title: string) {
		this.title = title;
	}

	/**
	 * Defina as chaves de busca do bloco.
	 * @param keys As chaves de busca do bloco.
	 */
	setKeys(keys: string[]) {
		this.keys = keys;
	}

	/**
	 * Defina o ícone do bloco.
	 * @param icon O ícone do bloco.
	 */
	setIcon(icon: React.ReactNode) {
		this.icon = icon;
	}

	/**
	 * Defina a categoria do bloco.
	 * @param category Uma string ou uma matriz de strings de categorias do bloco.
	 */
	setCategory(category: string | string[]) {
		this.category = Array.isArray(category) ? category : [category];
	}

	/**
	 * Defina a cor do bloco.
	 * @param colour Valor de matiz HSV (0 a 360) ou string #RRGGBB.
	 */
	setColour(colour: number | string) {
		this.color = parseBlockColour(colour).hex;
	}

	/**
	 * Define a URL de ajuda do bloco.
	 * @param url URL de ajuda do bloco.
	 */
	setHelpUrl(url: string) {
		this.helpUrl = url;
	}

	/**
	 * Define se o bloco é operável.
	 * @param operable Verdadeiro se o bloco for operável.
	 */
	setOperable(operable: boolean) {
		this.operable = operable;
	}

	/**
	 * Define um texto de dica de ferramenta para o bloco.
	 * @param tooltip O texto de dica de ferramenta.
	 */
	setTooltip(tooltip: string | (() => string)) {
		this.tooltip = tooltip;
	}

	/**
	 * Define se o bloco pode ser deletado.
	 * @param deletable Verdadeiro se o bloco puder ser deletado.
	 */
	setDeletable(deletable: boolean) {
		this.deletable = deletable;
	}

	/**
	 * Acrescenta a linha de entrada fornecida.
	 *
	 * Permite que entradas personalizadas sejam anexadas ao bloco.
	 */
	appendInput(input: INodeField) {
		this.fields.push(input);
	}

	/**
	 * Adiciona uma label ao bloco.
	 * @param label O texto a inserir ao bloco.
	 */
	appendField(label: string) {}

	appendFieldVariable(fieldName: string, name: string, expressionType?: IVariableDefinition["expressionType"]) {
		this.fields.push({
			fieldName,
			type: "variable",
			name,
			expressionType,
		});
	}

	/**
	 * Adiciona um campo de texto ao bloco.
	 * @param fieldName O nome do campo.
	 * @param label O texto que aparece ao lado do campo.
	 * @param value O valor padrão do campo.
	 * @param type O tipo do campo.
	 */
	appendFieldTextInput(fieldName: string, label: string, value?: string, type?: string) {
		this.fields.push({
			fieldName,
			type: "input",
			label,
			value: {
				type: type ?? "text",
				default: value,
			},
		});
	}

	/**
	 * Adiciona um campo numérico ao bloco.
	 * @param fieldName O nome do campo.
	 * @param label O texto que aparece ao lado do campo.
	 * @param value O valor padrão do campo.
	 * @param min O valor mínimo que o campo pode ter.
	 * @param max O valor máximo que o campo pode ter.
	 * @param step O valor do passo do campo.
	 */
	appendFieldNumber(fieldName: string, label: string, value?: number, min?: number | null, max?: number | null, step?: number | null) {
		this.fields.push({
			fieldName,
			type: "input",
			label,
			value: {
				type: "number",
				default: value,
				min: min ?? undefined,
				max: max ?? undefined,
				step: step ?? undefined,
			},
		});
	}

	/**
	 * Adiciona um campo booleano ao bloco.
	 * @param fieldName O nome do campo.
	 * @param label O texto que aparece ao lado do campo.
	 * @param value O valor padrão do campo.
	 */
	appendFieldBoolean(fieldName: string, label: string, value?: boolean) {
		this.fields.push({
			fieldName,
			type: "input",
			label,
			value: {
				type: "boolean",
				default: value,
			},
		});
	}

	/**
	 * Adiciona um campo de seleção ao bloco.
	 * @param fieldName O nome do campo.
	 * @param items Os itens que aparecem no campo.
	 * @param label O texto que aparece ao lado do campo.
	 * @param value O valor padrão do campo.
	 */
	appendFieldDropdown(fieldName: string, items: Array<[string, string]>, label: string, value?: string | number) {}

	/**
	 * Adiciona um campo de caixa de seleção ao bloco.
	 * @param fieldName O nome do campo.
	 * @param label O texto que aparece ao lado do campo.
	 * @param value O valor padrão do campo.
	 */
	appendFieldCheckbox(fieldName: string, label: string, value?: boolean) {}

	/**
	 * Adiciona um campo de imagem ao bloco.
	 * @param src O URL da imagem.
	 * @param width A largura da imagem.
	 * @param height A altura da imagem.
	 * @param alt O texto alternativo da imagem.
	 */
	appendFieldImage(src: string, width: string | number, height: string | number, alt?: string) {}

	/**
	 * Obtenha um campo.
	 * @param fieldName O nome do campo.
	 */
	getField(fieldName: string): Record<string, any> | undefined {
		return this.fields.find((field) => field.fieldName === fieldName);
	}

	/**
	 * Defina o valor de um campo.
	 * @param fieldName O nome do campo.
	 * @param value O valor do campo.
	 */
	setFieldValue(fieldName: string, value: any) {
		const index = this.fields.findIndex((field) => field.fieldName === fieldName);
		if (index >= 0) {
			this.fields[index].value = value;
		}
	}

	/**
	 * Obtenha o valor de um campo.
	 * @param fieldName O nome do campo.
	 */
	getFieldValue(fieldName: string) {
		const { value } = this.fields.find((field) => field.fieldName === fieldName) ?? {};
		return value ?? null;
	}

	/**
	 * Defina se outro bloco pode ser encadeado na parte superior deste bloco.
	 * @param newBoolean Verdadeiro se puder haver uma afirmação anterior.
	 * @param opt_check Opcional, uma string ou uma matriz de strings que contém os tipos de blocos que podem ser encadeados.
	 */
	setPreviousStatement(newBoolean: boolean, opt_check?: string | string[] | null) {
		this.previousStatement = newBoolean;
		if (opt_check) {
			this.checkPreviousStatement = Array.isArray(opt_check) ? opt_check : [opt_check];
		}
	}

	/**
	 * Defina se outro bloco pode ser encadeado na parte inferior deste bloco.
	 * @param newBoolean Verdadeiro se puder haver uma próxima afirmação.
	 * @param opt_check Opcional, uma string ou uma matriz de strings que contém os tipos de blocos que podem ser encadeados.
	 */
	setNextStatement(newBoolean: boolean, opt_check?: string | string[] | null) {
		this.nextStatement = newBoolean;
		if (opt_check) {
			this.checkNextStatement = Array.isArray(opt_check) ? opt_check : [opt_check];
		}
	}
}

export default RegisterNode;
