import { createGameData, Event, GameData, Mod, ModBase, Player, Request } from "shogi2-types";
import { Client } from "./type";

export class Game{
  id:string;
  mods:Mod[];
  data:GameData;
  client:Client;
  instances:ModBase[];
  constructor(client:Client,mods:Mod[]){
    this.id=crypto.randomUUID();
    this.mods=mods;
    this.data=createGameData(9,9);
    this.client=client;
    this.instances=mods.map((mod)=>new mod.class());
  }
  update(event:Event,sender:Player){
    const requests:Request[]=[];
    this.instances.forEach((instance)=>{
      const re=instance.update(this.data,event,sender);
      re.forEach((r)=>{
        requests.push(r);
      });
    });
    this.send(requests);
  }
  send(requests:Request[]){
    requests.forEach((request)=>{
      if (request.to==="both" || request.to==="player1") this.client.ws1?.send(request.json());
      if (request.to==="both" || request.to==="player2") this.client.ws2?.send(request.json());
    });
  }
};
