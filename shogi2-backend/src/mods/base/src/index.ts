import { AnswerEvent, Board, BoardRequest, createBoard, Event, GameData, ModBase, MoveEvent, MoveRequest, Piece, Player, QuestionRequest, Request, SquareRequest, StartEvent, TurnRequest } from "shogi2-types";
import set_pieces from "./set_pieces";

export default class Base extends ModBase{
  questions:{id:string,keys:string[],piece:Piece}[];
  constructor(){
    super();
    this.questions=[];
  }
  onStart(data: GameData, _event: StartEvent, _sender: Player,_requests:Request[]) {
    const board:Board=createBoard(9,9);
    data.board=board;
    set_pieces(board);
    const request=new BoardRequest("both",board,"obedience");
    return {r:[request],e:[]};
  }
  onMove(data: GameData, event: MoveEvent, _sender: Player,_requests:Request[]) {
    const p1=event.piece.position;
    const p2=event.to;
    const piece=event.piece;
    data.board.squares=data.board.squares.map((square)=>{
      const p=square.position;
      if (p.x===p1.x && p.y===p1.y){
        square.piece=null;
      }else if (p.x===p2.x && p.y===p2.y){
        square.piece={...piece,position:p2};
      }
      return square;
    });
    const request1=new MoveRequest("both","obedience",event.piece,event.to);
    data.turn=data.turn==="player1"?"player2":"player1";
    const request2=new TurnRequest("both","obedience",data.turn,piece.type.animation.seconds*1.5);
    const requests:Request[]=[request1,request2];
    const events:Event[]=[];
    if (((event.piece.player==="player1" && event.to.y < data.promotion_line) || (event.piece.player==="player2" && data.board.size.h-event.to.y-1 < data.promotion_line)) && event.piece.type.after_promotion){
      const request=new QuestionRequest(
        event.piece.player,
        "obedience",
        "成る？",
        [
          {display:"はい",key:"yes"},
          {display:"いいえ",key:"no"}
        ]
      );
      requests.push(request);
      const piece={...event.piece,position:event.to};
      this.questions.push({id:request.id,keys:request.choices.map((choice)=>choice.key),piece});
    }
    return {r:requests,e:events};
  }
  onAnswer(data: GameData, event: AnswerEvent, _sender: Player, _registered_requests: Request[]): { r: Request[]; e: Event[]; } {
    const question=this.questions.find((question)=>question.id===event.id);
    const requests:Request[]=[];
    const events:Event[]=[];
    if (question){
      if (event.key==="yes"){
        const {x,y}=question.piece.position;
        data.board.squares=data.board.squares.map((square)=>{
          if (square.position.x===x && square.position.y===y){
            if (square.piece?.type.after_promotion){
              square.piece.type=square.piece.type.after_promotion;
              const request=new SquareRequest("both","obedience",square);
              requests.push(request);
            }
          }
          return square;
        });
      }
    }
    return {r:requests,e:events};
  }
}
