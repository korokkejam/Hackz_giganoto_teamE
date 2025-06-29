import "./rooms";
import { WSContext } from "hono/ws";
import {Event,ChatEvent, Game,ModBase,ModConfig,Request,ReturnRequest,board, MoveEvent, Move, CaptureEvent, TurnEvent, PromotionEvent, Piece, PromotionCheckEvent, EndEvent, DropEvent} from "shogi2-types";
import { pieces } from "../config/piece";
import {configs, mods} from "../load";
import cloneDeep from 'lodash/cloneDeep';

class GameProcess{
  game:Game;
  mods:ModBase[];
  configs:ModConfig[];
  constructor(boards:board[]){
    const game:Game={
      boards,
      turn:"player1",
      player1_current_board:0,
      player2_current_board:0,
      player1_point:0,
      player2_point:0,
      player1_redbull:0,
      player2_redbull:0,
      history:[],
      player1_storage:[],
      player2_storage:[],
      pieces:[...pieces],
      messages:[],
      requests:[]
    };
    this.game=game;
    this.mods=mods.map((modClass)=>new modClass(game));
    this.configs=configs.map((configClass,i)=>new configClass(game,this.mods[i]));
    this.mods.sort((mod1,mod2)=>{
      const config1=this.configs.find((config)=>config.type===mod1.type);
      const config2=this.configs.find((config)=>config.type===mod2.type);
      if (!config1 || !config2){
        return 0;
      }
      return config1.hierarchy-config2.hierarchy;
    });
    this.configs.sort((config1,config2)=>config1.hierarchy-config2.hierarchy);
  }
  clone_game():Game{
    return cloneDeep(this.game);
  }
  update(e:MessageEvent,ws1:WSContext,ws2:WSContext){
    const request:Request<any>=JSON.parse(e.data);
    this.event(request,ws1,ws2);
  }
  event(request:Request<any>,ws1:WSContext,ws2:WSContext){
    const before=this.clone_game();
    this.game.requests=[];
    switch (request.head){
      case "event":
        const event:Event=(request as Request<Event>).content;
        console.log(event);
        switch (event.type){
          case "chat":
            {
              if (request.sender===undefined){
                return;
              }
              const e:ChatEvent=event;
              console.log(`${e.data.sender}:${e.data.msg}`);
              this.game.messages.push(e.data);
              const req:ReturnRequest={request:{head:"event",content:e},target:undefined,owner:"main"};
              this.game.requests.push(req);
            }
            break;
          case "move":
            {
              let end_flag=false;
              const e:MoveEvent=event;
              const move:Move={
                pieceId:e.data.piece.id,
                from:{x:e.data.before_pos[0],y:e.data.before_pos[1],z:0},
                to:{x:e.data.after_pos[0],y:e.data.after_pos[1],z:0}
              };
              this.game.history.push([move]);
              const piece1=e.data.piece;
              const piece2=this.game.boards[0][e.data.after_pos[1]][e.data.after_pos[0]].piece;
              this.game.boards[0][e.data.after_pos[1]][e.data.after_pos[0]]={piece:piece1};
              this.game.boards[0][e.data.before_pos[1]][e.data.before_pos[0]]={piece:null};
              if (piece2){ //piece2が取られた時
                const capture:CaptureEvent={
                  type:"capture",
                  id:crypto.randomUUID(),
                  data:{
                    piece1,
                    piece2,
                    pos1:{x:e.data.before_pos[0],y:e.data.before_pos[1],z:0},
                    pos2:{x:e.data.after_pos[0],y:e.data.after_pos[1],z:0}
                  }
                };
                if (piece2.type.king){
                  const end:EndEvent={type:"end",data:{winner:piece1.owner},id:crypto.randomUUID()};
                  const req:Request<EndEvent>={head:"event",content:end};
                  this.game.requests.push({request:req,owner:"main",target:undefined});
                  end_flag=true;
                }
                if (this.game.turn==="player1"){
                  this.game.player1_storage.push(piece2);
                }else{
                  this.game.player2_storage.push(piece2);
                }
                const req:Request<CaptureEvent>={head:"event",content:capture,sender:request.sender};
                this.game.requests.push({request:req,target:undefined,owner:"main"});
              }
              if (move.to && ((this.game.turn==="player1" && 3>move.to.y) || (this.game.turn==="player2" && move.to.y>5)) && piece1.type.promotion && !end_flag){
                const promotion_check:PromotionCheckEvent={
                  type:"promotion_check",
                  id:crypto.randomUUID(),
                  data:{
                    piece:piece1,
                    pos:move.to,
                    answer:false
                  }
                };
                const req:Request<PromotionCheckEvent>={head:"event",content:promotion_check};
                this.game.requests.push({request:req,target:this.game.turn,owner:"main"});
              }else{
                this.game.turn=this.game.turn==="player1"?"player2":"player1";
                const turn:TurnEvent={type:"turn",data:{player:this.game.turn},id:crypto.randomUUID()};
                const req:Request<TurnEvent>={head:"event",content:turn};
                this.game.requests.push({request:req,target:undefined,owner:"main"});
              }
              const req:Request<MoveEvent>={head:"event",content:e};
              this.game.requests.push({request:req,target:undefined,owner:"main"});
            }
            break;
          case "promotion_check":
            {
              const e:PromotionCheckEvent=event;
              const pos=e.data.pos;
              const piece=e.data.piece;
              if (piece.type.promotion){
                if (e.data.answer){
                  const promotedPiece:Piece={id:piece.id,type:piece.type.promotion,owner:piece.owner};
                  this.game.boards[pos.z][pos.y][pos.x]={piece:promotedPiece};

                  const promotion:PromotionEvent={
                    type:"promotion",
                    id:crypto.randomUUID(),
                    data:{
                      piece:promotedPiece,
                      pos:e.data.pos
                    }
                  };
                  const req_p:Request<PromotionEvent>={head:"event",content:promotion};
                  this.game.requests.push({request:req_p,target:undefined,owner:"main"});
                }
                this.game.turn=this.game.turn==="player1"?"player2":"player1";
                const turn:TurnEvent={type:"turn",data:{player:this.game.turn},id:crypto.randomUUID()};
                const req:Request<TurnEvent>={head:"event",content:turn};
                this.game.requests.push({request:req,target:undefined,owner:"main"});
              }
            }
            break;
          case "drop":
            {
              const e:DropEvent=event;
              if (request.sender==="player1"){
                this.game.player1_storage=this.game.player1_storage.filter((p)=>p.id===e.data.piece.id);
              }else{
                this.game.player2_storage=this.game.player2_storage.filter((p)=>p.id===e.data.piece.id);
              }
              const req1:Request<DropEvent>={head:"event",content:e};
              this.game.requests.push({request:req1,target:undefined,owner:"main"});
              this.game.turn=this.game.turn==="player1"?"player2":"player1";
              const turn:TurnEvent={type:"turn",data:{player:this.game.turn},id:crypto.randomUUID()};
              const req2:Request<TurnEvent>={head:"event",content:turn};
              this.game.requests.push({request:req2,target:undefined,owner:"main"});
            }
            break;
        }
        break;
    }
    for (const mod of this.mods){
      const rs=mod.event(request,cloneDeep(before));
      for (const r of rs){
        const type=r.request.content.type;
        const target=r.target;
        this.game.requests=this.game.requests.filter((req)=>(req.request.content.type!==type || req.target!==target) && req.overwritten);
        this.game.requests.push(r);
      }
    }
    this.game.requests.forEach((request)=>{
      let wss:WSContext[]=[];
      switch (request.target){
        case "player1":
          wss.push(ws1);
          break;
        case "player2":
          wss.push(ws2);
          break;
        case undefined:
          wss.push(ws1);
          wss.push(ws2);
          break;
      }
      wss.map((ws)=>{
        ws.send(JSON.stringify(request.request));
      });
    });
  }
}

export default GameProcess;
