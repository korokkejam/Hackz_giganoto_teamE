import {Event} from "../Event";
import { player } from "../types";

export interface EndEventType{
  winner:player
};

export class EndEvent extends Event<EndEventType>{
  data:EndEventType;
  constructor(player:player,id:string){
    super("end",id);
    this.data={winner:player};
  }
}
