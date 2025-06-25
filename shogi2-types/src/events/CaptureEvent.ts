import {Event} from "../Event";

export interface CaptureEventType{
};

export class CaptureEvent extends Event<CaptureEventType>{
  type="capture";
  data:CaptureEventType;
  constructor(){
    super("capture");
    this.data={};
  }
}
