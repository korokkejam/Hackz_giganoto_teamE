import {Event} from "../Event";

export interface DropEventType{
};

export class DropEvent extends Event<DropEventType>{
  data:DropEventType;
  constructor(){
    super("drop");
    this.data={};
  }
}
