import { Game, Piece } from "shogi2-types";
import {pieces} from "./pieces";

export default function replace(game:Game){
  game.boards=game.boards.map((board)=>board.map((row)=>row.map((s)=>({...s,piece:converter(s.piece)}))));
  game.pieces=game.pieces.map((p)=>{
    const p2=pieces.find((pt)=>pt.id===p.id);
    if (p2){
      return p2;
    }
    return p;
  });
  return game;
}

function converter(piece:Piece|null):Piece|null{
  if (piece){
    const type=pieces.find((p)=>p.id===piece.type.id);
    if (type){
      return {...piece,type};
    }
  }
  return piece;
}
