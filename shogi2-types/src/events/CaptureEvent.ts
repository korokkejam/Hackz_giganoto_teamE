import { Event } from "../Event";
import { Piece } from "../Piece";

export class CaptureEvent extends Event{
  type: string;
  piece:Piece;
  constructor(piece:Piece){
    super();
    this.type="capture";
    this.piece=piece;
  }
};
