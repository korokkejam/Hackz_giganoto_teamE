import { Event } from "../Event";

export class AnswerEvent extends Event{
  type="answer";
  key:string;
  id:string;
  constructor(id:string,key:string){
    super();
    this.id=id;
    this.key=key;
  };
}
