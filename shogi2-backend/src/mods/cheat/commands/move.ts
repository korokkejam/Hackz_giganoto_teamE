import { ChangeBoardEvent, CommandBase, CommandEvent, Game, Request } from "shogi2-types";

export default class Move extends CommandBase{
  type="move";
  constructor(game:Game){
    super(game);
  }
  execute(raw:CommandEvent,_before:Game){
    const [X1,Y1,Z1,X2,Y2,Z2]=raw.data.option;
    const x1=Number(X1);
    const y1=Number(Y1);
    const z1=Number(Z1);
    const x2=Number(X2);
    const y2=Number(Y2);
    const z2=Number(Z2);
    if (this.game.boards[z1]?.[y1]?.[x1] && this.game.boards[z2]?.[y2]?.[x2]){
      const s1={...this.game.boards[z1][y1][x1]};
      const s2={...this.game.boards[z2][y2][x2]};
      this.game.boards[z1][y1][x1]=s2;
      this.game.boards[z2][y2][x2]=s1;
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
      return [{request,target:undefined,owner:"cheat"}];
    }
  }
}
