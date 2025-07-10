import {
  ModBase,
  Game,
  StartEvent,
  ReturnRequest,
  ChangeBoardEvent,
  Request,
  MoveEvent,
  PromotionCheckEvent,
  ChatEvent,
  Event,
  DropEvent,
  PromotionEvent,
  TurnEvent,
  EndEvent,
  DeleteEvent,
  CaptureEvent,
  QuestionEvent,
  AudioEvent,
  WarpEvent
} from "shogi2-types";
import {stone_ocean_pieces} from "./pieces/stone_ocean";
import Base from "./process/base";
import BadCampany from "./process/bad_campany";
import WhiteSnake from "./process/white_snake";
import WhiteSnake2 from "./process/white_snake2";
import expand from "./expand";
import Harvest from "./process/harvest";
import { battle_tendency_pieces } from "./pieces/battle_tendency";
import { diamond_is_unbreakable_pieces } from "./pieces/diamond_is_unbreakable";
import { golden_wind_pieces } from "./pieces/golden_wind";
import { stardust_crusaders_pieces } from "./pieces/stardust_crusaders";
import { item_pieces } from "./pieces/item";
import { steel_ball_run_pieces } from "./pieces/steel_ball_run";
import CMoon from "./process/c_moon";
import { ReservationEvent } from "shogi2-types/dist/esm/events/ReservationEvent";
import Mandom from "./process/mandom";
import { D4C } from "./process/d4c";

export default class JoJo extends ModBase{
  type="jojo";
  processes:Base[];
  constructor(game:Game){
    super(game);
    this.processes=[
      new BadCampany(game),
      new WhiteSnake(game),
      new WhiteSnake2(game),
      new Harvest(game),
      new CMoon(game),
      new Mandom(game),
      new D4C(game)
    ];
  }
  onStart(e:StartEvent,before:Game){
    this.game.pieces=this.game.pieces.concat(stone_ocean_pieces);
    this.game.pieces=this.game.pieces.concat(battle_tendency_pieces);
    this.game.pieces=this.game.pieces.concat(diamond_is_unbreakable_pieces);
    this.game.pieces=this.game.pieces.concat(golden_wind_pieces);
    this.game.pieces=this.game.pieces.concat(stardust_crusaders_pieces);
    this.game.pieces=this.game.pieces.concat(item_pieces);
    this.game.pieces=this.game.pieces.concat(steel_ball_run_pieces);
    console.log("jojo mod loaded!");
    // this.game.pieces=this.game.pieces.map((piece)=>{return{...piece,src:"kinniku"}});
    expand(this.game);
    this.game.history[0].boards=this.game.boards.map((board)=>board.map((row)=>row.map((s)=>{
      return {...s};
    })));
    const requests=this.processes.map((process)=>process.onStart(e,before)).filter((request)=>!!request).flat();
    const change:ChangeBoardEvent={type:"change_board",data:{boards:this.game.boards},id:crypto.randomUUID()};
    const request:Request<ChangeBoardEvent>={head:"event",content:change};
    const r:ReturnRequest={request,owner:"jojo",target:undefined};
    return [r,...requests];
  }
  onMove(e:MoveEvent,before:Game){
    const requests=this.processes.map((process)=>process.onMove(e,before)).filter((request)=>!!request).flat();
    return requests;
  }
  onPromotionCheck(e:PromotionCheckEvent,before:Game){
    const requests=this.processes.map((process)=>process.onPromotionCheck(e,before)).filter((request)=>!!request).flat();
    return requests;
  }
  onMessage(e:ChatEvent,before:Game){
    const requests=this.processes.map((process)=>process.onMessage(e,before)).filter((request)=>!!request).flat();
    return requests;
  }
  onDrop(e:DropEvent,before:Game){
    const request=this.processes.map((process)=>process.onDrop(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onPromotion(e:PromotionEvent,before:Game){
    const request=this.processes.map((process)=>process.onPromotion(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onTurn(e:TurnEvent,before:Game){
    const request=this.processes.map((process)=>process.onTurn(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onEnd(e:EndEvent,before:Game){
    const request=this.processes.map((process)=>process.onEnd(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onDelete(e:DeleteEvent,before:Game){
    const request=this.processes.map((process)=>process.onDelete(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onCapture(e:CaptureEvent,before:Game){
    const request=this.processes.map((process)=>process.onCapture(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onQuestion(e:QuestionEvent,before:Game){
    const request=this.processes.map((process)=>process.onQuestion(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onEvent(e:Event,before:Game){
    const request=this.processes.map((process)=>process.onEvent(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onAudio(e:AudioEvent,before:Game){
    const request=this.processes.map((process)=>process.onAudio(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onReservation(e:ReservationEvent,before:Game){
    const request=this.processes.map((process)=>process.onReservation(e,before)).filter((request)=>!!request).flat();
    return request;
  }
  onWarp(e:WarpEvent,before:Game){
    const request=this.processes.map((process)=>process.onWarp(e,before)).filter((request)=>!!request).flat();
    return request;
  }
}
