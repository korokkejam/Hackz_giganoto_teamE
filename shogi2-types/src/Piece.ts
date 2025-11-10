import { Player, Pos } from "./index";

export interface Piece{
  position:Pos;
  type:PieceType;
  id:string;
  player:Player
};

export class PieceType{
  name:string;
  id:string;
  movable:Movable;
  after_promotion:PieceType|undefined;
  image:string|undefined;
  animation:Animation;
  jumpable:boolean;
  constructor(id:string,name:string,movable:Movable,jumpable:boolean,after_promotion?:PieceType){
    this.id=id;
    this.name=name;
    this.movable=movable;
    this.after_promotion=after_promotion;
    this.image=undefined;
    this.animation={seconds:0.1,operation:{0:0,100:100}};
    this.jumpable=jumpable;
  }
};

export interface Movable{
  absolute:Pos[];
  relative:Pos[];
};

export interface Animation{
  seconds:number;
  operation:Record<number,number>;
};
