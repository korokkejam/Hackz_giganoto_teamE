import { Player } from "..";
import { Importance, Request, RequestType } from "../Request";

export class FileRequest extends Request{
  to: Player | "both";
  type: RequestType;
  importance: Importance;
  name:string;
  content:string;
  filetype:string;
  constructor(to:Player|"both",importance:Importance,name:string,content:string,filetype:string){
    super();
    this.to=to;
    this.importance=importance;
    this.name=name;
    this.content=content;
    this.type="file";
    this.filetype=filetype;
  }
};
