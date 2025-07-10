import { ChangeBoardEvent, CommandBase, CommandEvent,Effect,Game, Request, ReturnRequest } from "shogi2-types";

export default class Highlight extends CommandBase{
  type="highlight";
  constructor(game:Game){
    super(game);
  }
  execute(raw:CommandEvent,_before:Game):ReturnRequest[]|void{
    const [X,Y,Z,id]=raw.data.option;
    const x=Number(X);
    const y=Number(Y);
    const z=Number(Z);
    this.game.boards=this.game.boards.map((board,pz)=>board.map((row,py)=>row.map((s,px)=>{
      if (px===x && py===y && pz===z){
        const effect:Effect={
          src:id,
        };
        return {...s,effect};
      }else{
        return {...s};
      }
    })));
    const change_board:ChangeBoardEvent={
      data:{boards:this.game.boards},
      type:"change_board",
      id:crypto.randomUUID()
    };
    const req:Request<ChangeBoardEvent>={
      head:"event",
      content:change_board
    };
    const returnrequest:ReturnRequest={
      request:req,
      target:undefined,
      owner:"cheat"
    };
    return [returnrequest];
  }
}
