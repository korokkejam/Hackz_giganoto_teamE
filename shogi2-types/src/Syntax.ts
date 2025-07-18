import { ChatEventType } from "./events/ChatEvent";
import { board, Piece, PieceType, player } from "./types";

export interface Value{
  number?:number;
  string?:string;
  boolean?:boolean;
  null?:null;
  error?:string;
  array?:Value[];
  object?:Record<string,Value>;
}

export type types=""|"function"|"if"|"for"|"while"|"variable"|"literal"|"not"|"and"|"or"|"surplus"|"greater"|"less"|"equal"|"greaterequal"|"lessequal"|"plus"|"minus"|"times"|"per"|"eval"|"len";

export abstract class Syntax{
  type:types;
  constructor(type:types){
    this.type=type;
  }
  abstract execute(variables:Record<string,Value>):Value;
}

export class Empty extends Syntax{
  constructor(){
    super("");
  }
  execute(_variables:Record<string,Value>):Value{
    return {null:null};
  }
}

export class Function extends Syntax{
  process:Syntax[];
  constructor(process:Syntax[]){
    super("function");
    this.process=process;
  }
  execute(variables:Record<string,Value>):Value{
    let value:Value={null:null};
    this.process.forEach((process)=>{
      value=process.execute(variables);
    });
    return value;
  }
}

export class If extends Syntax{
  condition:Syntax;
  process1:Syntax[];
  process2?:Syntax[];
  constructor(condition:Syntax,process1:Syntax[],process2?:Syntax[]){
    super("if");
    this.condition=condition;
    this.process1=process1;
    this.process2=process2;
  }
  execute(variables:Record<string,Value>):Value{
    const condition=this.condition.execute(variables);
    if (condition.boolean){
      let value:Value={null:null};
      this.process1.forEach((process)=>{
        value=process.execute(variables);
      });
      return value;
    }else if (this.process2){
      let value:Value={null:null};
      this.process2.forEach((process)=>{
        value=process.execute(variables);
      });
      return value;
    }
    return {null:null};
  }
}

export class Len extends Syntax{
  syntax:Syntax;
  constructor(syntax:Syntax){
    super("len");
    this.syntax=syntax;
  }
  execute(variables:Record<string,Value>):Value{
    const value=this.syntax.execute(variables).array;
    if (value!==undefined){
      return {number:value.length};
    }
    return {null:null};
  }
}

export class For extends Syntax{
  init:Syntax;
  condition:Syntax;
  last_process:Syntax;
  process:Syntax[];
  constructor(init:Syntax,condition:Syntax,last_process:Syntax,process:Syntax[]){
    super("for");
    this.init=init;
    this.condition=condition;
    this.last_process=last_process;
    this.process=process;
  }
  execute(variables:Record<string,Value>):Value{
    for (this.init.execute(variables);this.condition.execute(variables).boolean;this.last_process.execute(variables)){
      this.process.forEach((process)=>{
        process.execute(variables);
      });
    }
    return {null:null};
  }
}

export class While extends Syntax{
  condition:Syntax;
  process:Syntax[];
  constructor(condition:Syntax,process:Syntax[]){
    super("while");
    this.condition=condition;
    this.process=process;
  }
  execute(variables:Record<string,Value>):Value{
    while (this.condition.execute(variables).boolean){
      this.process.forEach((process)=>{
        process.execute(variables);
      });
    }
    return {null:null};
  }
}

export class Variable extends Syntax{
  name:Syntax[];
  syntax?:Syntax
  constructor(name:Syntax[],syntax?:Syntax){
    super("variable");
    this.name=name;
    this.syntax=syntax
  }
  execute(variables:Record<string,Value>):Value{
    if (this.name[0]){
      const key=this.name[0].execute(variables);
      if (key.string!==undefined){
        let v=variables[key.string];
        if (this.name.length===1){
          if (this.syntax!==undefined){
            variables[key.string]=this.syntax.execute(variables);
          }
          if (v!==undefined){
            return v;
          }
        }else{
          for (let i = 1;i < this.name.length-1; i++){
            const key=this.name[i].execute(variables);
            if (key.string!==undefined && v.object!==undefined){
              v=v.object[key.string];
            }else if (key.number!==undefined && v.array!==undefined){
              v=v.array[key.number];
            }else{
              v={null:null};
              break;
            }
          }
          const key=this.name[this.name.length-1].execute(variables);
          if (key.string!==undefined && v.object!==undefined){
            if (this.syntax!==undefined){
              v.object[key.string]=this.syntax.execute(variables);
            }
            if (v.object[key.string]!==undefined){
              const d=v.object[key.string];
              if (d!==undefined){
                return d;
              }
            }
          }else if (key.number!==undefined && v.array!==undefined){
            if (this.syntax!==undefined){
              v.array[key.number]=this.syntax.execute(variables);
            }
            if (v.array[key.number]!==undefined){
              const d=v.array[key.number];
              if (d!==undefined){
                return d;
              }
            }
          }
        }
      }
    }
    return {null:null};
  }
}

export class Literal extends Syntax{
  value:Value;
  constructor(value:Value){
    super("literal");
    this.value=value;
  }
  execute(_variables:Record<string,Value>):Value{
    return this.value;
  }
}

export class Not extends Syntax{
  v:Syntax;
  constructor(v:Syntax){
    super("not");
    this.v=v;
  }
  execute(variables:Record<string,Value>):Value{
    const v=this.v.execute(variables);
    if (v.boolean!==undefined){
      return {boolean:!v.boolean};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export abstract class Operator extends Syntax{
  v1:Syntax;
  v2:Syntax;
  constructor(type:types,v1:Syntax,v2:Syntax){
    super(type);
    this.v1=v1;
    this.v2=v2;
  }
}

export class And extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("and",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.boolean!==undefined && v2.boolean!==undefined){
      return {boolean:v1.boolean && v2.boolean};
    }else{
      return {error:"aaaaaaaaaaaaaaaa"};
    }
  }
}

export class Or extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("or",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.boolean!==undefined && v2.boolean!==undefined){
      return {boolean:v1.boolean || v2.boolean};
    }else{
      return {error:"aaaaaaaaaaaaaaaa"};
    }
  }
}

export class Surplus extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("surplus",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.number!==undefined && v2.number!==undefined){
      return {number:v1.number % v2.number};
    }else{
      return {error:"aaaaaaaaaaaaaaaa"};
    }
  }
}

export class Greater extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("greater",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      return {boolean:v1.number > v2.number};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class Less extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("less",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      return {boolean:v1.number < v2.number};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class Equal extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("equal",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    return {boolean:(v1.number === v2.number && v1.number!==undefined) || (v1.boolean === v2.boolean && v1.boolean!==undefined) || (v1.null === v2.null && v1.null!==undefined) || (v1.string === v2.string && v1.string!==undefined)};
  }
}

export class GreaterEqual extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("greaterequal",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      return {boolean:v1.number >= v2.number};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class LessEqual extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("lessequal",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      return {boolean:v1.number <= v2.number};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class Plus extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("plus",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      return {number:v1.number+v2.number};
    }else if (v1.string!==undefined && v2.string!==undefined){
      return {string:v1.string+v2.string};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class Minus extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("minus",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      return {number:v1.number-v2.number};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class Times extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("times",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      return {number:v1.number*v2.number};
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class Per extends Operator{
  constructor(v1:Syntax,v2:Syntax){
    super("per",v1,v2);
  }
  execute(variables:Record<string,Value>):Value{
    const v1=this.v1.execute(variables);
    const v2=this.v2.execute(variables);
    if (v1.error!==undefined){
      return v1;
    }
    if (v2.error!==undefined){
      return v2;
    }
    if (v1.number!==undefined && v2.number!==undefined){
      if (v2.number===0){
        return {error:"Dividing by 0"};
      }else{
        return {number:v1.number/v2.number};
      }
    }else{
      return {error:"Addition with non-numeric types"};
    }
  }
}

export class Eval extends Syntax{
  syntax:Syntax[];
  constructor(syntax:Syntax[]){
    super("eval");
    this.syntax=syntax;
  }
  execute(variables:Record<string,Value>):Value{
    const command=this.syntax.map((s)=>{
      const string=s.execute(variables).string;
      if (string!==undefined){
        return string;
      }
      return "";
    }).join("");
    eval(command);
    return {null:null};
  }
}

export const syntax_base:Record<types,Syntax>={
  "":new Empty(),
  "and":new And(new Empty(),new Empty()),
  "function":new Function([]),
  "if":new If(new Empty(),[],[]),
  "for":new For(new Empty(),new Empty(),new Empty(),[]),
  "while":new While(new Empty(),[]),
  "variable":new Variable([]),
  "literal":new Literal({null:null}),
  "not":new Not(new Empty()),
  "or":new Or(new Empty(),new Empty()),
  "surplus":new Surplus(new Empty(),new Empty()),
  "greater":new Greater(new Empty(),new Empty()),
  "less":new Less(new Empty(),new Empty()),
  "equal":new Equal(new Empty(),new Empty()),
  "greaterequal":new GreaterEqual(new Empty(),new Empty()),
  "lessequal":new LessEqual(new Empty(),new Empty()),
  "plus":new Plus(new Empty(),new Empty()),
  "minus":new Minus(new Empty(),new Empty()),
  "times":new Times(new Empty(),new Empty()),
  "per":new Per(new Empty(),new Empty()),
  "eval":new Eval([]),
  "len":new Len(new Empty())
};

export function clone<T>(value:T):T{
  const v=Object.create(Object.getPrototypeOf(value));
  Object.getOwnPropertyNames(value).forEach((item)=>{
    const child=(value as any)[item];
    if (Array.isArray(child)){
      v[item]=child.map((value)=>clone(value));
    }else if (child && typeof child === "object"){
      v[item]=clone(child);
    }else{
      v[item]=child;
    }
  });
  return v;
}

export function parser(s1:Syntax):Syntax{
  const syntax:any={...s1};
  const s2:any={};
  Object.keys(syntax).forEach((key:string)=>{
    if (Array.isArray(syntax[key]) && Object.keys(syntax[key][0]).includes("type")){
      s2[key]=syntax[key].map((syntax)=>{
        return parser(syntax);
      });
    }else if (Object.keys(syntax[key]).includes("type")){
      const new_syntax=syntax[key];
      s2[key]=parser(new_syntax);
    }else{
      s2[key]=syntax[key];
    }
  });
  return Object.assign(clone(syntax_base[syntax.type as types]),s2);
}

export function convert(object:any):Value{
  if (typeof object==="number"){
    return {number:object};
  }else if (typeof object==="string"){
    return {string:object};
  }else if (typeof object==="boolean"){
    return {boolean:object};
  }else if (object===null){
    return {null:null};
  }else if (Array.isArray(object)){
    return {array:object.map((o)=>convert(o))};
  }else if (typeof object==="object"){
    let o:Record<string,Value>={};
    Object.keys(object).forEach((key)=>{
      o[key]=convert(object[key]);
    });
    return {object:o};
  }
  return {null:null};
}

export function restore(value:Value):any{
  if (value.string!==undefined){
    return value.string;
  }else if (value.number!==undefined){
    return value.number;
  }else if (value.boolean!==undefined){
    return value.boolean;
  }else if (value.array!==undefined){
    return value.array.map((v)=>restore(v));
  }else if (value.object!==undefined){
    const o:any={};
    const object=value.object;
    Object.keys(value.object).forEach((key)=>{
      const v=object[key];
      o[key]=restore(v);
    });
    return o;
  }else{
    return null;
  }
}

export interface Operatable{
  boards:board[];
  player:player;
  turn:player;
  storage1:Piece[];
  storage2:Piece[];
  pieceTypes:PieceType[];
  messages:ChatEventType[];
  z:number;
  files:{id:string,url:string}[];
}
