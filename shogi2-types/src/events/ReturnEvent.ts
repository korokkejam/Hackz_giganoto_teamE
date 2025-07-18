import {Event} from "../Event";
import { Request } from "../types";

export interface ReturnEventType{
  request:Request<any>;
  millis:number;
}

export class ReturnEvent extends Event<ReturnEventType>{
  data:ReturnEventType;
  constructor(id:string,data:ReturnEventType){
    super("return",id);
    this.data=data;
  }
}
