import { board, ChangeBoardEvent, File, FileEvent, Game, MoveEvent, Piece, Position, Request, ReturnRequest, StartEvent, UIEvent } from "shogi2-types";
import Base from "./base";
import fs from "fs";
import {down_button, rise_button, show_z} from "./d4c_ui";

export class D4C extends Base{
  constructor(game:Game){
    super(game);
  }
  onStart(_e:StartEvent,_before:Game){
    let d4c:{piece:Piece,pos:Position}|undefined;
    const board0:board=this.game.boards[0].map((row,y)=>row.map((s,x)=>{
      if (s.piece && s.piece?.type.id==="d4c"){
        d4c={piece:{...s.piece},pos:{x,y,z:0}};
      }
      if (s.piece?.type.king || s.piece?.type.id==="d4c"){
        return {...s,piece:null};
      }else{
        return {...s};
      }
    }));
    for (let i=0;i < 3;i++){
      let positions:Position[]=[];
      const board=board0.map((row,y)=>row.map((s,x)=>{
        if (s.piece){
          return {...s,piece:{...s.piece,type:{...s.piece.type,src:"piece_inversion",color:"white"}}};
        }else{
          const z=this.game.boards.length;
          positions.push({x,y,z});
          return {...s};
        }
      }));
      const pos=positions[Math.floor(Math.random()*(positions.length-1))];
      if (d4c){
        const another={...d4c.piece,type:{...d4c.piece.type,src:"piece_inversion",color:"white"}};
        board[pos.y][pos.x].piece=another;
      }
      this.game.boards.push(board);
    }
    this.game.history[0].boards=this.game.boards.map((board)=>board.map((row)=>row.map((s)=>{
      return {...s};
    })));
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
    const ui:UIEvent={
      type:"ui",
      id:crypto.randomUUID(),
      data:{
        menu1:[down_button],
        menu2:[rise_button,show_z]
      }
    };
    const request:Request<UIEvent>={
      head:"event",
      content:ui
    };
    const r:ReturnRequest={request,target:"player1",owner:"jojo"};
    return [...requests,r];
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
}
