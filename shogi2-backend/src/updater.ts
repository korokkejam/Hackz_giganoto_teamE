import { BoardRequest, CaptureRequest, GameData, MoveRequest, PlayerRequest, Request, SquareRequest, TurnRequest } from "shogi2-types";
import { cmp_pos } from "./utils";

export default function gamedata_update(data:GameData,request:Request){
  const type=request.type;
  switch (type){
    case "turn":
      {
        const r=request as TurnRequest;
        const turn=r.player;
        data.turn=turn;
      }
      break;
    case "chat":
      //未実装
      break;
    case "move":
      {
        const r=request as MoveRequest;
        const piece=r.piece;
        const p1=piece.position;
        const p2=r.position2;
        data.board.squares=data.board.squares.map((square)=>{
          if (cmp_pos(square.position,p1)){
            return {...square,piece:null};
          }else if (cmp_pos(square.position,p2)){
            return {...square,piece:{...piece,position:p2}};
          }
          return square;
        });
      }
      break;
    case "board":
      {
        const r=request as BoardRequest;
        const board=r.board;
        data.board=board;
      }
      break;
    case "square":
      {
        const r=request as SquareRequest;
        const square=r.square;
        data.board.squares=data.board.squares.map((s)=>{
          if (cmp_pos(s.position,square.position)){
            return square;
          }
          return s;
        });
      }
      break;
    case "player":
      {
        const r=request as PlayerRequest;
        const player=r.data.player;
        if (player==="player1"){
          data.player1=r.data;
        }else{
          data.player2=r.data;
        }
      }
      break;
    case "capture":
      {
        const r=request as CaptureRequest;
        data.player1.captured_pieces=r.player1_pieces;
        data.player2.captured_pieces=r.player2_pieces;
      }
      break;
    case "audio":
    case "end":
    case "file":
    case "start":
    case "question":
    case "ui":
      break;
  }
  request.then.forEach((request)=>{
    gamedata_update(data,request);
  });
}
