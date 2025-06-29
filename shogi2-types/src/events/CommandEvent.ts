import {Event} from "../Event";

export interface CommandEventType{
  type:string;
  option:any;
};

export class CommandEvent extends Event<CommandEventType>{
  data:CommandEventType;
  constructor(event:CommandEventType,id:string){
    super("command",id);
    this.data=event;
  }
}
