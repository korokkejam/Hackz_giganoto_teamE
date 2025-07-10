import {CSSProperties} from "@mui/material";
import { Function, Syntax } from "./Syntax";

export class UI{
  type:string;
  style?:CSSProperties;
  id:string;
  constructor(id:string,type:string,style?:CSSProperties){
    this.id=id;
    this.type=type;
    this.style=style;
  }
}

export class Text extends UI{
  content:Syntax;
  constructor(id:string,content:Syntax,style?:CSSProperties){
    super(id,"text",style);
    this.content=content;
  }
}

export class Button extends UI{
  content:UI;
  onClick:Function;
  constructor(id:string,content:UI,onClick:Function,style?:CSSProperties){
    super(id,"button",style);
    this.content=content;
    this.onClick=onClick;
  }
}

export class Image extends UI{
  src:string;
  constructor(id:string,src:string,style?:CSSProperties){
    super(id,"image",style);
    this.src=src;
  }
}

export class Container extends UI{
  children:UI[];
  constructor(id:string,children:UI[],style:CSSProperties){
    super(id,"container",style);
    this.children=children;
  }
}
