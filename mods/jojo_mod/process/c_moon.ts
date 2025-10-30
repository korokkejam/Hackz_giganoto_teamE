import { ChangeBoardEvent, Event, Game, Request } from "shogi2-types";
import Base from "./base";

export default class CMoon extends Base{
  constructor(game:Game){
    super(game);
  }
  onEvent(_e:Event,_before:Game){
    const r=this.game.boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>{
      if (s.piece){
        return {
          piece:s.piece,
          pos:{x,y,z}
        };
      }else{
        return undefined;
      }
    }))).flat(2).filter((s)=>!!s).filter(({piece})=>{
      return piece.type.id==="c-moon";
    }).map((d)=>{
      if (d){
        const {piece:c_moon,pos}=d;
        if (c_moon){
          let flag=false;
          for (let dy=-2;dy <3;dy++){
            for (let dx=-2;dx <3;dx++){
              const y_limit=this.game.boards[pos.z].length;
              if (0 <= pos.y+dy && pos.y+dy <= y_limit && 0 <= pos.y+dy*2 && pos.y+dy*2 <= y_limit){
                const x_limit=this.game.boards[pos.z][pos.y+dy].length;
                if (0 <= pos.x+dx && pos.x+dx <= x_limit && 0 <= pos.x+dx*2 && pos.x+dx*2 <= x_limit){
                  const {piece:piece}=this.game.boards[pos.z][pos.y+dy][pos.x+dx];
                  const s=this.game.boards[pos.z][pos.y+dy*2]?.[pos.x+dx*2];
                  if (piece && s && !s.piece){
                    flag=true;
                    this.game.boards[pos.z][pos.y+dy*2][pos.x+dx*2].piece={...piece};
                    this.game.boards[pos.z][pos.y+dy][pos.x+dx].piece=null;
                  }
                }
              }
            }
          }
          if (flag){
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
            return {request,target:undefined,owner:"jojo"};
          }
        }
      }
    }).filter((v)=>!!v);
    return r;
  }
}
