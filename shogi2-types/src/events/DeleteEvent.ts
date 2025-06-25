import {Event} from "../Event";

export interface DeleteEventType{
};

export class DeleteEvent extends Event<DeleteEventType>{
  data:DeleteEventType;
  constructor(){
    super("delete");
    this.data={};
  }
}
