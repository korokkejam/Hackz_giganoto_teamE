import {Event} from "../Event";

export interface EndEventType{
};

export class EndEvent extends Event<EndEventType>{
  data:EndEventType;
  constructor(){
    super("end");
    this.data={};
  }
}
