import { GameData, Piece, Player } from "shogi2-types";
import draw_background from "./draw_background";
import {draw_square} from "./draw_square";
import draw_pointer from "./draw_pointer";
import draw_focused from "./draw_focused";

export default function draw_board(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,data:GameData,player:Player,mousePos:{x:number,y:number}|null,focusedPiece:Piece|null){
  draw_background(canvas,ctx,data);
  const rect=canvas.getBoundingClientRect();
  data.board.squares.forEach((square)=>{
    draw_square(ctx,square,rect,data,player);
  });
  draw_pointer(rect,data,mousePos,player,ctx);
  draw_focused(rect,ctx,focusedPiece,data,player);
}
