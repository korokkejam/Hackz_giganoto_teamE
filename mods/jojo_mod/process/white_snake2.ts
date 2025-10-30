import { CaptureEvent, ChangeBoardEvent, Game, MoveEvent, Request } from "shogi2-types";
import Base from "./base";

export default class WhiteSnake2 extends Base{
  constructor(game:Game){
    super(game);
  }
  onMove(e:MoveEvent,_before:Game){
    if (e.data.piece.type.id==="white_snake"){
      const request:Request<CaptureEvent>|undefined=this.game.requests.find((r)=>r.request.content.type==="capture")?.request;
      if (request){
        this.game.requests=this.game.requests.filter((r)=>r.request.content.type!=="capture");
        const piece2=request.content.data.piece2;
        let piece1=request.content.data.piece1;
        piece2.type.movable.func.forEach((f)=>{
          piece1.type.movable.func.push(f);
        });
        piece2.type.movable.absolute.forEach((f)=>{
          piece1.type.movable.absolute.push(f);
        });
        piece2.type.movable.relative.forEach((f)=>{
          piece1.type.movable.relative.push(f);
        });
        const pos1=request.content.data.pos1;
        const pos2=request.content.data.pos2;
        const square=this.game.boards[pos1.z][pos1.y][pos1.x];
        this.game.boards[pos2.z][pos2.y][pos2.x].piece=piece1;;
        this.game.boards[pos1.z][pos1.y][pos1.x]={
          ...square,
          piece:{
            ...piece2,
            type:{
              ...piece2.type,
              movable:{
                relative:[],
                absolute:[],
                func:[]
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
        const req:Request<ChangeBoardEvent>={
          head:"event",
          content:change
        };
        return [{request:req,target:undefined,owner:"jojo"}];
      }
    }
  }
}
