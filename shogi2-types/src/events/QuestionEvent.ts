import {Event} from "../Event";

export interface QuestionEventType{
  question:string;
  choices:string[];
  answer:string;
  type:string;
};

export class QuestionEvent extends Event<QuestionEventType>{
  data:QuestionEventType;
  constructor(type:string,question:string,choices:string[],answer:string,id:string){
    super("question",id);
    this.data={type,question,choices,answer};
  }
}
