"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syntax_base = exports.Eval = exports.Per = exports.Times = exports.Minus = exports.Plus = exports.LessEqual = exports.GreaterEqual = exports.Equal = exports.Less = exports.Greater = exports.Surplus = exports.Or = exports.And = exports.Operator = exports.Not = exports.Literal = exports.Variable = exports.While = exports.For = exports.Len = exports.If = exports.Function = exports.Empty = exports.Syntax = void 0;
exports.clone = clone;
exports.parser = parser;
exports.convert = convert;
exports.restore = restore;
class Syntax {
    constructor(type) {
        this.type = type;
    }
}
exports.Syntax = Syntax;
class Empty extends Syntax {
    constructor() {
        super("");
    }
    execute(_variables) {
        return { null: null };
    }
}
exports.Empty = Empty;
class Function extends Syntax {
    constructor(process) {
        super("function");
        this.process = process;
    }
    execute(variables) {
        let value = { null: null };
        this.process.forEach((process) => {
            value = process.execute(variables);
        });
        return value;
    }
}
exports.Function = Function;
class If extends Syntax {
    constructor(condition, process1, process2) {
        super("if");
        this.condition = condition;
        this.process1 = process1;
        this.process2 = process2;
    }
    execute(variables) {
        const condition = this.condition.execute(variables);
        if (condition.boolean) {
            let value = { null: null };
            this.process1.forEach((process) => {
                value = process.execute(variables);
            });
            return value;
        }
        else if (this.process2) {
            let value = { null: null };
            this.process2.forEach((process) => {
                value = process.execute(variables);
            });
            return value;
        }
        return { null: null };
    }
}
exports.If = If;
class Len extends Syntax {
    constructor(syntax) {
        super("len");
        this.syntax = syntax;
    }
    execute(variables) {
        const value = this.syntax.execute(variables).array;
        if (value !== undefined) {
            return { number: value.length };
        }
        return { null: null };
    }
}
exports.Len = Len;
class For extends Syntax {
    constructor(init, condition, last_process, process) {
        super("for");
        this.init = init;
        this.condition = condition;
        this.last_process = last_process;
        this.process = process;
    }
    execute(variables) {
        for (this.init.execute(variables); this.condition.execute(variables).boolean; this.last_process.execute(variables)) {
            this.process.forEach((process) => {
                process.execute(variables);
            });
        }
        return { null: null };
    }
}
exports.For = For;
class While extends Syntax {
    constructor(condition, process) {
        super("while");
        this.condition = condition;
        this.process = process;
    }
    execute(variables) {
        while (this.condition.execute(variables).boolean) {
            this.process.forEach((process) => {
                process.execute(variables);
            });
        }
        return { null: null };
    }
}
exports.While = While;
class Variable extends Syntax {
    constructor(name, syntax) {
        super("variable");
        this.name = name;
        this.syntax = syntax;
    }
    execute(variables) {
        if (this.name[0]) {
            const key = this.name[0].execute(variables);
            if (key.string !== undefined) {
                let v = variables[key.string];
                if (this.name.length === 1) {
                    if (this.syntax !== undefined) {
                        variables[key.string] = this.syntax.execute(variables);
                    }
                    if (v !== undefined) {
                        return v;
                    }
                }
                else {
                    for (let i = 1; i < this.name.length - 1; i++) {
                        const key = this.name[i].execute(variables);
                        if (key.string !== undefined && v.object !== undefined) {
                            v = v.object[key.string];
                        }
                        else if (key.number !== undefined && v.array !== undefined) {
                            v = v.array[key.number];
                        }
                        else {
                            v = { null: null };
                            break;
                        }
                    }
                    const key = this.name[this.name.length - 1].execute(variables);
                    if (key.string !== undefined && v.object !== undefined) {
                        if (this.syntax !== undefined) {
                            v.object[key.string] = this.syntax.execute(variables);
                        }
                        if (v.object[key.string] !== undefined) {
                            const d = v.object[key.string];
                            if (d !== undefined) {
                                return d;
                            }
                        }
                    }
                    else if (key.number !== undefined && v.array !== undefined) {
                        if (this.syntax !== undefined) {
                            v.array[key.number] = this.syntax.execute(variables);
                        }
                        if (v.array[key.number] !== undefined) {
                            const d = v.array[key.number];
                            if (d !== undefined) {
                                return d;
                            }
                        }
                    }
                }
            }
        }
        return { null: null };
    }
}
exports.Variable = Variable;
class Literal extends Syntax {
    constructor(value) {
        super("literal");
        this.value = value;
    }
    execute(_variables) {
        return this.value;
    }
}
exports.Literal = Literal;
class Not extends Syntax {
    constructor(v) {
        super("not");
        this.v = v;
    }
    execute(variables) {
        const v = this.v.execute(variables);
        if (v.boolean !== undefined) {
            return { boolean: !v.boolean };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.Not = Not;
class Operator extends Syntax {
    constructor(type, v1, v2) {
        super(type);
        this.v1 = v1;
        this.v2 = v2;
    }
}
exports.Operator = Operator;
class And extends Operator {
    constructor(v1, v2) {
        super("and", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.boolean !== undefined && v2.boolean !== undefined) {
            return { boolean: v1.boolean && v2.boolean };
        }
        else {
            return { error: "aaaaaaaaaaaaaaaa" };
        }
    }
}
exports.And = And;
class Or extends Operator {
    constructor(v1, v2) {
        super("or", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.boolean !== undefined && v2.boolean !== undefined) {
            return { boolean: v1.boolean || v2.boolean };
        }
        else {
            return { error: "aaaaaaaaaaaaaaaa" };
        }
    }
}
exports.Or = Or;
class Surplus extends Operator {
    constructor(v1, v2) {
        super("surplus", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.number !== undefined && v2.number !== undefined) {
            return { number: v1.number % v2.number };
        }
        else {
            return { error: "aaaaaaaaaaaaaaaa" };
        }
    }
}
exports.Surplus = Surplus;
class Greater extends Operator {
    constructor(v1, v2) {
        super("greater", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            return { boolean: v1.number > v2.number };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.Greater = Greater;
class Less extends Operator {
    constructor(v1, v2) {
        super("less", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            return { boolean: v1.number < v2.number };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.Less = Less;
class Equal extends Operator {
    constructor(v1, v2) {
        super("equal", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        return { boolean: (v1.number === v2.number && v1.number !== undefined) || (v1.boolean === v2.boolean && v1.boolean !== undefined) || (v1.null === v2.null && v1.null !== undefined) || (v1.string === v2.string && v1.string !== undefined) };
    }
}
exports.Equal = Equal;
class GreaterEqual extends Operator {
    constructor(v1, v2) {
        super("greaterequal", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            return { boolean: v1.number >= v2.number };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.GreaterEqual = GreaterEqual;
class LessEqual extends Operator {
    constructor(v1, v2) {
        super("lessequal", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            return { boolean: v1.number <= v2.number };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.LessEqual = LessEqual;
class Plus extends Operator {
    constructor(v1, v2) {
        super("plus", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            return { number: v1.number + v2.number };
        }
        else if (v1.string !== undefined && v2.string !== undefined) {
            return { string: v1.string + v2.string };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.Plus = Plus;
class Minus extends Operator {
    constructor(v1, v2) {
        super("minus", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            return { number: v1.number - v2.number };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.Minus = Minus;
class Times extends Operator {
    constructor(v1, v2) {
        super("times", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            return { number: v1.number * v2.number };
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.Times = Times;
class Per extends Operator {
    constructor(v1, v2) {
        super("per", v1, v2);
    }
    execute(variables) {
        const v1 = this.v1.execute(variables);
        const v2 = this.v2.execute(variables);
        if (v1.error !== undefined) {
            return v1;
        }
        if (v2.error !== undefined) {
            return v2;
        }
        if (v1.number !== undefined && v2.number !== undefined) {
            if (v2.number === 0) {
                return { error: "Dividing by 0" };
            }
            else {
                return { number: v1.number / v2.number };
            }
        }
        else {
            return { error: "Addition with non-numeric types" };
        }
    }
}
exports.Per = Per;
class Eval extends Syntax {
    constructor(syntax) {
        super("eval");
        this.syntax = syntax;
    }
    execute(variables) {
        const command = this.syntax.map((s) => {
            const string = s.execute(variables).string;
            if (string !== undefined) {
                return string;
            }
            return "";
        }).join("");
        eval(command);
        return { null: null };
    }
}
exports.Eval = Eval;
exports.syntax_base = {
    "": new Empty(),
    "and": new And(new Empty(), new Empty()),
    "function": new Function([]),
    "if": new If(new Empty(), [], []),
    "for": new For(new Empty(), new Empty(), new Empty(), []),
    "while": new While(new Empty(), []),
    "variable": new Variable([]),
    "literal": new Literal({ null: null }),
    "not": new Not(new Empty()),
    "or": new Or(new Empty(), new Empty()),
    "surplus": new Surplus(new Empty(), new Empty()),
    "greater": new Greater(new Empty(), new Empty()),
    "less": new Less(new Empty(), new Empty()),
    "equal": new Equal(new Empty(), new Empty()),
    "greaterequal": new GreaterEqual(new Empty(), new Empty()),
    "lessequal": new LessEqual(new Empty(), new Empty()),
    "plus": new Plus(new Empty(), new Empty()),
    "minus": new Minus(new Empty(), new Empty()),
    "times": new Times(new Empty(), new Empty()),
    "per": new Per(new Empty(), new Empty()),
    "eval": new Eval([]),
    "len": new Len(new Empty())
};
function clone(value) {
    const v = Object.create(Object.getPrototypeOf(value));
    Object.getOwnPropertyNames(value).forEach((item) => {
        const child = value[item];
        if (Array.isArray(child)) {
            v[item] = child.map((value) => clone(value));
        }
        else if (child && typeof child === "object") {
            v[item] = clone(child);
        }
        else {
            v[item] = child;
        }
    });
    return v;
}
function parser(s1) {
    const syntax = Object.assign({}, s1);
    const s2 = {};
    Object.keys(syntax).forEach((key) => {
        if (Array.isArray(syntax[key]) && Object.keys(syntax[key][0]).includes("type")) {
            s2[key] = syntax[key].map((syntax) => {
                return parser(syntax);
            });
        }
        else if (Object.keys(syntax[key]).includes("type")) {
            const new_syntax = syntax[key];
            s2[key] = parser(new_syntax);
        }
        else {
            s2[key] = syntax[key];
        }
    });
    return Object.assign(clone(exports.syntax_base[syntax.type]), s2);
}
function convert(object) {
    if (typeof object === "number") {
        return { number: object };
    }
    else if (typeof object === "string") {
        return { string: object };
    }
    else if (typeof object === "boolean") {
        return { boolean: object };
    }
    else if (object === null) {
        return { null: null };
    }
    else if (Array.isArray(object)) {
        return { array: object.map((o) => convert(o)) };
    }
    else if (typeof object === "object") {
        let o = {};
        Object.keys(object).forEach((key) => {
            o[key] = convert(object[key]);
        });
        return { object: o };
    }
    return { null: null };
}
function restore(value) {
    if (value.string !== undefined) {
        return value.string;
    }
    else if (value.number !== undefined) {
        return value.number;
    }
    else if (value.boolean !== undefined) {
        return value.boolean;
    }
    else if (value.array !== undefined) {
        return value.array.map((v) => restore(v));
    }
    else if (value.object !== undefined) {
        const o = {};
        const object = value.object;
        Object.keys(value.object).forEach((key) => {
            const v = object[key];
            o[key] = restore(v);
        });
        return o;
    }
    else {
        return null;
    }
}
//# sourceMappingURL=Syntax.js.map