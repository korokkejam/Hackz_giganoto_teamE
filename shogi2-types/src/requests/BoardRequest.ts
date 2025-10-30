import { Board, Player } from "..";
import { Importance, Request, RequestType } from "../Request";

export class BoardRequest extends Request{
  type: RequestType;
  to: Player | "both";
  board:Board;
  importance: Importance;
  constructor(to:Player|"both",board:Board,importance:Importance){
    super();
    this.to=to;
    this.type="board";
    this.board=board;
    this.importance=importance;
  }
};
