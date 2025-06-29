import {Event} from "../Event";

export interface ChatEventType{
  msg:string;
  sender:string;
};

export class ChatEvent extends Event<ChatEventType>{
  data:ChatEventType;
  constructor(msg:string,sender:string,id:string){
    super("chat",id);
    this.data={msg,sender};
  }
}
