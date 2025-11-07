import { Piece, Player } from "..";
import { Importance, Request, RequestType } from "../Request";

export class CaptureRequest extends Request{
  type: RequestType;
  to: Player | "both";
  importance: Importance;
  piece1:Piece;
  piece2:Piece;
  constructor(to:Player|"both",importance:Importance,piece1:Piece,piece2:Piece){
    super();
    this.to=to;
    this.type="capture";
    this.importance=importance;
    this.piece1=piece1;
    this.piece2=piece2;
  }
}
