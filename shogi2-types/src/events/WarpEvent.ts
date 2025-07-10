import {Event} from "../Event";

export interface WarpEventType{
  z:number;
};

export class WarpEvent extends Event<WarpEventType>{
  data:WarpEventType;
  constructor(z:number,id:string){
    super("warp",id);
    this.data={z};
  }
}
