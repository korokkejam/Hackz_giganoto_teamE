import {Game,player,Request} from "./types";
import {Event} from "./Event";
import {ChatEvent} from "./events/ChatEvent";
import {StartEvent} from "./events/StartEvent";
import {DropEvent} from "./events/DropEvent";
import {MoveEvent} from "./events/MoveEvent";
import {PromotionEvent} from "./events/PromotionEvent";
import {TurnEvent} from "./events/TurnEvent";
import {EndEvent} from "./events/EndEvent";
import {DeleteEvent} from "./events/DeleteEvent";
import {CaptureEvent} from "./events/CaptureEvent";
import {CommandConstructor, createCommand} from "./CommandFactory";
import {CommandEvent} from "./events/CommandEvent";
import { QuestionEvent } from "./events/QuestionEvent";
import { PromotionCheckEvent } from "./events/PromotionCheckEvent";

export interface ReturnRequest{
  request:Request<Event>;
  target:player|undefined;
  overwritten?:boolean;
  owner:string; //mod名
}

export abstract class ModBase{
  abstract type:string;
  game:Game;
  commands:CommandConstructor[];

  constructor(game:Game){
    this.game=game;
    this.commands=[];
  }

  event(request:Request<Event>,game:Game):ReturnRequest[]{
    let requests:ReturnRequest[]=[];
    switch (request.content.type){
      case "chat":
        {
          const rs=this.onMessage(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "drop":
        {
          const rs=this.onDrop(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "move":
        {
          const rs=this.onMove(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "start":
        {
          const rs=this.onStart(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "promotion":
        {
          const rs=this.onPromotion(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "turn":
        {
          const rs=this.onTurn(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "end":
        {
          const rs=this.onEnd(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "delete":
        {
          const rs=this.onDelete(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "capture":
        {
          const rs=this.onCapture(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "question":
        {
          const rs=this.onQuestion(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "promotion_check":
        {
          const rs=this.onPromotionCheck(request.content,game);
          if (rs){
            rs.forEach((r)=>{
              requests.push(r);
            });
          }
        }
        break;
      case "command":
        this.onCommand(request.content);
        break;
    }
    const rs=this.onEvent(request.content,game);
    if (rs){
      rs.forEach((r)=>{
        requests.push(r)
      });
    }
    return requests.filter((request)=>!!request);
  }

  // mod開発者はeventメソッドから自動で呼び出されるこのメソッドを実装する
  // _game:Gameはベースのゲームの更新が行われる前のgameで、これを使うことで処理を上書きすることができ、使わなければ処理の追加という扱いになる
  onStart(_e:StartEvent,_game:Game):ReturnRequest[]|void{}
  onMessage(_e:ChatEvent,_game:Game):ReturnRequest[]|void{}
  onDrop(_e:DropEvent,_game:Game):ReturnRequest[]|void{}
  onMove(_e:MoveEvent,_game:Game):ReturnRequest[]|void{}
  onPromotion(_e:PromotionEvent,_game:Game):ReturnRequest[]|void{}
  onTurn(_e:TurnEvent,_game:Game):ReturnRequest[]|void{}
  onEnd(_e:EndEvent,_game:Game):ReturnRequest[]|void{}
  onDelete(_e:DeleteEvent,_game:Game):ReturnRequest[]|void{}
  onCapture(_e:CaptureEvent,_game:Game):ReturnRequest[]|void{}
  onQuestion(_e:QuestionEvent,_game:Game):ReturnRequest[]|void{}
  onPromotionCheck(_e:PromotionCheckEvent,_game:Game):ReturnRequest[]|void{}

  onCommand(e:CommandEvent){
    const command=this.commands.map((commandClass)=>createCommand(commandClass,e.data,this.game)).find((command)=>command.type===e.data.type);
    if (!command){
      return;
    }
    command.execute();
  }

  onEvent(_e:Event,_game:Game):ReturnRequest[]|void{}
}
