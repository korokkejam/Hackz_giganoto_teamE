import { CommandBase, CommandEvent,Game, Piece, ReturnRequest } from "shogi2-types";

export default class Betrayal extends CommandBase{
  type="betrayal";
  constructor(game:Game){
    super(game);
  }
  execute(raw:CommandEvent,_before:Game):ReturnRequest[]|void{
    const [X,Y,Z]=raw.data.option;
    const x=Number(X);
    const y=Number(Y);
    const z=Number(Z);
    if ((!!x || x===0) && (!!y || y===0) && (!!z || z===0)){
      this.game.boards=this.game.boards.map((board,pz)=>board.map((row,py)=>row.map((s,px)=>{
        if (!!s.piece && px===x && py===y && pz===z){
          const piece:Piece={
            ...s.piece,
            owner:s.piece.owner==="player1"?"player2":"player1"
          };
          return {...s,piece};
        }else{
          return {...s};
        }
      })));
      return [
        {
          request:{
            head:"event",
            content:{
              type:"change_board",
              data:{
                boards:this.game.boards
              },
              id:crypto.randomUUID()
            }
          },
          owner:"cheat",
          target:undefined
        }
      ];
    }
  }
}
