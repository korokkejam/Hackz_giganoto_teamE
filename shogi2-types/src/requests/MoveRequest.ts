import { Player, Pos } from "..";
import { Piece } from "../Piece";
import { Importance, Request, RequestType } from "../Request";

export class MoveRequest extends Request{
  type: RequestType;
  to: Player | "both";
  importance: Importance;
  piece:Piece;
  position2:Pos;
  constructor(to:Player|"both",importance:Importance,piece:Piece,position2:Pos){
    super();
    this.type="move";
    this.importance=importance;
    this.to=to;
    this.piece=piece;
    this.position2=position2;
  }
}
