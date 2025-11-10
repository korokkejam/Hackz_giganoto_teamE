import { GameData, Piece, Player, Pos } from "shogi2-types";
import draw_background from "./draw_background";
import {draw_piece, draw_square} from "./draw_square";
import draw_pointer from "./draw_pointer";
import draw_focused from "./draw_focused";

export default function draw_board(
  canvas:HTMLCanvasElement,
  ctx:CanvasRenderingContext2D,
  data:GameData,
  player:Player,
  mousePos:Pos|null,
  focusedPiece:Piece|null,
  selectedPiece:Piece|null
){
  draw_background(canvas,ctx,data);
  const rect=canvas.getBoundingClientRect();
  data.board.squares.forEach((square)=>{
    draw_square(ctx,square,rect,data,player);
  });
  draw_pointer(rect,data,mousePos,player,ctx);
  if (selectedPiece){
    draw_piece(ctx,selectedPiece,rect,data,player);
  }
  draw_focused(rect,ctx,focusedPiece,data,player);
}
