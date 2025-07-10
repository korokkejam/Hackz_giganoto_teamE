import { Game, MoveEvent } from "shogi2-types";
import Base from "./base";

export default class BadCampany extends Base{
  count:number;
  constructor(game:Game){
    super(game);
    this.count=0;
  }
  onMove(e:MoveEvent,before:Game){
    if (this.count===0 && e.data.piece.type.id==="bad_campany"){
      this.game.turn=before.turn;
      this.game.requests=this.game.requests.filter((request)=>{
        return request.request.content.type!=="turn";
      });
      this.count=1;
    }else if (0<this.count){
      this.count=0;
    }
  }
}
