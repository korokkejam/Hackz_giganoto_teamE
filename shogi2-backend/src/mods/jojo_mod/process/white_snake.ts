import { AudioEvent, ChangeBoardEvent, ChatEvent, Effect, File, FileEvent, Game, MoveEvent, player, Position, PromotionCheckEvent, Request, ReturnRequest, StartEvent } from "shogi2-types";
import Base from "./base";
import fs from "fs";

const fourteen_words=[
  "a"
  // "秘密の皇帝",
  // "特異点",
  // "カブト虫",
  // "紫陽花",
  // "天使",
  // "ジョット",
  // "特異点",
  // "カブト虫",
  // "ドロローサへの道",
  // "カブト虫",
  // "イチジクのタルト",
  // "廃墟の街",
  // "カブト虫",
  // "らせん階段"
];

export default class WhiteSnake extends Base{
  position1:Position|undefined;
  position2:Position|undefined;
  constructor(game:Game){
    super(game);
    this.position1=undefined;
    this.position2=undefined;
  }
  onStart(_e:StartEvent,_before:Game){
    const filedata:{name:string,type:string,id:string}[]=[
      {name:"src/mods/jojo_mod/assets/effect1.png",type:"image/png",id:"effect1"},
      {name:"src/mods/jojo_mod/assets/position.wav",type:"audio/wav",id:"position"}
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
    return [...requests];
  }
  onMessage(e:ChatEvent,_before:Game){
    if (e.data.msg===fourteen_words[0]){
      const messages=this.game.messages.filter((message)=>message.sender===e.data.sender).map((message)=>message.msg)
        .filter((msg)=>fourteen_words.includes(msg)).reverse();
      let flag=true;
      for (let i = 0;i < fourteen_words.length;i++){
        if (messages[i]!==fourteen_words[i]){
          flag=false;
        }
      }
      const piece=this.game.boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>{
        if (s.piece){
          return {
            piece:s.piece,
            pos:{x,y,z}
          };
        }else{
          return null;
        }
      }))).flat(2).filter((p)=>!!p).find((p)=>{
        let green_baby=false;
        for (let x=p.pos.x-1;x < p.pos.x+2;x++){
          for (let y=p.pos.y-1;y < p.pos.y+2;y++){
            if (this.game.boards[p.pos.z][y]?.[x]?.piece?.type.id==="green_baby"){
              green_baby=true;
            }
          }
        }
        return p.piece.type.id==="white_snake" && p.piece.owner===(e.data.sender as player) && green_baby;
      });
      if (flag && piece){ // 14の言葉を検知
        const check:PromotionCheckEvent={
          type:"promotion_check",
          data:{
            answer:false,
            piece:piece.piece,
            pos:piece.pos
          },
          id:crypto.randomUUID()
        };
        const request:Request<PromotionCheckEvent>={head:"event",content:check};
        const r:ReturnRequest={request,owner:"jojo",target:e.data.sender as player};
        return [r];
      }
    }
  }
  onPromotionCheck(e:PromotionCheckEvent,_before:Game){
    if (e.data.answer){
      if (e.data.piece.type.id==="white_snake"){
        this.game.boards=this.game.boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>{
          if (e.data.pos.z===z && Math.abs(e.data.pos.y-y)<=1 && Math.abs(e.data.pos.x-x)<=1 && s.piece?.type.id==="green_baby"){
            return {...s,piece:null};
          }else{
            return {...s};
          }
        })));
        const player=e.data.piece.owner;
        let pos:Position;
        if (player==="player1"){
          this.position1={
            x:Math.floor(Math.random()*this.game.boards[e.data.pos.z].length),
            y:Math.floor(Math.random()*3),
            z:e.data.pos.z
          };
          pos=this.position1;
        }else{
          this.position2={
            x:Math.floor(Math.random()*this.game.boards[e.data.pos.z].length),
            y:this.game.boards[e.data.pos.z].length-1-Math.floor(Math.random()*3),
            z:e.data.pos.z
          };
          pos=this.position2;
        }
        this.game.boards=this.game.boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>{
          if (pos.x===x && pos.y===y && pos.z===z){
            const effect:Effect={
              src:"effect1"
            };
            return {...s,effect};
          }else{
            return {...s};
          }
        })));
        const change_boards:ChangeBoardEvent={
          type:"change_board",
          id:crypto.randomUUID(),
          data:{
            boards:this.game.boards
          }
        };
        const request:Request<ChangeBoardEvent>={
          head:"event",
          content:change_boards
        };
        return [{request,owner:"jojo",target:undefined}];
      }else if (e.data.piece.type.id==="c-moon"){
        if (e.data.piece.owner==="player1" && this.position1){
          const square=this.game.boards[this.position1.z][this.position1.y][this.position1.x];
          this.game.boards[this.position1.z][this.position1.y][this.position1.x]={piece:square.piece};
        }else if (this.position2){
          const square=this.game.boards[this.position2.z][this.position2.y][this.position2.x];
          this.game.boards[this.position2.z][this.position2.y][this.position2.x]={piece:square.piece};
        }
        const change:ChangeBoardEvent={
          type:"change_board",
          id:crypto.randomUUID(),
          data:{
            boards:this.game.boards
          }
        }
        const req:Request<ChangeBoardEvent>={
          head:"event",
          content:change
        };

        const event:AudioEvent={
          id:crypto.randomUUID(),
          type:"audio",
          data:{
            id:"position"
          }
        };
        const req2:Request<AudioEvent>={
          head:"event",
          content:event
        };

        return [{request:req,owner:"jojo",target:undefined},{request:req2,owner:"jojo",target:undefined}];
      }
    }
  }
  onMove(e:MoveEvent,_before:Game){
    if (e.data.piece.type.id==="c-moon"){
      const pos:Position={
        x:e.data.after_pos.x,
        y:e.data.after_pos.y,
        z:e.data.after_pos.z
      };
      let flag=false;
      if (pos.x===this.position1?.x && pos.y===this.position1.y && pos.z===this.position1.z){
        flag=true;
      }else if (pos.x===this.position2?.x && pos.y===this.position2.y && pos.z===this.position2.z){
        flag=true;
      }
      if (flag){
        const check:PromotionCheckEvent={
          type:"promotion_check",
          data:{
            answer:false,
            piece:e.data.piece,
            pos
          },
          id:crypto.randomUUID()
        };
        const request:Request<PromotionCheckEvent>={head:"event",content:check};
        const r:ReturnRequest={request,owner:"jojo",target:e.data.piece.owner};
        return [r];
      }
    }
  }
}
