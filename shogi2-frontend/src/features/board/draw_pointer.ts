import { GameData, Player } from "shogi2-types";

export default function draw_pointer(rect:DOMRect,data:GameData,mousePos:{x:number,y:number}|null,player:Player,ctx:CanvasRenderingContext2D){
  if (player!==data.turn){
    return;
  }
  const stepx=rect.width/data.board.size.w;
  const stepy=rect.height/data.board.size.h;
  const x=Math.floor((mousePos?.x ?? 0)/stepx);
  const y=Math.floor((mousePos?.y ?? 0)/stepy);
  const centerX=x*stepx+stepx/2;
  const centerY=y*stepy+stepy/2;
  ctx.strokeStyle="black";
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(centerX-stepx*0.4,centerY-stepy*0.2);
  ctx.lineTo(centerX-stepx*0.4,centerY-stepy*0.4);
  ctx.lineTo(centerX-stepx*0.2,centerY-stepy*0.4);
  ctx.moveTo(centerX-stepx*0.4,centerY+stepy*0.2);
  ctx.lineTo(centerX-stepx*0.4,centerY+stepy*0.4);
  ctx.lineTo(centerX-stepx*0.2,centerY+stepy*0.4);
  ctx.moveTo(centerX+stepx*0.4,centerY-stepy*0.2);
  ctx.lineTo(centerX+stepx*0.4,centerY-stepy*0.4);
  ctx.lineTo(centerX+stepx*0.2,centerY-stepy*0.4);
  ctx.moveTo(centerX+stepx*0.4,centerY+stepy*0.2);
  ctx.lineTo(centerX+stepx*0.4,centerY+stepy*0.4);
  ctx.lineTo(centerX+stepx*0.2,centerY+stepy*0.4);
  ctx.stroke();
};
