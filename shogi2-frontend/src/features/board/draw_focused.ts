import { GameData, Piece, Player } from "shogi2-types";
import destination_candidate from "./destination_candidate";

export default function draw_focused(rect:DOMRect,ctx:CanvasRenderingContext2D,focusedPiece:Piece|null,data:GameData,player:Player|null){
  if (!focusedPiece || !player){
    return;
  }
  const stepx=rect.width/data.board.size.w;
  const stepy=rect.height/data.board.size.h;
  const {x,y}=focusedPiece.position;
  ctx.fillStyle="#00000077";
  ctx.fillRect(x*stepx,y*stepy,stepx,stepy);
  const candidate=destination_candidate(focusedPiece,player,data);
  candidate.forEach(({x:vx,y:vy})=>{
    ctx.fillStyle="#00ff0077";
    ctx.fillRect((x+vx)*stepx,(y+vy)*stepy,stepx,stepy);
  });
};
