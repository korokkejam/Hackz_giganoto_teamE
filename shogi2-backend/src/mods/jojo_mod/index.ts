import {ModBase,Game,StartEvent, ChatEvent, ReturnRequest, ChangeBoardEvent, Request, Piece, MoveEvent} from "shogi2-types";
import {stone_ocean_pieces} from "./pieces/stone_ocean";

export default class JoJo extends ModBase{
  type="jojo";
  count:number;
  constructor(game:Game){
    super(game);
    this.count=0;
  }
  onStart(_e:StartEvent,_game:Game){
    stone_ocean_pieces.forEach((piece)=>{
      this.game.pieces.push(piece);
    });
    console.log("jojo mod loaded!");
    this.game.boards=this.game.boards.map((board)=>board.map((row)=>row.map((s)=>{
      if (s.piece?.type.id==="pawn"){
        const piece:Piece={
          type:{...stone_ocean_pieces[2]},
          id:crypto.randomUUID(),
          owner:s.piece.owner
        };
        return {piece};
      }else{
        return s;
      }
    })));
    const c:ChangeBoardEvent={type:"change_board",data:{boards:this.game.boards},id:crypto.randomUUID()};
    const b:Request<ChangeBoardEvent>={head:"event",content:c};
    const a:ReturnRequest={request:b,owner:"jojo",target:undefined};
    return [a];
  }
  onMessage(_e:ChatEvent,_game:Game){
  }
  onMove(e:MoveEvent,before:Game){
    if (this.count===0 && e.data.piece.type.id==="bad-campany"){
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
