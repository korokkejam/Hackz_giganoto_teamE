import { Event, GameData, Player, Request, StartEvent } from "./index";
import { BoardEvent } from "./events/BoardEvent";
import { MoveEvent } from "./events/MoveEvent";
import { AnswerEvent } from "./events/AnswerEvent";

export abstract class ModBase{
  update(data:GameData,event:Event,sender:Player,registered_requests:Request[]):{r:Request[],e:Event[]}{
    const requests:Request[]=[];
    const events:Event[]=[];
    switch (event.type){
      case "start":
        {
          const re=this.onStart(data,event as StartEvent,sender,registered_requests);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
      case "board":
        {
          const re=this.onBoard(data,event as BoardEvent,sender,registered_requests);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
      case "move":
        {
          const re=this.onMove(data,event as MoveEvent,sender,registered_requests);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
      case "answer":
        {
          const re=this.onAnswer(data,event as AnswerEvent,sender,registered_requests);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
    }
    return {r:requests,e:events};
  }
  onStart(_data:GameData,_event:StartEvent,_sender:Player,_registered_requests:Request[]):{r:Request[],e:Event[]}{return {r:[],e:[]};};
  onBoard(_data:GameData,_event:BoardEvent,_sender:Player,_registered_requests:Request[]):{r:Request[],e:Event[]}{return {r:[],e:[]};};
  onMove(_data:GameData,_event:MoveEvent,_sender:Player,_registered_requests:Request[]):{r:Request[],e:Event[]}{return {r:[],e:[]};};
  onAnswer(_data:GameData,_event:AnswerEvent,_sender:Player,_registered_requests:Request[]):{r:Request[],e:Event[]}{return {r:[],e:[]};};
}
