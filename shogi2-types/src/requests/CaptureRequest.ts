import { Piece, Player } from "..";
import { Importance, Request, RequestType } from "../Request";

export class CaptureRequest extends Request{
  type: RequestType;
  to: Player | "both";
  importance: Importance;
  player1_pieces:Piece[];
  player2_pieces:Piece[];
  constructor(to:Player|"both",importance:Importance,player1_pieces:Piece[],player2_pieces:Piece[]){
    super();
    this.to=to;
    this.type="capture";
    this.importance=importance;
    this.player1_pieces=player1_pieces;
    this.player2_pieces=player2_pieces;
  }
}
