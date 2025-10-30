import { AudioEvent, ChangeBoardEvent, Event, File, FileEvent, Game, ModBase, MoveEvent, PromotionCheckEvent, PromotionEvent, Request, ReturnRequest, StartEvent, TurnEvent } from "shogi2-types";
import { pieces } from "./pieces";
import replace from "./replace";
import fs from "fs";
import Base from "./process/base";
import King from "./process/king";
import DeathConfig from "./config";

export default class Death extends ModBase{
  type="death";
  filedata:{name:string,type:string,id:string}[];
  processes:Base[];
  config:DeathConfig|undefined;
  constructor(game:Game){
    super(game);
    this.filedata=[
      {name:"src/mods/death/assets/xfile.mp3",type:"audio/mp3",id:"xfile"},
    ];
    this.processes=[
      new King(game)
    ];
  }
  onStart(_e:StartEvent,_before:Game){
    this.game.pieces=this.game.pieces.concat(pieces);
    this.game=replace(this.game);
    const change:ChangeBoardEvent={
      type:"change_board",
      id:crypto.randomUUID(),
      data:{
        boards:this.game.boards
      }
    };
    const request:Request<ChangeBoardEvent>={
      head:"event",
      content:change
    };
    const r:ReturnRequest={
      request,
      target:undefined,
      owner:"death"
    };
    const files:File[]=this.filedata.map((file)=>{
      return {
        content:fs.readFileSync(file.name).toString("base64"),
        mimetype:file.type,
        id:file.id
      };
    });
    const req=files.map((file)=>{
      const e:FileEvent={
        type:"file",
        id:crypto.randomUUID(),
        data:file
      };
      const req:Request<FileEvent>={
        head:"event",
        content:e
      };
      const fileRequest:ReturnRequest={
        request:req,
        owner:"upgrade",
        target:undefined
      };
      return fileRequest
    });
    if (this.config?.config.no_turn){
      const turn1:TurnEvent={
        type:"turn",
        id:crypto.randomUUID(),
        data:{
          player:"player1"
        }
      };
      const req1:Request<TurnEvent>={
        head:"event",
        content:turn1
      };
      const r1:ReturnRequest={request:req1,target:"player1",owner:"death"};
      const turn2:TurnEvent={
        type:"turn",
        id:crypto.randomUUID(),
        data:{
          player:"player2"
        }
      };
      const req2:Request<TurnEvent>={
        head:"event",
        content:turn2
      };
      const r2:ReturnRequest={request:req2,target:"player2",owner:"death"};
      return [...req,r,r1,r2];
    }
    return [...req,r];
  }
  onMove(e:MoveEvent,before:Game){
    const audio:AudioEvent={
      type:"audio",
      id:crypto.randomUUID(),
      data:{
        id:"xfile"
      }
    };
    const request:Request<AudioEvent>={
      head:"event",
      content:audio
    };
    const r:ReturnRequest={
      request,
      target:undefined,
      owner:"death"
    };
    const requests=this.processes.map((process)=>process.onMove(e,before)).filter((request)=>!!request).flat();
    return [r,...requests];
  }
  onEvent(_e:Event,_before:Game){
    if (this.config?.config.no_turn){
      this.game.requests=this.game.requests.filter((r)=>r.request.content.type!=="turn");
    }
  }
  onPromotionCheck(_e:PromotionCheckEvent,_before:Game){
    const e:PromotionEvent|undefined=this.game.requests.find((r)=>r.request.content.type==="promotion")?.request.content;
    if (e?.data.piece.type.id==="promoted_king"){
      const s=this.game.boards[e.data.pos.z][e.data.pos.y][e.data.pos.x];
      if (s.piece){
        const relative=this.game.pieces.map((p)=>p.movable.relative).flat();
        const absolute=this.game.pieces.map((p)=>p.movable.absolute).flat();
        const func=this.game.pieces.map((p)=>p.movable.func).flat();
        this.game.boards[e.data.pos.z][e.data.pos.y][e.data.pos.x]={
          ...s,
          piece:{
            ...s.piece,
            type:{
              ...s.piece.type,
              movable:{
                absolute,
                relative,
                func
              }
            }
          }
        };
        const change:ChangeBoardEvent={
          type:"change_board",
          id:crypto.randomUUID(),
          data:{
            boards:this.game.boards
          }
        };
        const request:Request<ChangeBoardEvent>={
          head:"event",
          content:change
        };
        return [{request,target:undefined,owner:"death"}];
      }
    }
  }
}
