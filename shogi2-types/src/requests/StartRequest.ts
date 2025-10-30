import { Importance, Player, Request,RequestType } from "../index";

export class StartRequest extends Request{
  type:RequestType;
  to: Player|"both";
  importance: Importance;
  constructor(to:Player|"both",importance:Importance){
    super();
    this.type="start";
    this.to=to;
    this.importance=importance;
  }
}
