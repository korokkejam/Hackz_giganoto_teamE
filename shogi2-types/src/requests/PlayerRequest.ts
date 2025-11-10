import { Player, PlayerData } from "..";
import { Importance, Request, RequestType } from "../Request";

export class PlayerRequest extends Request{
  type: RequestType;
  to: Player | "both";
  importance: Importance;
  data:PlayerData;
  constructor(to:Player|"both",importance:Importance,data:PlayerData){
    super();
    this.type="player";
    this.to=to;
    this.importance=importance;
    this.data=data;
  }
}
