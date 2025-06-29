import {Event} from "../Event";
import { Piece, Position } from "../types";

export interface PromotionEventType{
  piece:Piece; //成る前の駒(成ったあとの駒の情報は駒の型に記述されてるからこれだけでいい)
  pos:Position;
};

export class PromotionEvent extends Event<PromotionEventType>{
  data:PromotionEventType;
  constructor(piece:Piece,pos:Position,id:string){
    super("promotion",id);
    this.data={piece,pos};
  }
}
