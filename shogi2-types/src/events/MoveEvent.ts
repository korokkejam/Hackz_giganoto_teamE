import { Pos } from "..";
import { Event } from "../Event";
import { Piece } from "../Piece";

export class MoveEvent extends Event{
  type="move";
  piece:Piece;
  to:Pos;
  constructor(piece:Piece,to:Pos){
    super();
    this.piece=piece;
    this.to=to;
  }
};
