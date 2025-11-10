import { Player } from "..";
import { Importance, Request, RequestType } from "../Request";

export class EndRequest extends Request{
  type: RequestType;
  to: Player | "both";
  importance: Importance;
  winner:Player;
  constructor(to:Player|"both",importance:Importance,winner:Player){
    super();
    this.to=to;
    this.type="end";
    this.importance=importance;
    this.winner=winner;
  }
}
