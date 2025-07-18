import {
  ChangeBoardEvent,
  File,
  FileEvent,
  Game,
  ModBase,
  PieceType,
  Request,
  ReservationEvent,
  ReturnRequest,
  StartEvent,
  UIEvent
} from "shogi2-types";
import fs from "fs";
import { config_button } from "./ui/config_button";
import { config_window } from "./ui/config_window";

export default class Upgrade extends ModBase{
  type="upgrade";
  filedata:{name:string,type:string,id:string}[];
  constructor(game:Game){
    super(game);
    this.filedata=[
      {name:"src/mods/upgrade/assets/enchanted.gif",type:"image/gif",id:"enchanted"},
    ];
  }
  onStart(_e:StartEvent,_before:Game){
    console.log("upgrade mod loaded!");
    const files:File[]=this.filedata.map((file)=>{
      return {
        content:fs.readFileSync(file.name).toString("base64"),
        mimetype:file.type,
        id:file.id
      };
    });
    const req=files.map((file)=>{
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
        owner:"upgrade",
        target:undefined
      };
      return fileRequest
    });
    this.game.boards=this.game.boards.map((board)=>board.map((row)=>row.map((s)=>{
      if (s.piece){
        return {
          ...s,
          piece:{
            ...s.piece,
            type:{
              ...s.piece.type,
              promotion:this.enchant(s.piece.type.promotion),
            }
          }
        };
      }else{
        return s;
      }
    })));
    const change:ChangeBoardEvent={
      type:"change_board",
      id:crypto.randomUUID(),
      data:{
        boards:this.game.boards
      }
    };
    const req2:ReturnRequest={
      request:{
        head:"event",
        content:change
      },
      target:undefined,
      owner:"upgrade"
    };
    if (this.game.ui1.menu2.find((ui)=>ui.id==="config_button")===undefined){
      this.game.ui1.menu2.push(config_button(this.game.mods));
    }
    if (this.game.ui2.menu2.find((ui)=>ui.id==="config_button")===undefined){
      this.game.ui2.menu2.push(config_button(this.game.mods));
    }
    const ui1:UIEvent={
      type:"ui",
      id:crypto.randomUUID(),
      data:this.game.ui1
    };
    const request1:ReturnRequest={
      request:{
        head:"event",
        content:ui1
      },
      target:"player1",
      owner:"upgrade"
    };
    const ui2:UIEvent={
      type:"ui",
      id:crypto.randomUUID(),
      data:this.game.ui2
    };
    const request2:ReturnRequest={
      request:{
        head:"event",
        content:ui2
      },
      target:"player2",
      owner:"upgrade"
    };
    return [...req,req2,request1,request2];
  }
  enchant(type:PieceType|undefined):PieceType|undefined{
    if (type){
      return {
        ...type,
        src:"enchanted",
        promotion:this.enchant(type.promotion)
      };
    }else{
      return type;
    }
  }
  onReservation(e:ReservationEvent,_before:Game){
    const id=e.data.id;
    if (id==="config_open_player1"){
      this.game.ui1.foreground=config_window(this.game.mods);
      const ui:UIEvent={
        type:"ui",
        id:crypto.randomUUID(),
        data:this.game.ui1
      };
      const request:Request<UIEvent>={
        head:"event",
        content:ui
      };
      const r:ReturnRequest={request,target:"player1",owner:"upgrade"};
      return [r];
    }else if (id==="config_open_player2"){
      this.game.ui2.foreground=config_window(this.game.mods);
      const ui:UIEvent={
        type:"ui",
        id:crypto.randomUUID(),
        data:this.game.ui2
      };
      const request:Request<UIEvent>={
        head:"event",
        content:ui
      };
      const r:ReturnRequest={request,target:"player2",owner:"upgrade"};
      return [r];
    }else if (id==="config_close_player1"){
      this.game.ui1.foreground=undefined;
      const ui:UIEvent={
        type:"ui",
        id:crypto.randomUUID(),
        data:this.game.ui1
      };
      const request:Request<UIEvent>={
        head:"event",
        content:ui
      };
      const r:ReturnRequest={request,target:"player1",owner:"upgrade"};
      return [r];
    }else if (id==="config_close_player2"){
      this.game.ui2.foreground=undefined;
      const ui:UIEvent={
        type:"ui",
        id:crypto.randomUUID(),
        data:this.game.ui2
      };
      const request:Request<UIEvent>={
        head:"event",
        content:ui
      };
      const r:ReturnRequest={request,target:"player2",owner:"upgrade"};
      return [r];
    }
  }
}
