import { CaptureEvent, DropEvent, EndEvent, Event, GameData, Player, RequestExpansion, RequestUpdater, StartEvent } from "./index";
import { BoardEvent } from "./events/BoardEvent";
import { MoveEvent } from "./events/MoveEvent";
import { AnswerEvent } from "./events/AnswerEvent";

export abstract class ModBase{
  log_list:string[];
  constructor(){
    this.log_list=[];
  }
  log(content:string){
    this.log_list.push(content);
  }
  update(data:GameData,before:GameData,event:Event,sender:Player,updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{
    const requests:RequestExpansion[]=[];
    const events:Event[]=[];
    switch (event.type){
      case "start":
        {
          const re=this.onStart(data,before,event as StartEvent,sender,updater);
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
          const re=this.onBoard(data,before,event as BoardEvent,sender,updater);
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
          const re=this.onMove(data,before,event as MoveEvent,sender,updater);
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
          const re=this.onAnswer(data,before,event as AnswerEvent,sender,updater);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
      case "drop":
        {
          const re=this.onDrop(data,before,event as DropEvent,sender,updater);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
      case "capture":
        {
          const re=this.onCapture(data,before,event as CaptureEvent,sender,updater);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
      case "end":
        {
          const re=this.onEnd(data,before,event as EndEvent,sender,updater);
          re.r.forEach((r)=>{
            requests.push(r);
          });
          re.e.forEach((e)=>{
            events.push(e);
          });
        }
        break;
    }
    data.log=data.log.concat(this.log_list);
    this.log_list=[];
    return {r:requests,e:events};
  }
  onStart(_data:GameData,_before:GameData,_event:StartEvent,_sender:Player,_updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{return {r:[],e:[]};};
  onBoard(_data:GameData,_before:GameData,_event:BoardEvent,_sender:Player,_updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{return {r:[],e:[]};};
  onMove(_data:GameData,_before:GameData,_event:MoveEvent,_sender:Player,_updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{return {r:[],e:[]};};
  onAnswer(_data:GameData,_before:GameData,_event:AnswerEvent,_sender:Player,_updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{return {r:[],e:[]};};
  onDrop(_data:GameData,_before:GameData,_event:DropEvent,_sender:Player,_updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{return {r:[],e:[]};};
  onCapture(_data:GameData,_before:GameData,_event:CaptureEvent,_sender:Player,_updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{return {r:[],e:[]};};
  onEnd(_data:GameData,_before:GameData,_event:EndEvent,_sender:Player,_updater:RequestUpdater):{r:RequestExpansion[],e:Event[]}{return {r:[],e:[]};};
}
