import "./rooms";
import { WSContext } from "hono/ws";
import {
  Event,
  ChatEvent,
  Game,
  ModBase,
  ModConfig,
  Request,
  ReturnRequest,
  board,
  MoveEvent,
  CaptureEvent,
  TurnEvent,
  PromotionEvent,
  Piece,
  PromotionCheckEvent,
  EndEvent,
  DropEvent,
  CommandEvent,
  ChatEventType,
  StartEvent,
  UIEvent
} from "shogi2-types";
import { pieces } from "../config/piece";
import {configs, mods} from "../load";
import cloneDeep from 'lodash/cloneDeep';

export default class GameProcess{
  game:Game;
  mods:ModBase[];
  configs:ModConfig[];
  boards:board[];
  constructor(boards:board[]){
    this.boards=cloneDeep(boards);
    const game=this.init();
    this.game=game;
    this.mods=mods.map((modClass)=>new modClass(game));
    this.configs=configs.map((configClass,i)=>new configClass(game,this.mods[i]));
    this.init2();
  }
  init():Game{
    const id=crypto.randomUUID();
    const game:Game={
      boards:cloneDeep(this.boards),
      turn:"player1",
      player1_current_board:0,
      player2_current_board:0,
      player1_point:0,
      player2_point:0,
      player1_redbull:0,
      player2_redbull:0,
      history:[{boards:cloneDeep(this.boards),id}],
      player1_storage:[],
      player2_storage:[],
      pieces:[...pieces],
      messages:[],
      requests:[],
      boards_id:id,
      ui1:{
        menu1:[],
        menu2:[]
      },
      ui2:{
        menu1:[],
        menu2:[]
      },
      mods:[]
    };
    return game;
  }
  init2(){
    this.mods.sort((mod1,mod2)=>{
      const config1=this.configs.find((config)=>config.type===mod1.type);
      const config2=this.configs.find((config)=>config.type===mod2.type);
      if (!config1 || !config2){
        return 0;
      }
      return config1.hierarchy-config2.hierarchy;
    });
    this.configs.sort((config1,config2)=>config1.hierarchy-config2.hierarchy);
    this.game.mods=this.configs.map((config)=>({name:config.type,load:config.load}));
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
      case "reset":
        const mods:Record<string,boolean>=request.content;
        this.game.mods=Object.keys(mods).map((name)=>({name,load:mods[name]}));
        
        const id=crypto.randomUUID();
        this.game.boards=cloneDeep(this.boards),
        this.game.turn="player1",
        this.game.player1_current_board=0,
        this.game.player2_current_board=0,
        this.game.player1_point=0,
        this.game.player2_point=0,
        this.game.player1_redbull=0,
        this.game.player2_redbull=0,
        this.game.history=[{boards:cloneDeep(this.boards),id}],
        this.game.player1_storage=[],
        this.game.player2_storage=[],
        this.game.pieces=[...pieces],
        this.game.messages=[],
        this.game.requests=[],
        this.game.boards_id=id,
        this.game.ui1={ menu1:[], menu2:[] },
        this.game.ui2={ menu1:[], menu2:[] },

        this.init2();
        Object.keys(mods).forEach((name)=>{
          const config=this.configs.find((config)=>config.type===name);
          if (config){
            config.load=mods[name];
          }
        });
        this.game.ui1={...this.game.ui1,foreground:undefined};
        this.game.ui2={...this.game.ui2,foreground:undefined};
        const e2_1:Request<UIEvent>={head:"event",content:{type:"ui",id:crypto.randomUUID(),data:this.game.ui1}};
        const e2_2:Request<UIEvent>={head:"event",content:{type:"ui",id:crypto.randomUUID(),data:this.game.ui2}};
        ws1.send(JSON.stringify(e2_1));
        ws2.send(JSON.stringify(e2_2));
        const e:Request<StartEvent>={head:"event",content:{type:"start",data:{},id:crypto.randomUUID()}};
        this.event(e,ws1,ws2);
        const d:Request<any>={head:"ready",content:this.game};
        ws1.send(JSON.stringify(d));
        ws2.send(JSON.stringify(d));
        return;
      case "event":
        const event:Event=(request as Request<Event>).content;
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
          case "command":
            {
              if (request.sender===undefined){
                return;
              }
              const e:CommandEvent=event;
              const msg=`/${e.data.type} ${e.data.option.join(" ")}`
              console.log(`${e.data.sender}:${msg}`);
              const c:ChatEventType={
                msg,
                sender:e.data.sender
              };
              this.game.messages.push(c);
              const req:ReturnRequest={
                request:{
                  head:"event",
                  content:{
                    type:"chat",
                    data:c,
                    id:e.id
                  },
                  sender:request.sender
                },
                target:undefined,
                owner:"main"
              };
              this.game.requests.push(req);
            }
            break;
          case "move":
            {
              let end_flag=false;
              const e:MoveEvent=event;
              const piece1=e.data.piece;
              const piece2=this.game.boards[e.data.after_pos.z][e.data.after_pos.y][e.data.after_pos.x].piece;
              const s1=this.game.boards[e.data.after_pos.z][e.data.after_pos.y][e.data.after_pos.x];
              const s2=this.game.boards[e.data.before_pos.z][e.data.before_pos.y][e.data.before_pos.x];
              this.game.boards[e.data.after_pos.z][e.data.after_pos.y][e.data.after_pos.x]={...s1,piece:piece1};
              this.game.boards[e.data.before_pos.z][e.data.before_pos.y][e.data.before_pos.x]={...s2,piece:null};
              if (piece2){ //piece2が取られた時
                const capture:CaptureEvent={
                  type:"capture",
                  id:crypto.randomUUID(),
                  data:{
                    piece1,
                    piece2,
                    pos1:{...e.data.before_pos},
                    pos2:{...e.data.after_pos}
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
              if (((this.game.turn==="player1" && e.data.after_pos.y < 3) || (this.game.turn==="player2" && this.game.boards[this.game.player2_current_board].length-3-1 < e.data.after_pos.y)) && piece1.type.promotion && !end_flag && !piece1.type.promotion_check){
                const promotion_check:PromotionCheckEvent={
                  type:"promotion_check",
                  id:crypto.randomUUID(),
                  data:{
                    piece:piece1,
                    pos:e.data.after_pos,
                    answer:false
                  }
                };
                const req:Request<PromotionCheckEvent>={head:"event",content:promotion_check};
                this.game.requests.push({request:req,target:e.data.piece.owner,owner:"main"});
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
                  const s=this.game.boards[pos.z][pos.y][pos.x];
                  this.game.boards[pos.z][pos.y][pos.x]={...s,piece:promotedPiece};

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
                this.game.player1_storage=this.game.player1_storage.filter((p)=>p.id!==e.data.piece.id);
              }else{
                this.game.player2_storage=this.game.player2_storage.filter((p)=>p.id!==e.data.piece.id);
              }
              const req1:Request<DropEvent>={head:"event",content:e};
              this.game.requests.push({request:req1,target:undefined,owner:"main"});
              this.game.turn=this.game.turn==="player1"?"player2":"player1";
              const turn:TurnEvent={type:"turn",data:{player:this.game.turn},id:crypto.randomUUID()};
              const req2:Request<TurnEvent>={head:"event",content:turn};
              this.game.requests.push({request:req2,target:undefined,owner:"main"});
            }
            break;
          case "warp":
            {
              if (request.sender==="player1"){
                this.game.player1_current_board+=1;
              }else{
                this.game.player2_current_board+=1;
              }
              this.game.requests.push({request,owner:"main",target:request.sender});
            }
            break;
        }
        break;
    }
    for (const mod of this.mods.filter((mod)=>this.configs.find((config)=>config.type===mod.type)?.load)){
      const rs=mod.event(request,cloneDeep(before));
      for (const r of rs){
        this.game.requests.push(r);
      }
    }
    if (this.game.requests.map((r)=>r.request.content.type).includes("turn")){
      this.game.history.push({boards:cloneDeep(this.game.boards),id:this.game.boards_id});
      this.game.boards_id=crypto.randomUUID();
    }
    this.game.requests.forEach((r)=>{
      let wss:WSContext[]=[];
      switch (r.target){
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
        ws.send(JSON.stringify(r.request));
      });
    });
  }
}
