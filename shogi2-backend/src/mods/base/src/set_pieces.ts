import { Board,Piece, PieceType, Player } from "shogi2-types";
import { pieces } from "./piece_generate";

export default function set_pieces(board:Board){
  board.squares=board.squares.map((square)=>{
    const {x,y}=square.position;
    const d=pieces.find((p)=>p.x===x && p.y===y);
    if (d){
      square.piece=generate({x:d.x,y:d.y},d.type,d.player);
    }
    return square;
  });
};

function generate(position:{x:number,y:number},type:PieceType,player:Player):Piece{
  return {
    position,
    type,
    id:crypto.randomUUID(),
    player
  };
}
