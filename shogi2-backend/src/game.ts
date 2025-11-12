import { createGameData, Event, GameData, Mod, ModBase, Player, Request, RequestUpdater } from "shogi2-types";
import { Client } from "./type";
import { cloneDeep } from "lodash";

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
    const before=cloneDeep(this.data);
    const updater=new RequestUpdater([]);
    let events:Event[]=[event];
    do{
      const es:Event[]=[];
      this.instances.forEach((instance)=>{
        events.forEach((event)=>{
          const re=instance.update(this.data,before,event,sender,updater);
          re.r.forEach((r)=>{
            const same_requests=updater.requests.filter((request)=>request.type===r.type);
            if (r.importance==="exclude"){
              updater.filter((request)=>request.type!==r.type || request.importance!=="obedience");
            }
            if (!same_requests.some((request)=>request.importance==="exclude") || r.importance!=="obedience"){
              updater.add(r);
            }
          });
          re.e.forEach((e)=>{
            es.push(e);
          });
        });
      });
      events=es;
    }while(events.length);
    this.send(updater.requests);
  }
  send(requests:Request[]){
    requests.forEach((request)=>{
      if (request.to==="both" || request.to==="player1") this.client.ws1?.send(request.json());
      if (request.to==="both" || request.to==="player2") this.client.ws2?.send(request.json());
    });
  }
};
