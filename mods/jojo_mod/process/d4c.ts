import { ChangeBoardEvent, Event, File, FileEvent, Game, MoveEvent, Piece, Position, Request, ReturnRequest, StartEvent, UIEvent } from "shogi2-types";
import Base from "./base";
import fs from "fs";
import {down_button, rise_button, show_z} from "./d4c_ui";

export default class D4C extends Base{
  constructor(game:Game){
    super(game);
  }
  onStart(_e:StartEvent,_before:Game){
    const pieces=this.game.boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>({piece:s.piece,pos:{x,y,z}})))).flat(2);
    const d4c=pieces.filter(({piece})=>piece?.type.id==="d4c");
    [...Array(3)].forEach(()=>{
      const board=this.game.boards[0].map((row)=>row.map((s)=>s.piece?s.piece.type.king?{...s,piece:null}:{...s,piece:{...s.piece,type:{...s.piece.type,color:"white",src:"piece_inversion"}}}:{...s}));
      d4c.forEach(({pos})=>{
        const empty=board.map((row,y)=>row.map((_,x)=>({x,y}))).flat().filter(({x,y})=>board[y][x].piece===null);
        const random_pos=empty[Math.floor(Math.random()*(empty.length-1))];
        board[random_pos.y][random_pos.x].piece={...board[pos.y][pos.x].piece} as Piece;
        board[pos.y][pos.x].piece=null;
      });
      this.game.boards.push(board);
    });
    this.game.history[0].boards=this.game.boards.map((board)=>board.map((row)=>row.map((s)=>({...s}))));
    const filedata:{name:string,type:string,id:string}[]=[
      {name:"src/mods/jojo_mod/assets/piece_inversion.png",type:"image/png",id:"piece_inversion"},
    ];
    const files:File[]=filedata.map((file)=>{
      return {
        content:fs.readFileSync(file.name).toString("base64"),
        mimetype:file.type,
        id:file.id
      };
    });
    const requests=files.map((file)=>{
      const e:FileEvent={
        type:"file",
        id:crypto.randomUUID(),
        data:file
      };
      const req:Request<FileEvent>={
        head:"event",
        content:e
      };
      const fileRequest:ReturnRequest={
        request:req,
        owner:"jojo",
        target:undefined
      };
      return fileRequest
    });
    const owners=this.game.boards[0].map((row)=>row.map((s)=>s.piece?.type.id==="d4c"?s.piece?.owner:undefined)).flat().filter((o)=>!!o);
    if (owners.length!==0){
      let rs=[];
      if (owners.includes("player1")){
        if (!this.game.ui1.menu1.map((ui)=>ui.id).includes(down_button.id)){
          this.game.ui1.menu1=[...this.game.ui1.menu1,down_button];
        }
        if (!this.game.ui1.menu2.map((ui)=>ui.id).includes(show_z.id)){
          this.game.ui1.menu2=[show_z,...this.game.ui1.menu2];
        }
        if (!this.game.ui1.menu2.map((ui)=>ui.id).includes(rise_button.id)){
          this.game.ui1.menu2=[rise_button,...this.game.ui1.menu2];
        }
        const ui1:UIEvent={
          type:"ui",
          id:crypto.randomUUID(),
          data:this.game.ui1
        };
        const request1:Request<UIEvent>={
          head:"event",
          content:ui1
        };
        const r:ReturnRequest={
          request:request1,
          target:"player1",
          owner:"jojo"
        };
        rs.push(r);
      }
      if (owners.includes("player2")){
        if (!this.game.ui2.menu1.map((ui)=>ui.id).includes(down_button.id)){
          this.game.ui2.menu1=[...this.game.ui2.menu1,down_button];
        }
        if (!this.game.ui2.menu2.map((ui)=>ui.id).includes(show_z.id)){
          this.game.ui2.menu2=[show_z,...this.game.ui2.menu2];
        }
        if (!this.game.ui2.menu2.map((ui)=>ui.id).includes(rise_button.id)){
          this.game.ui2.menu2=[rise_button,...this.game.ui2.menu2];
        }
        const ui2:UIEvent={
          type:"ui",
          id:crypto.randomUUID(),
          data:this.game.ui2
        };
        const request2:Request<UIEvent>={
          head:"event",
          content:ui2
        };
        const r:ReturnRequest={
          request:request2,
          target:"player2",
          owner:"jojo"
        };
        rs.push(r);
      }
      return [...requests,...rs];
    }
    return [...requests];
  }
  onMove(e:MoveEvent,before:Game){
    if (e.data.piece.type.id==="d4c"){
      const pos=e.data.after_pos;
      const piece:{piece:Piece,pos:Position}|undefined=this.game.boards.map((board,z)=>
        board.map((row,y)=>
          row.map((s,x)=>{
            if (s.piece && x===pos.x && y===pos.y && z!==pos.z){
              return {
                piece:{...s.piece},
                pos:{x,y,z}
              };
            }else{
              return null;
            }
          })
        )
      ).flat(2).filter((s)=>!!s).find((s)=>s.piece.type.id==="d4c" && s.piece.owner===e.data.piece.owner);
      if (piece){
        let requests:ReturnRequest[]=[];
        let flag:boolean=false;
        [...Array(3)].map((_,i)=>i-1).forEach((dx)=>{
          [...Array(3)].map((_,i)=>i-1).forEach((dy)=>{
            const x=piece.pos.x+dx;
            const y=piece.pos.y+dy;
            const z=piece.pos.z;
            if (this.game.boards[0][y] && this.game.boards[z][y]){
              if (this.game.boards[0][y][x] && this.game.boards[z][y][x]){
                if (!this.game.boards[0][y][x].piece){
                  const p=this.game.boards[z][y][x].piece;
                  if (p){
                    this.game.boards[0][y][x].piece={...p};
                    this.game.boards[z][y][x].piece=null;
                    flag=true;
                  }
                }
              }
            }
          });
        });
        if (flag){
          const empty:Position[]=this.game.boards.map((board)=>board.map((row,y)=>row.map((_,x)=>{
            return {x,y,z:piece.pos.z};
          }))).flat(2).filter((p)=>!this.game.boards[p.z][p.y][p.x].piece);
          const p=empty[Math.floor(Math.random()*(empty.length-1))];
          this.game.boards[piece.pos.z][piece.pos.y][piece.pos.x].piece=null;
          this.game.boards[p.z][p.y][p.x].piece=piece.piece;
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
          requests.push({request,target:undefined,owner:"jojo"});
        }
        return requests;
      }
    }else if (e.data.after_pos.z!==0){
      this.game.turn=before.turn;
      this.game.requests=this.game.requests.filter((request)=>{
        return request.request.content.type!=="turn";
      });
    }
  }
  onEvent(_e:Event,_before:Game){
    const board0=this.game.boards[0];
    const pieces=board0.map((row,y)=>row.map((s,x)=>{
      if (s.piece){
        return {pos:{x,y},id:s.piece.id};
      }else{
        return undefined;
      }
    })).flat().filter((p)=>!!p);
    let flag=false;
    pieces.forEach(({pos,id})=>{
      const p=pieces.find((p)=>p.id===id && p.pos.x!==pos.x && p.pos.y!==pos.y);
      if (p){
        const dx=Math.abs(pos.x-p.pos.x);
        const dy=Math.abs(pos.y-p.pos.y);
        if (dx <= 1 && dy <= 1){
          this.game.boards[0][pos.y][pos.x].piece=null;
          this.game.boards[0][p.pos.y][p.pos.x].piece=null;
          flag=true;
        }
      }
    });
    if (flag){
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
