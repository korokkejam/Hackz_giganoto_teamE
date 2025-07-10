import {Event} from "../Event";
import { Piece, Position } from "../types";

export interface MoveEventType{
  piece:Piece,
  before_pos:Position,
  after_pos:Position
};

export class MoveEvent extends Event<MoveEventType>{
  data:MoveEventType;
  constructor(piece:Piece,before_pos:Position,after_pos:Position,id:string){
    super("move",id);
    this.data={piece,before_pos,after_pos};
  }
}
