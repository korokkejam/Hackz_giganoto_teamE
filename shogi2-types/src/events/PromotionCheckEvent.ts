import {Event} from "../Event";
import { Piece, Position } from "../types";

export interface PromotionCheckEventType{
  piece:Piece; //成る前の駒(成ったあとの駒の情報は駒の型に記述されてるからこれだけでいい)
  pos:Position;
  answer:boolean;
};

export class PromotionCheckEvent extends Event<PromotionCheckEventType>{
  data:PromotionCheckEventType;
  constructor(piece:Piece,pos:Position,answer:boolean,id:string){
    super("promotion_check",id);
    this.data={piece,pos,answer};
  }
}
