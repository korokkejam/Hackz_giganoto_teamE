import {Event} from "../Event";
import { player } from "../types";

export interface TurnEventType{
  player:player
};

export class TurnEvent extends Event<TurnEventType>{
  data:TurnEventType;
  constructor(player:player,id:string){
    super("turn",id);
    this.data={player};
  }
}
