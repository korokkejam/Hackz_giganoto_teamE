import { AudioEvent, CommandBase, CommandEvent,Game, Request, ReturnRequest } from "shogi2-types";

export default class PlaySound extends CommandBase{
  type="playsound";
  constructor(game:Game){
    super(game);
  }
  execute(raw:CommandEvent,_before:Game):ReturnRequest[]|void{
    const [id]=raw.data.option;
    const event:AudioEvent={
      id:crypto.randomUUID(),
      type:"audio",
      data:{
        id
      }
    };
    const req:Request<AudioEvent>={
      head:"event",
      content:event
    };
    return [{request:req,owner:"cheat",target:undefined}];
  }
}
