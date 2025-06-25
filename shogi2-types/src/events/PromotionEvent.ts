import {Event} from "../Event";

export interface PromotionEventType{
};

export class PromotionEvent extends Event<PromotionEventType>{
  data:PromotionEventType;
  constructor(){
    super("promotion");
    this.data={};
  }
}
