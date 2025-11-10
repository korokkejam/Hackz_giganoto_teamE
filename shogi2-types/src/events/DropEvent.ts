import { Square } from "../Board";
import { Event } from "../Event";

export class DropEvent extends Event{
  type: string;
  square:Square;
  constructor(square:Square){
    super();
    this.square=square;
    this.type="drop";
  }
}
