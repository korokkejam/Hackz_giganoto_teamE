import { ReservationEvent, ChangeBoardEvent, Game, MoveEvent, player, Request, ReturnRequest, TurnEvent } from "shogi2-types";
import Base from "./base";

const return_counts=5;

export default class Mandom extends Base{
  count:number;
  id:string;
  owner:player;
  constructor(game:Game){
    super(game);
    this.count=0;
    this.owner="player1";
    this.id="";
  }
  onMove(e:MoveEvent,_before:Game){
    if (e.data.piece.type.id==="mandom"){
      const dx=e.data.after_pos.x-e.data.before_pos.x;
      const dy=e.data.after_pos.y-e.data.before_pos.y;
      if (Math.abs(dx)===1 && Math.abs(dy)===1){
        this.owner=e.data.piece.owner;
        return [this.advance(),this.back()];
      }
    }
  }
  onReservation(e:ReservationEvent,_before:Game){
    if (e.data.id===this.id){
      if (this.count < return_counts+2){
        return [this.advance(),this.back()];
      }else{
        this.count=0;
        if (this.game.turn!==this.owner){
          this.game.turn=this.owner;
          const turn:TurnEvent={
            type:"turn",
            id:crypto.randomUUID(),
            data:{
              player:this.owner
            }
          };
          const req:Request<TurnEvent>={
            head:"event",
            content:turn
          };
          return [{request:req,target:undefined,owner:"jojo"}];
        }
      }
    }
  }
  advance():ReturnRequest{
    this.id=crypto.randomUUID();
    const request:Request<ReservationEvent>={
      head:"event",
      content:new ReservationEvent(crypto.randomUUID(),{id:this.id,millis:1000})
    };
    this.count++;
    return {request,target:this.owner,owner:"jojo"};
  }
  back():ReturnRequest{
    const last=this.game.history.pop();
    if (last){
      this.game.boards_id=last.id;
      this.game.boards=last.boards;
    }
    const request:Request<ChangeBoardEvent>={
      head:"event",
      content:new ChangeBoardEvent(this.game.boards,crypto.randomUUID())
    }
    return {request,target:undefined,owner:"jojo"};
  }
}
