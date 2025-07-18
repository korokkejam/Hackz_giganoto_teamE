import { ChangeBoardEvent, Game, MoveEvent, Request, ReturnRequest } from "shogi2-types";
import Base from "./base";

const DEATH_LIMIT:number=5;

export default class King extends Base{
  pieces:{id:string,death_count:number}[];
  constructor(game:Game){
    super(game);
    this.pieces=[];
  }
  onMove(e:MoveEvent,before:Game){
    if (this.game.requests.find((r)=>r.request.content.type==="end")){
      const pos=e.data.after_pos;
      const s=before.boards[pos.z][pos.y][pos.x];
      const piece=s.piece;
      if (!piece){
        return;
      }
      let p=this.pieces.find((p)=>p.id===piece.id);
      if (!p){
        p={id:piece.id,death_count:0};
        this.pieces.push(p);
      }
      if (p.death_count>=DEATH_LIMIT){
        return;
      }
      this.game.boards=before.boards;
      this.game.requests=this.game.requests.filter((r)=>r.request.content.type!=="end");
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
      }
      p.death_count++;
      return [r];
    }
  }
}
