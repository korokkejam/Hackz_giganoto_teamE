import { AnswerEvent, Board, BoardRequest, CaptureEvent, CaptureRequest, createBoard, DropEvent, EndEvent, EndRequest, Event, GameData, ModBase, MoveEvent, MoveRequest, Piece, Player, PlayerRequest, QuestionRequest, Request, RequestUpdater, SquareRequest, StartEvent, TurnRequest } from "shogi2-types";
import set_pieces from "./set_pieces";
import { cloneDeep } from "lodash";

export default class Base extends ModBase{
  questions:{id:string,keys:string[],piece:Piece}[];
  constructor(){
    super();
    this.questions=[];
  }
  onStart(d: GameData, _before: GameData, _event: StartEvent, _sender: Player, _updater: RequestUpdater): { r: Request[]; e: Event[]; } {
    const data=cloneDeep(d);
    const board:Board=createBoard(9,9);
    set_pieces(board);
    data.board=board;
    const request=new BoardRequest("both",board,"obedience");
    return {r:[request],e:[]};
  }
  onMove(d: GameData,_before:GameData, event: MoveEvent, _sender: Player,_updater:RequestUpdater){
    const data=cloneDeep(d);
    const events:Event[]=[];
    const square=data.board.squares.find((square)=>{
      return square.position.x===event.to.x && square.position.y===event.to.y
    });
    if (square?.piece){
      const piece2=square.piece;
      const event=new CaptureEvent(piece2);
      events.push(event);
    }
    const request1=new MoveRequest("both","exclude",event.piece,event.to);
    const turn=data.turn==="player1"?"player2":"player1"
    const request2=new TurnRequest("both","exclude",turn);
    request1.then=[request2];
    const requests:Request[]=[request1];
    if (((event.piece.player==="player1" && event.to.y < data.promotion_line) || (event.piece.player==="player2" && data.board.size.h-event.to.y-1 < data.promotion_line)) && event.piece.type.after_promotion){
      const request=new QuestionRequest(
        event.piece.player,
        "exclude",
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
  onAnswer(d: GameData,_before:GameData, event: AnswerEvent, _sender: Player, _updater:RequestUpdater){
    const data=cloneDeep(d);
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
  onDrop(d: GameData,_before:GameData, event: DropEvent, sender: Player, _updater:RequestUpdater){
    const data=cloneDeep(d);
    data.board.squares=data.board.squares.map((square)=>{
      if (square.position.x===event.square.position.x && square.position.y===event.square.position.y){
        return {...event.square,image:event.square.image ?? square.image};
      }
      return square;
    });
    if (sender==="player1"){
      data.player1.captured_pieces=data.player1.captured_pieces.filter((p)=>p.id!==event.square.piece?.id);
    }else{
      data.player2.captured_pieces=data.player2.captured_pieces.filter((p)=>p.id!==event.square.piece?.id);
    }
    data.turn=data.turn==="player1"?"player2":"player1";
    const request1=new SquareRequest("both","obedience",event.square);
    const request2=new TurnRequest("both","obedience",sender==="player1"?"player2":"player1");
    const request3=new PlayerRequest("both","obedience",sender==="player1"?data.player1:data.player2);
    request1.then=[request2,request3];
    return {r:[request1],e:[]};
  }
  onCapture(d: GameData,_before:GameData, event: CaptureEvent, sender: Player, _updater: RequestUpdater){
    const data=cloneDeep(d);
    if (sender==="player1"){
      data.player1.captured_pieces.push(event.piece);
    }else{
      data.player2.captured_pieces.push(event.piece);
    }
    if (event.piece.type.id==="king"){
      return {r:[],e:[new EndEvent(sender)]};
    }
    const request1=new CaptureRequest("both","obedience",data.player1.captured_pieces,data.player2.captured_pieces);
    const request2=new TurnRequest("both","obedience",sender==="player1"?"player2":"player1");
    request1.then=[request2];
    return {r:[request1],e:[]};
  }
  onEnd(_data: GameData,_before:GameData, _event: EndEvent, sender: Player, updater: RequestUpdater){
    updater.filter((r)=>r.type!=="question");
    return {r:[new EndRequest("both","obedience",sender)],e:[]};
  }
}
