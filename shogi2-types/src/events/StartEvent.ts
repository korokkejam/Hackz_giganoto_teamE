import {Event} from "../Event";

export interface StartEventType{
};

export class StartEvent extends Event<StartEventType>{
  data:StartEventType;
  constructor(id:string){
    super("start",id);
    this.data={};
  }
}
