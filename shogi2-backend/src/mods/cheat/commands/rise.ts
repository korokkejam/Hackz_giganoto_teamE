import { CommandBase, CommandEvent,Game, player, Request, ReturnRequest, WarpEvent } from "shogi2-types";

export default class Rise extends CommandBase{
  type="rise";
  constructor(game:Game){
    super(game);
  }
  execute(raw:CommandEvent,_before:Game):ReturnRequest[]|void{
    let z:number;
    if (raw.data.sender==="player1"){
      this.game.player1_current_board+=1;
      z=this.game.player1_current_board;
    }else{
      this.game.player2_current_board+=1;
      z=this.game.player2_current_board;
    }
    const event:WarpEvent={
      id:crypto.randomUUID(),
      type:"warp",
      data:{
        z
      }
    };
    const req:Request<WarpEvent>={
      head:"event",
      content:event
    };
    return [{request:req,owner:"cheat",target:raw.data.sender as player}];
  }
}
