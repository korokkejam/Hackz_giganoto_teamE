import { ChatEventType } from "./events/ChatEvent";
import { board, Piece, PieceType, player } from "./types";
export interface Value {
    number?: number;
    string?: string;
    boolean?: boolean;
    null?: null;
    error?: string;
    array?: Value[];
    object?: Record<string, Value>;
}
export type types = "" | "function" | "if" | "for" | "while" | "variable" | "literal" | "not" | "and" | "or" | "surplus" | "greater" | "less" | "equal" | "greaterequal" | "lessequal" | "plus" | "minus" | "times" | "per" | "eval" | "len";
export declare abstract class Syntax {
    type: types;
    constructor(type: types);
    abstract execute(variables: Record<string, Value>): Value;
}
export declare class Empty extends Syntax {
    constructor();
    execute(_variables: Record<string, Value>): Value;
}
export declare class Function extends Syntax {
    process: Syntax[];
    constructor(process: Syntax[]);
    execute(variables: Record<string, Value>): Value;
}
export declare class If extends Syntax {
    condition: Syntax;
    process1: Syntax[];
    process2?: Syntax[];
    constructor(condition: Syntax, process1: Syntax[], process2?: Syntax[]);
    execute(variables: Record<string, Value>): Value;
}
export declare class Len extends Syntax {
    syntax: Syntax;
    constructor(syntax: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class For extends Syntax {
    init: Syntax;
    condition: Syntax;
    last_process: Syntax;
    process: Syntax[];
    constructor(init: Syntax, condition: Syntax, last_process: Syntax, process: Syntax[]);
    execute(variables: Record<string, Value>): Value;
}
export declare class While extends Syntax {
    condition: Syntax;
    process: Syntax[];
    constructor(condition: Syntax, process: Syntax[]);
    execute(variables: Record<string, Value>): Value;
}
export declare class Variable extends Syntax {
    name: Syntax[];
    syntax?: Syntax;
    constructor(name: Syntax[], syntax?: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Literal extends Syntax {
    value: Value;
    constructor(value: Value);
    execute(_variables: Record<string, Value>): Value;
}
export declare class Not extends Syntax {
    v: Syntax;
    constructor(v: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare abstract class Operator extends Syntax {
    v1: Syntax;
    v2: Syntax;
    constructor(type: types, v1: Syntax, v2: Syntax);
}
export declare class And extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Or extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Surplus extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Greater extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Less extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Equal extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class GreaterEqual extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class LessEqual extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Plus extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Minus extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Times extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Per extends Operator {
    constructor(v1: Syntax, v2: Syntax);
    execute(variables: Record<string, Value>): Value;
}
export declare class Eval extends Syntax {
    syntax: Syntax[];
    constructor(syntax: Syntax[]);
    execute(variables: Record<string, Value>): Value;
}
export declare const syntax_base: Record<types, Syntax>;
export declare function clone<T>(value: T): T;
export declare function parser(s1: Syntax): Syntax;
export declare function convert(object: any): Value;
export declare function restore(value: Value): any;
export interface Operatable {
    boards: board[];
    player: player;
    turn: player;
    storage1: Piece[];
    storage2: Piece[];
    pieceTypes: PieceType[];
    messages: ChatEventType[];
    z: number;
    files: {
        id: string;
        url: string;
    }[];
}
