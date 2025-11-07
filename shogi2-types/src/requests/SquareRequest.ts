import { Player, Square } from "..";
import { Importance, Request, RequestType } from "../Request";

export class SquareRequest extends Request{
  type: RequestType;
  to: Player | "both";
  importance: Importance;
  square:Square;
  constructor(to:Player|"both",importance:Importance,square:Square){
    super();
    this.to=to;
    this.importance=importance;
    this.type="square";
    this.square=square;
  }
};
