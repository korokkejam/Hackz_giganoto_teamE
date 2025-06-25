import {Game,Request} from "./types";
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

export abstract class ModBase{
  game:Game;
  commands:CommandConstructor[];

  constructor(game:Game,commandClasses:CommandConstructor[]){
    this.game=game;
    this.commands=commandClasses;
  }

  event(request:Request<Event<any>>){
    switch (request.content.type){
      case "chat":
        this.onMessage(request.content);
        break;
      case "drop":
        this.onDrop(request.content);
        break;
      case "move":
        this.onMove(request.content);
        break;
      case "start":
        this.onStart(request.content);
        break;
      case "promotion":
        this.onPromotion(request.content);
        break;
      case "turn":
        this.onTurn(request.content);
        break;
      case "end":
        this.onEnd(request.content);
        break;
      case "delete":
        this.onDelete(request.content);
        break;
      case "capture":
        this.onCapture(request.content);
        break;
      case "command":
        this.onCommand(request.content);
    }
  }

  onStart(_e:StartEvent){}
  onMessage(_e:ChatEvent){}
  onDrop(_e:DropEvent){}
  onMove(_e:MoveEvent){}
  onPromotion(_e:PromotionEvent){}
  onTurn(_e:TurnEvent){}
  onEnd(_e:EndEvent){}
  onDelete(_e:DeleteEvent){}
  onCapture(_e:CaptureEvent){}

  onCommand(e:CommandEvent){
    const command=this.commands.map((commandClass)=>createCommand(commandClass,e.data,this.game)).find((command)=>command.type===e.data.type);
    if (!command){
      return;
    }
    command.execute();
  }
}
