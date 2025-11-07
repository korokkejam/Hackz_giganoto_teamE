import { Player } from "..";
import { Importance, Request, RequestType } from "../Request";

export class TurnRequest extends Request{
  to: Player | "both";
  type: RequestType;
  importance: Importance;
  player:Player;
  seconds:number;
  constructor(to:Player|"both",importance:Importance,player:Player,seconds:number){
    super();
    this.to=to;
    this.importance=importance;
    this.player=player;
    this.type="turn";
    this.seconds=seconds;
  }
}
