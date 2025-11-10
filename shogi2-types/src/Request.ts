import { Player } from ".";

export type RequestType="board"|"turn"|"chat"|"file"|"audio"|"square"|"end"|"player"|"ui"|"question"|"start"|"move"|"capture";

export abstract class Request{
  abstract type:RequestType;
  abstract to:Player|"both";
  abstract importance:Importance;
  id:string;
  then:Request[];
  constructor(){
    this.id=crypto.randomUUID();
    this.then=[];
  }
  json(){
    return JSON.stringify(this);
  };
};

export type Importance="exclude"|"coexistence"|"obedience";

export class RequestUpdater{
  requests:Request[];
  constructor(requests:Request[]){
    this.requests=requests;
  }
  set(requests:Request[]){
    this.requests=requests;
  }
  add(request:Request){
    this.requests.push(request);
  }
  delete(id:string){
    this.filter((request:Request)=>request.id!==id);
  }
  filter(func:(request:Request)=>boolean){
    this.requests=this.requests.filter(func);
  }
  map(func:(request:Request)=>Request){
    this.requests=this.requests.map(func);
  }
};
