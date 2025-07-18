import { board, Game, MoveEvent, PromotionCheckEvent, ReturnRequest } from "shogi2-types";
import Base from "./base";

const LIMIT:number=5;

export default class MadeInHeaven extends Base{
  params:{
    id:string,
    jerk:number,
    acceleration:number,
    count:number,
    rounded:boolean,
    history:board[][]
  }[];
  constructor(game:Game){
    super(game);
    this.params=[];
  }
  onPromotionCheck(e:PromotionCheckEvent,_before:Game){
    if (e.data.answer){
      if (e.data.piece.type.id==="c-moon"){
        this.params.push({
          id:e.data.piece.id,
          jerk:1,
          acceleration:0,
          count:0,
          rounded:false,
          history:[]
        });
      }
    }
  }
  onMove(e:MoveEvent,_before:Game){
    const data=this.params.find(({id})=>id===e.data.piece.id);
    if (e.data.piece.type.id==="made_in_heaven" && data){
      if (data.count < LIMIT){
        const piece=e.data.piece;
        const pos=e.data.after_pos;
        piece.type.movable.relative=[
          ...[...Array(4+data.acceleration)].map((_,i)=>[0,i+1]),
          ...[...Array(4+data.acceleration)].map((_,i)=>[i+1,0]),
          ...[...Array(4+data.acceleration)].map((_,i)=>[0,-i-1]),
          ...[...Array(4+data.acceleration)].map((_,i)=>[-i-1,0]),
          ...[...Array(4+data.acceleration)].map((_,i)=>[i+1,i+1]),
          ...[...Array(4+data.acceleration)].map((_,i)=>[i+1,-i-1]),
          ...[...Array(4+data.acceleration)].map((_,i)=>[-i-1,i+1]),
          ...[...Array(4+data.acceleration)].map((_,i)=>[-i-1,-i-1])
        ];
        data.acceleration+=data.jerk;
        data.count++;
        this.params=this.params.map((p)=>p.id===data.id?data:p);
        this.game.boards[pos.z][pos.y][pos.x].piece=piece;
        return [
          {
            request:{
              head:"event",
              content:{
                type:"change_board",
                id:crypto.randomUUID(),
                data:{
                  boards:this.game.boards
                }
              }
            },
            target:undefined,
            owner:"jojo"
          }
        ];
      }else{
        data.count=0;
        data.jerk=0;
        data.rounded=true;
        this.params=this.params.map((p)=>p.id===data.id?data:p);
        const history=this.game.history.slice(-5);
        const base=history[0];
        this.game.history=this.game.history.filter((h)=>history.map(({id})=>id).includes(h.id));
        this.game.boards=base.boards.map((board)=>board.map((row)=>row.map((s)=>({...s}))));
        return this.round(data);
      }
    }
  }

  round(data:{id:string,jerk:number,acceleration:number,count:number,rounded:boolean,history:board[][]}):ReturnRequest[]|void{
  }
}
