import React from "react";
import { INodeField } from "./NodeField";
import { IVariableDefinition, Required } from "./Types";
export type INodeType = "start" | "end" | "condition" | "action";
export interface RegisterNodeJSON {
    name: string;
    id: string;
    children: RegisterNodeJSON[];
    collapsed?: boolean;
    deletable?: boolean;
    fields: Record<string, any>;
}
declare class RegisterNode {
    readonly options: {
        id?: string;
        name: string;
        init: (this: RegisterNode, node: RegisterNode) => void;
        generator?: (this: RegisterNode, node: RegisterNode, typeCode: "javascript" | "python" | "java" | "lua" | "dart") => string;
        validate?: (this: RegisterNode, node: RegisterNode) => Array<{
            type: "error" | "warning" | "info";
            message: string;
        }>;
        update?: (this: RegisterNode, node: RegisterNode) => void;
    };
    readonly id: string;
    type: INodeType;
    name: string;
    title: string;
    category: string[];
    icon: React.ReactNode;
    color?: string;
    helpUrl: string;
    keys: string[];
    operable: boolean;
    children: RegisterNode[];
    collapsed: boolean;
    deletable: boolean;
    fields: INodeField[];
    fieldsInitialProps: Record<string, any>;
    variables?: Required<IVariableDefinition, "name">[];
    previousStatement: boolean;
    checkPreviousStatement: string[] | null;
    nextStatement: boolean;
    checkNextStatement: string[] | null;
    tooltip: string | (() => string);
    readonly generator?: (this: RegisterNode, typeCode: "javascript" | "python" | "java" | "lua" | "dart") => string;
    readonly validate?: (this: RegisterNode) => Array<{
        type: "error" | "warning" | "info";
        message: string;
    }>;
    readonly update: (this: RegisterNode) => void;
    constructor(options: {
        id?: string;
        name: string;
        init: (this: RegisterNode, node: RegisterNode) => void;
        generator?: (this: RegisterNode, node: RegisterNode, typeCode: "javascript" | "python" | "java" | "lua" | "dart") => string;
        validate?: (this: RegisterNode, node: RegisterNode) => Array<{
            type: "error" | "warning" | "info";
            message: string;
        }>;
        update?: (this: RegisterNode, node: RegisterNode) => void;
    });
    init(): void;
    createNode(options?: Partial<{
        id: string;
    }>): RegisterNode;
    toJSON(): RegisterNodeJSON;
    static fromJSON(json: RegisterNodeJSON[], nodes: RegisterNode[]): RegisterNode[];
    get isCollapsed(): boolean;
    /**
     * Definir se o bloco está colapsado.
     * @param collapsed Verdadeiro se o bloco estiver colapsado.
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Defina o tipo do bloco.
     * @param type O tipo do bloco.
     */
    setType(type: INodeType): void;
    /**
     * Defina o titulo do bloco.
     * @param title O título do bloco.
     */
    setTitle(title: string): void;
    /**
     * Defina as chaves de busca do bloco.
     * @param keys As chaves de busca do bloco.
     */
    setKeys(keys: string[]): void;
    /**
     * Defina o ícone do bloco.
     * @param icon O ícone do bloco.
     */
    setIcon(icon: React.ReactNode): void;
    /**
     * Defina a categoria do bloco.
     * @param category Uma string ou uma matriz de strings de categorias do bloco.
     */
    setCategory(category: string | string[]): void;
    /**
     * Defina a cor do bloco.
     * @param colour Valor de matiz HSV (0 a 360) ou string #RRGGBB.
     */
    setColour(colour: number | string): void;
    /**
     * Define a URL de ajuda do bloco.
     * @param url URL de ajuda do bloco.
     */
    setHelpUrl(url: string): void;
    /**
     * Define se o bloco é operável.
     * @param operable Verdadeiro se o bloco for operável.
     */
    setOperable(operable: boolean): void;
    /**
     * Define um texto de dica de ferramenta para o bloco.
     * @param tooltip O texto de dica de ferramenta.
     */
    setTooltip(tooltip: string | (() => string)): void;
    /**
     * Define se o bloco pode ser deletado.
     * @param deletable Verdadeiro se o bloco puder ser deletado.
     */
    setDeletable(deletable: boolean): void;
    /**
     * Acrescenta a linha de entrada fornecida.
     *
     * Permite que entradas personalizadas sejam anexadas ao bloco.
     * @param fieldName O nome do campo.
     * @param input O campo de entrada.
     */
    appendInput(fieldName: string, input: INodeField): void;
    /**
     * Adiciona uma label ao bloco.
     * @param fieldName O nome do campo.
     * @param label O texto a inserir ao bloco.
     */
    appendField(fieldName: string, label: string): void;
    appendFieldVariable(fieldName: string, name?: string, expressionType?: IVariableDefinition["expressionType"]): void;
    /**
     * Adiciona um campo de texto ao bloco.
     * @param fieldName O nome do campo.
     * @param label O texto que aparece ao lado do campo.
     * @param value O valor padrão do campo.
     * @param type O tipo do campo.
     */
    appendFieldTextInput(fieldName: string, label: string, value?: string, type?: string): void;
    /**
     * Adiciona um campo numérico ao bloco.
     * @param fieldName O nome do campo.
     * @param label O texto que aparece ao lado do campo.
     * @param value O valor padrão do campo.
     * @param min O valor mínimo que o campo pode ter.
     * @param max O valor máximo que o campo pode ter.
     * @param step O valor do passo do campo.
     */
    appendFieldNumber(fieldName: string, label: string, value?: number, min?: number | null, max?: number | null, step?: number | null): void;
    /**
     * Adiciona um campo booleano ao bloco.
     * @param fieldName O nome do campo.
     * @param label O texto que aparece ao lado do campo.
     * @param value O valor padrão do campo.
     */
    appendFieldBoolean(fieldName: string, label: string, value?: boolean): void;
    /**
     * Adiciona um campo de data ao bloco.
     * @param fieldName O nome do campo.
     * @param label O texto que aparece ao lado do campo.
     * @param value O valor padrão do campo.
     */
    appendFieldDate(fieldName: string, label: string, value?: string): void;
    /**
     * Adiciona um campo de seleção ao bloco.
     * @param fieldName O nome do campo.
     * @param items Os itens que aparecem no campo.
     * @param label O texto que aparece ao lado do campo.
     * @param value O valor padrão do campo.
     */
    appendFieldDropdown(fieldName: string, items: Array<[string, string]>, label: string, value?: string | number): void;
    /**
     * Adiciona um campo de caixa de seleção ao bloco.
     * @param fieldName O nome do campo.
     * @param label O texto que aparece ao lado do campo.
     * @param value O valor padrão do campo.
     */
    appendFieldCheckbox(fieldName: string, label: string, value?: boolean): void;
    /**
     * Adiciona um campo de imagem ao bloco.
     * @param fieldName O nome do campo.
     * @param src O URL da imagem.
     * @param width A largura da imagem.
     * @param height A altura da imagem.
     * @param alt O texto alternativo da imagem.
     */
    appendFieldImage(fieldName: string, src: string, width: string | number, height: string | number, alt?: string): void;
    /**
     * Obtenha os campos do bloco.
     * @returns Os campos do bloco.
     */
    getFields(): INodeField[];
    findFieldIndex(fieldName: string): number;
    /**
     * Obtenha um campo.
     * @param fieldName O nome do campo.
     */
    getField(fieldName: string): Record<string, any> | undefined;
    /**
     * Defina o valor de um campo.
     * @param fieldName O nome do campo.
     * @param value O valor do campo.
     */
    setFieldValue(fieldName: string, value: any): void;
    /**
     * Obtenha o valor de um campo.
     * @param fieldName O nome do campo.
     */
    getFieldValue(fieldName: string): any;
    /**
     * Ocultar um campo.
     * @param fieldName O nome do campo.
     */
    hideField(fieldName: string): void;
    /**
     * Exibir um campo.
     * @param fieldName O nome do campo.
     */
    showField(fieldName: string): void;
    /**
     * Defina se outro bloco pode ser encadeado na parte superior deste bloco.
     * @param newBoolean Verdadeiro se puder haver uma afirmação anterior.
     * @param opt_check Opcional, uma string ou uma matriz de strings que contém os tipos de blocos que podem ser encadeados.
     */
    setPreviousStatement(newBoolean: boolean, opt_check?: string | string[] | null): void;
    /**
     * Defina se outro bloco pode ser encadeado na parte inferior deste bloco.
     * @param newBoolean Verdadeiro se puder haver uma próxima afirmação.
     * @param opt_check Opcional, uma string ou uma matriz de strings que contém os tipos de blocos que podem ser encadeados.
     */
    setNextStatement(newBoolean: boolean, opt_check?: string | string[] | null): void;
}
export default RegisterNode;
