import {Event} from "../Event";

export interface MoveEventType{
};

export class MoveEvent extends Event<MoveEventType>{
  data:MoveEventType;
  constructor(){
    super("move");
    this.data={};
  }
}
