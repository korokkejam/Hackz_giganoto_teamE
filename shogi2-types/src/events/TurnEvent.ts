import {Event} from "../Event";

export interface TurnEventType{
};

export class TurnEvent extends Event<TurnEventType>{
  data:TurnEventType;
  constructor(){
    super("turn");
    this.data={};
  }
}
