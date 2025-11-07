import { Player } from ".";

export type RequestType="board"|"turn"|"chat"|"file"|"audio"|"square"|"end"|"player"|"ui"|"question"|"start"|"move"|"capture";

export abstract class Request{
  abstract type:RequestType;
  abstract to:Player|"both";
  abstract importance:Importance;
  json(){
    return JSON.stringify(this);
  };
};

export type Importance="exclude"|"coexistence"|"obedience";
