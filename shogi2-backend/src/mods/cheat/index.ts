import {File, FileEvent, Game, ModBase, Request, ReturnRequest, StartEvent } from "shogi2-types";
import Betrayal from "./commands/betrayal";
import fs from "fs"
import PlaySound from "./commands/playsound";
import Highlight from "./commands/highlight";
import Move from "./commands/move";
import Rise from "./commands/rise";
import Down from "./commands/down";

export default class Cheat extends ModBase{
  type="cheat";
  constructor(game:Game){
    super(game);
    this.addCommands([Betrayal,PlaySound,Highlight,Move,Rise,Down]);
  }
  onStart(_e:StartEvent,_before:Game){
    const filedata:{name:string,type:string,id:string}[]=[
      {name:"src/mods/cheat/assets/the_world.wav",type:"audio/wav",id:"the_world"},
      {name:"src/mods/cheat/assets/effect1.png",type:"image/png",id:"effect1"},
      {name:"src/mods/cheat/assets/kinniku.jpg",type:"image/jpg",id:"kinniku"},
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
        owner:"cheat",
        target:undefined
      };
      return fileRequest
    });
    return [...requests];
  }
}
