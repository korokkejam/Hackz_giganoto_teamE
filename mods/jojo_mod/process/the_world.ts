import { AudioEvent, Game, MoveEvent, Request } from "shogi2-types";
import Base from "./base";

const LIMIT:number=5;

export default class TheWorld extends Base{
  count:number;
  constructor(game:Game){
    super(game);
    this.count=0;
  }
  onMove(e:MoveEvent,before:Game){
    if (this.game.boards[e.data.after_pos.z][e.data.after_pos.y][e.data.after_pos.x].piece?.type.king){
      return;
    }
    if (e.data.piece.type.id==="the_world" || e.data.piece.type.id==="star_platinum_the_world"){
      if (this.count < LIMIT){
        this.game.turn=before.turn;
        this.game.requests=this.game.requests.filter((request)=>{
          return request.request.content.type!=="turn";
        });
        this.count++;
        if (this.count===1){
          const audio:AudioEvent={
            type:"audio",
            id:crypto.randomUUID(),
            data:{
              id:"the_world"
            }
          };
          const request:Request<AudioEvent>={
            head:"event",
            content:audio
          };
          return [{request,target:e.data.piece.owner,owner:"jojo"}];
        }
      }else{
        this.count=0;
      }
    }
  }
}
