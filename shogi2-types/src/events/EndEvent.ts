import { Player } from "..";
import { Event } from "../Event";

export class EndEvent extends Event{
  type: string;
  winner:Player;
  constructor(winner:Player){
    super();
    this.type="end";
    this.winner=winner;
  }
}
