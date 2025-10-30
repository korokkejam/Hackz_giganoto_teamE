import { GameData } from "shogi2-types";

export default function draw_background(canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,data:GameData){
  const rect=canvas.getBoundingClientRect();
  const width=rect.width;
  const height=rect.height;
  const stepx=width/data.board.size.w;
  const stepy=height/data.board.size.h;
  ctx.strokeStyle="black";
  const lineWidth=3;
  ctx.lineWidth=lineWidth;
  ctx.beginPath();
  ctx.moveTo(lineWidth/2,lineWidth/2);
  ctx.lineTo(width-lineWidth/2,lineWidth/2);
  ctx.lineTo(width-lineWidth/2,height-lineWidth/2);
  ctx.lineTo(lineWidth/2,height-lineWidth/2);
  ctx.lineTo(lineWidth/2,lineWidth/2);
  ctx.stroke();
  for (let x=0;x < width+stepx;x+=stepx){
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,height);
    ctx.stroke();
  }
  for (let y=0;y < height+stepy;y+=stepy){
    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(width,y);
    ctx.stroke();
  }
}
