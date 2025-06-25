import {Event} from "../Event";

export interface ChatEventType{
  msg:string;
};

export class ChatEvent extends Event<ChatEventType>{
  data:ChatEventType;
  constructor(msg:string){
    super("chat");
    this.data={msg};
  }
}
