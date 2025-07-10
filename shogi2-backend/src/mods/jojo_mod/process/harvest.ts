import { CaptureEvent, EndEvent, Game, MoveEvent, MoveEventType, Request } from "shogi2-types";
import Base from "./base";

export default class Harvest extends Base{
  constructor(game:Game){
    super(game);
  }
  onMove(e:MoveEvent,_before:Game){
    if (e.data.piece.type.id==="harvest"){
      const z=e.data.before_pos.z;
      let pieces:MoveEventType[]=this.game.boards[z].map((row,y)=>row.map((s,x)=>{
        if (s.piece){
          return {
            piece:s.piece,
            pos:{x,y,z},
          };
        }else{
          return null;
        }
      })).flat().filter((v)=>!!v).filter(({piece,pos})=>{
        const y=pos.y+(e.data.piece.owner==="player1"?-1:1);
        if (0<=y && y < this.game.boards[pos.z].length){
          const next=this.game.boards[pos.z][y]?.[pos.x];
          return piece?.type.id==="harvest" && next.piece?.owner!==piece.owner && piece.owner===e.data.piece.owner;
        }else{
          return false;
        }
      }).map(({piece,pos})=>{
        const event:MoveEventType={
          piece,
          before_pos:{...pos},
          after_pos:{x:pos.x,y:pos.y+(e.data.piece.owner==="player1"?-1:1),z:pos.z}
        };
        return event;
      });
      for (let i=0;i < pieces.length;i++){
        const p1=pieces[i];
        const j=Math.floor(Math.random()*(pieces.length-1));
        const p2=pieces[j];
        pieces[j]=p1;
        pieces[i]=p2;
      }
      const p1=pieces[0];
      const p2=pieces[1];
      const p3=pieces[2];
      let p:MoveEventType[]=[];
      if (p1) p.push(p1);
      if (p2) p.push(p2);
      if (p3) p.push(p3);
      p.forEach((e)=>{
        let end_flag=false;
        const piece1=e.piece;
        const piece2=this.game.boards[e.after_pos.z][e.after_pos.y][e.after_pos.x].piece;
        const s1=this.game.boards[e.after_pos.z][e.after_pos.y][e.after_pos.x];
        const s2=this.game.boards[e.before_pos.z][e.before_pos.y][e.before_pos.x];
        this.game.boards[e.after_pos.z][e.after_pos.y][e.after_pos.x]={...s1,piece:piece1};
        this.game.boards[e.before_pos.z][e.before_pos.y][e.before_pos.x]={...s2,piece:null};
        if (piece2){ //piece2が取られた時
          const capture:CaptureEvent={
            type:"capture",
            id:crypto.randomUUID(),
            data:{ piece1, piece2, pos1:{...e.before_pos}, pos2:{...e.after_pos} }
          };
          if (piece2.type.king){
            const end:EndEvent={type:"end",data:{winner:piece1.owner},id:crypto.randomUUID()};
            const req:Request<EndEvent>={head:"event",content:end};
            this.game.requests.push({request:req,owner:"main",target:undefined});
            end_flag=true;
          }
          if (e.piece.owner==="player1"){
            this.game.player1_storage.push(piece2);
          }else{
            this.game.player2_storage.push(piece2);
          }
          const req:Request<CaptureEvent>={head:"event",content:capture,sender:e.piece.owner};
          this.game.requests.push({request:req,target:undefined,owner:"main"});
        }
        const req:Request<MoveEvent>={head:"event",content:{ type:"move", id:crypto.randomUUID(), data:e }};
        this.game.requests.push({request:req,target:undefined,owner:"jojo"});
      });
      return [];
    }
  }
}
