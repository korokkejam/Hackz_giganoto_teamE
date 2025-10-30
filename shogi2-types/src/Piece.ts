import { Player } from "./index";

export interface Piece{
  position:{x:number,y:number};
  type:PieceType;
  id:string;
  player:Player
};

export class PieceType{
  name:string;
  movable:Movable;
  before_promotion:PieceType|undefined;
  after_promotion:PieceType|undefined;
  image:string|undefined;
  animation:Animation;
  jumpable:boolean;
  constructor(name:string,movable:Movable,jumpable:boolean){
    this.name=name;
    this.movable=movable;
    this.before_promotion=undefined;
    this.after_promotion=undefined;
    this.image=undefined;
    this.animation={seconds:0.1,operation:{0:0,100:100}};
    this.jumpable=jumpable;
  }
};

export interface Movable{
  absolute:{x:number,y:number}[];
  relative:{x:number,y:number}[];
};

export interface Animation{
  seconds:number;
  operation:Record<number,number>;
};
