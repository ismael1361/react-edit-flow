export interface Node {
	type: string;
	loc: SourceLocation | null;
}

interface SourceLocation {
	source: string | null;
	start: Position;
	end: Position;
}

interface Position {
	line: number; // >= 1
	column: number; // >= 0
}

interface Identifier extends Expression, Node {
	type: "Identifier";
	name: string;
}

interface PrivateName extends Node {
	type: "PrivateName";
	id: Identifier;
}

interface RegExpLiteral extends Expression {
	type: "RegExpLiteral";
	pattern: string;
	flags: string;
}

interface NullLiteral extends Expression {
	type: "NullLiteral";
}

interface StringLiteral extends Expression {
	type: "StringLiteral";
	value: string;
}

interface BooleanLiteral extends Expression {
	type: "BooleanLiteral";
	value: boolean;
}

interface NumericLiteral extends Expression {
	type: "NumericLiteral";
	value: number;
}

interface BigIntLiteral extends Expression {
	type: "BigIntLiteral";
	value: string;
}

interface DecimalLiteral extends Expression {
	type: "DecimalLiteral";
	value: string;
}

type Literal = StringLiteral | NumericLiteral | BigIntLiteral | NullLiteral | BooleanLiteral | RegExpLiteral | DecimalLiteral;

interface Program extends Node {
	type: "Program";
	interpreter: InterpreterDirective | null;
	sourceType: "script" | "module";
	body: Array<Statement | ImportDeclaration | ExportDeclaration>;
	directives: Array<Directive>;
}

interface Function extends Node {
	id: Identifier | null;
	params: Array<Pattern>;
	body: BlockStatement;
	generator: boolean;
	async: boolean;
}

interface ExpressionStatement extends Node {
	type: "ExpressionStatement";
	expression: Expression;
}

interface BlockStatement extends Node {
	type: "BlockStatement";
	body: Array<Statement>;
	directives: Array<Directive>;
}

interface EmptyStatement extends Node {
	type: "EmptyStatement";
}

interface DebuggerStatement extends Node {
	type: "DebuggerStatement";
}

interface WithStatement extends Node {
	type: "WithStatement";
	object: Expression;
	body: Statement;
}

interface ReturnStatement extends Node {
	type: "ReturnStatement";
	argument: Expression | null;
}

interface LabeledStatement extends Node {
	type: "LabeledStatement";
	label: Identifier;
	body: Statement;
}

interface BreakStatement extends Node {
	type: "BreakStatement";
	label: Identifier | null;
}

interface ContinueStatement extends Node {
	type: "ContinueStatement";
	label: Identifier | null;
}

interface IfStatement extends Node {
	type: "IfStatement";
	test: Expression;
	consequent: Statement;
	alternate: Statement | null;
}

interface SwitchStatement extends Node {
	type: "SwitchStatement";
	discriminant: Expression;
	cases: [SwitchCase];
}

interface SwitchCase extends Node {
	type: "SwitchCase";
	test: Expression | null;
	consequent: Array<Statement>;
}

interface ThrowStatement extends Node {
	type: "ThrowStatement";
	argument: Expression;
}

interface TryStatement extends Node {
	type: "TryStatement";
	block: BlockStatement;
	handler: CatchClause | null;
	finalizer: BlockStatement | null;
}

interface CatchClause extends Node {
	type: "CatchClause";
	param?: Pattern;
	body: BlockStatement;
}

interface WhileStatement extends Node {
	type: "WhileStatement";
	test: Expression;
	body: Statement;
}

interface DoWhileStatement extends Node {
	type: "DoWhileStatement";
	body: Statement;
	test: Expression;
}

interface ForStatement extends Node {
	type: "ForStatement";
	init: VariableDeclaration | Expression | null;
	test: Expression | null;
	update: Expression | null;
	body: Statement;
}

interface ForInStatement extends Node {
	type: "ForInStatement";
	left: VariableDeclaration | Expression;
	right: Expression;
	body: Statement;
}

type Statement =
	| BlockStatement
	| BreakStatement
	| ContinueStatement
	| DebuggerStatement
	| DoWhileStatement
	| EmptyStatement
	| ExpressionStatement
	| ForInStatement
	| ForStatement
	| IfStatement
	| LabeledStatement
	| ReturnStatement
	| SwitchStatement
	| ThrowStatement
	| TryStatement
	| WhileStatement
	| WithStatement
	| ForOfStatement
	| Declaration;

interface ForOfStatement extends ForInStatement {
	type: "ForOfStatement";
	await: boolean;
}

type Declaration = FunctionDeclaration | VariableDeclaration | ClassDeclaration | ImportDeclaration | ExportNamedDeclaration | ExportDefaultDeclaration | ExportAllDeclaration;

interface FunctionDeclaration extends Function, Node {
	type: "FunctionDeclaration";
	id: Identifier;
}

interface VariableDeclaration extends Node {
	type: "VariableDeclaration";
	declarations: Array<VariableDeclarator>;
	kind: "var" | "let" | "const" | "using";
}

interface VariableDeclarator extends Node {
	type: "VariableDeclarator";
	id: Pattern;
	init: Expression | null;
}

interface Decorator extends Node {
	type: "Decorator";
	expression: Expression;
}

interface Directive extends Node {
	type: "Directive";
	value: DirectiveLiteral;
}

interface DirectiveLiteral extends StringLiteral {
	type: "DirectiveLiteral";
}

interface InterpreterDirective extends StringLiteral {
	type: "InterpreterDirective";
}

interface Expression extends Node {}

interface Super extends Node {
	type: "Super";
}

interface Import extends Node {
	type: "Import";
}

interface ThisExpression extends Expression {
	type: "ThisExpression";
}

interface ArrowFunctionExpression extends Function, Expression {
	type: "ArrowFunctionExpression";
	body: BlockStatement | Expression;
}

interface YieldExpression extends Expression {
	type: "YieldExpression";
	argument: Expression | null;
	delegate: boolean;
}

interface AwaitExpression extends Expression {
	type: "AwaitExpression";
	argument: Expression | null;
}

interface ArrayExpression extends Expression {
	type: "ArrayExpression";
	elements: Array<Expression | SpreadElement | null>;
}

interface ObjectExpression extends Expression {
	type: "ObjectExpression";
	properties: Array<ObjectProperty | ObjectMethod | SpreadElement>;
}

interface ObjectMember extends Node {
	key: Expression;
	computed: boolean;
	decorators: Array<Decorator>;
}

interface ObjectProperty extends ObjectMember {
	type: "ObjectProperty";
	shorthand: boolean;
	value: Expression;
}

interface ObjectMethod extends ObjectMember, Function {
	type: "ObjectMethod";
	kind: "get" | "set" | "method";
}

interface RecordExpression extends Expression {
	type: "RecordExpression";
	properties: Array<ObjectProperty | ObjectMethod | SpreadElement>;
}

interface TupleExpression extends Expression {
	type: "TupleExpression";
	elements: Array<Expression | SpreadElement | null>;
}

interface FunctionExpression extends Function, Expression {
	type: "FunctionExpression";
}

interface UnaryExpression extends Expression {
	type: "UnaryExpression";
	operator: UnaryOperator;
	prefix: boolean;
	argument: Expression;
}

type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" | "throw";

interface UpdateExpression extends Expression {
	type: "UpdateExpression";
	operator: UpdateOperator;
	argument: Expression;
	prefix: boolean;
}

interface UpdateExpression extends Expression {
	type: "UpdateExpression";
	operator: UpdateOperator;
	argument: Expression;
	prefix: boolean;
}

type UpdateOperator = "++" | "--";

interface BinaryExpression extends Expression {
	type: "BinaryExpression";
	operator: BinaryOperator;
	left: Expression | PrivateName;
	right: Expression;
}

type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "**" | "|" | "^" | "&" | "in" | "instanceof";

interface AssignmentExpression extends Expression {
	type: "AssignmentExpression";
	operator: AssignmentOperator;
	left: Pattern | Expression;
	right: Expression;
}

type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "**=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" | "||=" | "&&=" | "??=";

interface LogicalExpression extends Expression {
	type: "LogicalExpression";
	operator: LogicalOperator;
	left: Expression;
	right: Expression;
}

type LogicalOperator = "||" | "&&" | "??";

interface SpreadElement extends Node {
	type: "SpreadElement";
	argument: Expression;
}

interface ArgumentPlaceholder extends Node {
	type: "ArgumentPlaceholder";
}

interface MemberExpression extends Expression, Pattern {
	type: "MemberExpression";
	object: Expression | Super;
	property: Expression | PrivateName;
	computed: boolean;
}

interface OptionalMemberExpression extends Expression {
	type: "OptionalMemberExpression";
	object: Expression;
	property: Expression | PrivateName;
	computed: boolean;
	optional: boolean;
}

interface BindExpression extends Expression {
	type: "BindExpression";
	object: Expression | null;
	callee: Expression;
}

interface ConditionalExpression extends Expression {
	type: "ConditionalExpression";
	test: Expression;
	alternate: Expression;
	consequent: Expression;
}

interface CallExpression extends Expression {
	type: "CallExpression";
	callee: Expression | Super | Import;
	arguments: Array<Expression | SpreadElement>;
}

interface OptionalCallExpression extends Expression {
	type: "OptionalCallExpression";
	callee: Expression;
	arguments: Array<Expression | SpreadElement>;
	optional: boolean;
}

interface NewExpression extends CallExpression {
	type: "NewExpression";
}

interface SequenceExpression extends Expression {
	type: "SequenceExpression";
	expressions: Array<Expression>;
}

interface ParenthesizedExpression extends Expression {
	type: "ParenthesizedExpression";
	expression: Expression;
}

interface DoExpression extends Expression {
	type: "DoExpression";
	body: BlockStatement;
	async: boolean;
}

interface ModuleExpression extends Expression {
	type: "ModuleExpression";
	body: Program;
}

interface TopicReference extends Expression {
	type: "TopicReference";
}

interface TemplateLiteral extends Expression {
	type: "TemplateLiteral";
	quasis: [TemplateElement];
	expressions: Array<Expression>;
}

interface TaggedTemplateExpression extends Expression {
	type: "TaggedTemplateExpression";
	tag: Expression;
	quasi: TemplateLiteral;
}

interface TemplateElement extends Node {
	type: "TemplateElement";
	tail: boolean;
	value: {
		cooked: string | null;
		raw: string;
	};
}

type Pattern = Identifier | ObjectPattern | ArrayPattern | RestElement | AssignmentPattern;

interface AssignmentProperty extends ObjectProperty {
	value: Pattern;
}

interface ObjectPattern extends Node {
	type: "ObjectPattern";
	properties: Array<AssignmentProperty | RestElement>;
}

interface ArrayPattern extends Node {
	type: "ArrayPattern";
	elements: Array<Pattern | null>;
}

interface RestElement extends Node {
	type: "RestElement";
	argument: Pattern;
}

interface AssignmentPattern extends Node {
	type: "AssignmentPattern";
	left: Pattern;
	right: Expression;
}

interface Class extends Node {
	id: Identifier | null;
	superClass: Expression | null;
	body: ClassBody;
	decorators: Array<Decorator>;
}

interface ClassBody extends Node {
	type: "ClassBody";
	body: Array<ClassMethod | ClassPrivateMethod | ClassProperty | ClassPrivateProperty | StaticBlock>;
}

interface ClassMethod extends Function {
	type: "ClassMethod";
	key: Expression;
	kind: "constructor" | "method" | "get" | "set";
	computed: boolean;
	static: boolean;
	decorators: Array<Decorator>;
}

interface ClassPrivateMethod extends Function {
	type: "ClassPrivateMethod";
	key: PrivateName;
	kind: "method" | "get" | "set";
	static: boolean;
	decorators: Array<Decorator>;
}

interface ClassProperty extends Node {
	type: "ClassProperty";
	key: Expression;
	value: Expression;
	static: boolean;
	computed: boolean;
}

interface ClassPrivateProperty extends Node {
	type: "ClassPrivateProperty";
	key: PrivateName;
	value: Expression;
	static: boolean;
}

interface ClassAccessorProperty extends Node {
	type: "ClassAccessorProperty";
	key: Expression | PrivateName;
	value: Expression;
	static: boolean;
	computed: boolean;
}

interface StaticBlock extends Node {
	type: "StaticBlock";
	body: Array<Statement>;
}

interface ClassDeclaration extends Class, Node {
	type: "ClassDeclaration";
	id: Identifier;
}

interface ClassExpression extends Class, Expression {
	type: "ClassExpression";
}

interface MetaProperty extends Expression {
	type: "MetaProperty";
	meta: Identifier;
	property: Identifier;
}

interface ModuleSpecifier extends Node {
	local: Identifier;
}

interface ImportDeclaration extends Node {
	type: "ImportDeclaration";
	importKind: null | "type" | "typeof" | "value";
	specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
	source: StringLiteral;
	assertions?: Array<ImportAttribute>;
}

interface ImportSpecifier extends ModuleSpecifier {
	type: "ImportSpecifier";
	imported: Identifier | StringLiteral;
}

interface ImportDefaultSpecifier extends ModuleSpecifier {
	type: "ImportDefaultSpecifier";
}

interface ImportNamespaceSpecifier extends ModuleSpecifier {
	type: "ImportNamespaceSpecifier";
}

interface ImportAttribute extends Node {
	type: "ImportAttribute";
	key: Identifier;
	value: StringLiteral;
}

type ExportDeclaration = ExportNamedDeclaration | ExportDefaultDeclaration | ExportAllDeclaration;

interface ExportNamedDeclaration extends Node {
	type: "ExportNamedDeclaration";
	declaration: Declaration | null;
	specifiers: Array<ExportSpecifier | ExportNamespaceSpecifier>;
	source: StringLiteral | null;
	assertions?: Array<ImportAttribute>;
}

interface ExportSpecifier extends ModuleSpecifier {
	type: "ExportSpecifier";
	exported: Identifier | StringLiteral;
	local?: Identifier | StringLiteral;
}

interface ExportNamespaceSpecifier extends ModuleSpecifier {
	type: "ExportNamespaceSpecifier";
	exported: Identifier;
}

interface OptFunctionDeclaration extends FunctionDeclaration {
	id: Identifier | null;
}

interface OptClassDeclaration extends ClassDeclaration {
	id: Identifier | null;
}

interface ExportDefaultDeclaration extends Node {
	type: "ExportDefaultDeclaration";
	declaration: OptFunctionDeclaration | OptClassDeclaration | Expression;
}

interface ExportAllDeclaration extends Node {
	type: "ExportAllDeclaration";
	source: StringLiteral;
	assertions?: [ImportAttribute];
}

interface PipelineBody extends Node {
	type: "PipelineBody";
}

interface PipelineBody extends Node {
	type: "PipelineBareFunctionBody";
	callee: Expression;
}

interface PipelineBareConstructorBody extends Node {
	type: "PipelineBareConstructorBody";
	callee: Expression;
}

interface PipelineBareConstructorBody extends Node {
	type: "PipelineTopicBody";
	expression: Expression;
}

interface PipelineBareConstructorBody extends Node {
	type: "PipelineBareAwaitedFunctionBody";
	callee: Expression;
}

export interface ProgramFile extends Node {
	type: "File";
	program: Program;
	loc: SourceLocation;
	errors: Array<Error>;
	comments: Array<Comment>;
	start: number;
	end: number;
}

export type NodeItem =
	| Identifier
	| PrivateName
	| RegExpLiteral
	| NullLiteral
	| StringLiteral
	| BooleanLiteral
	| NumericLiteral
	| BigIntLiteral
	| DecimalLiteral
	| Program
	| Function
	| ExpressionStatement
	| BlockStatement
	| EmptyStatement
	| DebuggerStatement
	| WithStatement
	| ReturnStatement
	| LabeledStatement
	| BreakStatement
	| ContinueStatement
	| IfStatement
	| SwitchStatement
	| SwitchCase
	| ThrowStatement
	| TryStatement
	| CatchClause
	| WhileStatement
	| DoWhileStatement
	| ForStatement
	| ForInStatement
	| Statement
	| ForOfStatement
	| FunctionDeclaration
	| VariableDeclaration
	| VariableDeclarator
	| Decorator
	| Directive
	| DirectiveLiteral
	| InterpreterDirective
	| Expression
	| Super
	| Import
	| ThisExpression
	| ArrowFunctionExpression
	| YieldExpression
	| AwaitExpression
	| ArrayExpression
	| ObjectExpression
	| ObjectMember
	| ObjectProperty
	| ObjectMethod
	| RecordExpression
	| TupleExpression
	| FunctionExpression
	| UnaryExpression
	| UpdateExpression
	| UpdateExpression
	| BinaryExpression
	| AssignmentExpression
	| LogicalExpression
	| SpreadElement
	| ArgumentPlaceholder
	| MemberExpression
	| OptionalMemberExpression
	| BindExpression
	| ConditionalExpression
	| CallExpression
	| OptionalCallExpression
	| NewExpression
	| SequenceExpression
	| ParenthesizedExpression
	| DoExpression
	| ModuleExpression
	| TopicReference
	| TemplateLiteral
	| TaggedTemplateExpression
	| TemplateElement
	| Pattern
	| AssignmentProperty
	| ObjectPattern
	| ArrayPattern
	| RestElement
	| AssignmentPattern
	| Class
	| ClassBody
	| ClassMethod
	| ClassPrivateMethod
	| ClassProperty
	| ClassPrivateProperty
	| ClassAccessorProperty
	| StaticBlock
	| ClassDeclaration
	| ClassExpression
	| MetaProperty
	| ModuleSpecifier
	| ImportDeclaration
	| ImportSpecifier
	| ImportDefaultSpecifier
	| ImportNamespaceSpecifier
	| ImportAttribute
	| ExportDeclaration
	| ExportNamedDeclaration
	| ExportSpecifier
	| ExportNamespaceSpecifier
	| OptFunctionDeclaration
	| OptClassDeclaration
	| ExportDefaultDeclaration
	| ExportAllDeclaration
	| PipelineBody
	| PipelineBareFunctionBody
	| PipelineBareConstructorBody
	| PipelineTopicBody
	| PipelineBareAwaitedFunctionBody
	| ProgramFile;
