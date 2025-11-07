import { GameData, Piece, Player } from "shogi2-types";
import destination_candidate from "./destination_candidate";

export default function draw_focused(rect:DOMRect,ctx:CanvasRenderingContext2D,focusedPiece:Piece|null,data:GameData,player:Player|null){
  if (!focusedPiece || !player){
    return;
  }
  const stepx=rect.width/data.board.size.w;
  const stepy=rect.height/data.board.size.h;
  const {x:X,y:Y}=focusedPiece.position;
  const x=player==="player1"?X:data.board.size.w-X-1;
  const y=player==="player1"?Y:data.board.size.h-Y-1;
  ctx.fillStyle="#00000077";
  ctx.fillRect(x*stepx,y*stepy,stepx,stepy);
  const candidate=destination_candidate(focusedPiece,player,data);
  const k=player==="player1"?1:-1;
  candidate.forEach(({x:vx,y:vy})=>{
    ctx.fillStyle="#00ff0077";
    ctx.fillRect((x+vx*k)*stepx,(y+vy*k)*stepy,stepx,stepy);
  });
};
