import { GameData, Piece, Player, Pos } from "shogi2-types";
import draw_board from "./draw_board";
import {draw_piece} from "./draw_square";

export default function animation(
  piece:Piece,
  to:Pos,
  callback:()=>void,
  ctx:CanvasRenderingContext2D,
  canvas:HTMLCanvasElement,
  data:GameData,
  player:Player,
  mousePos:Pos|null
){
  const rect=canvas.getBoundingClientRect();
  const animation=piece.type.animation;
  const dt=animation.seconds/100;
  setTimeout(()=>divided_callback(dt,piece,to,0,callback,ctx,canvas,data,player,rect,mousePos),dt*1000);
};

function divided_callback(
  dt:number,
  piece:Piece,
  to:Pos,
  count:number,
  callback:()=>void,
  ctx:CanvasRenderingContext2D,
  canvas:HTMLCanvasElement,
  data:GameData,
  player:Player,
  rect:DOMRect,
  mousePos:Pos|null
){
  const {x:x1,y:y1}=piece.position;
  const {x:x2,y:y2}=to;
  const dx=(x2-x1)/100*count
  const dy=(y2-y1)/100*count;
  const moving_piece:Piece={
    ...piece,
    position:{x:piece.position.x+dx,y:piece.position.y+dy}
  };
  ctx.clearRect(0,0,rect.width,rect.height);
  draw_board(canvas,ctx,data,player,mousePos,null);
  draw_piece(ctx,moving_piece,rect,data,player);
  if (count < 100){
    setTimeout(()=>divided_callback(dt,piece,to,count+1,callback,ctx,canvas,data,player,rect,mousePos),dt*1000);
  }else{
    callback();
  }
}
