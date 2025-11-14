import { Diff, Player } from ".";

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
  requests:RequestExpansion[];
  constructor(requests:RequestExpansion[]){
    this.requests=requests;
  }
  set(requests:RequestExpansion[]){
    this.requests=requests;
  }
  add(request:RequestExpansion){
    this.requests.push(request);
  }
  delete(id:string){
    this.filter((r:RequestExpansion)=>r.request.id!==id);
  }
  filter(func:(request:RequestExpansion)=>boolean){
    this.requests=this.requests.filter(func);
  }
  map(func:(request:RequestExpansion)=>RequestExpansion){
    this.requests=this.requests.map(func);
  }
};

export interface RequestExpansion{
  request:Request;
  diff?:Diff;
};
