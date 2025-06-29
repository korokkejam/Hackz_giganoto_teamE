import {Event} from "../Event";
import { Piece, Position } from "../types";

export interface CaptureEventType{
  piece1:Piece; //取った駒
  piece2:Piece; //取られた駒
  pos1:Position;
  pos2:Position;
};

export class CaptureEvent extends Event<CaptureEventType>{
  data:CaptureEventType;
  constructor(piece1:Piece,piece2:Piece,pos1:Position,pos2:Position,id:string){
    super("capture",id);
    this.data={piece1,piece2,pos1,pos2};
  }
}
