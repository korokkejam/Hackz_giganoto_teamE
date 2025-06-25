import {Event} from "../Event";

export interface CommandEventType{
  type:string;
  option:any;
};

export class CommandEvent extends Event<CommandEventType>{
  type="capture";
  data:CommandEventType;
  constructor(event:CommandEventType){
    super("capture");
    this.data=event;
  }
}
