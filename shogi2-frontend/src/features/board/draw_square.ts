import { GameData, Piece, Player, Square } from "shogi2-types";
import piece_image from "../../assets/piece.png";

export const image=new Image();
image.src=piece_image;

export function draw_square(ctx:CanvasRenderingContext2D,square:Square,rect:DOMRect,data:GameData,player:Player){
  if (square.piece!==null){
    draw_piece(ctx,square.piece,rect,data,player);
  }
  if (square.image!==undefined){
  }
}

export function draw_piece(ctx:CanvasRenderingContext2D,piece:Piece,rect:DOMRect,data:GameData,player:Player,decimal:boolean=false){
  const stepx=rect.width/data.board.size.w;
  const stepy=rect.height/data.board.size.h;
  const x=player==="player1"?piece.position.x:data.board.size.w-piece.position.x-1;
  const y=player==="player1"?piece.position.y:data.board.size.h-piece.position.y-1;
  const centerX=x*stepx+stepx/2;
  const centerY=y*stepy+stepy/2;
  if (player===piece.player){
    ctx.drawImage(image,x*stepx,y*stepy,stepx,stepy);
  }else{
    ctx.save();
    ctx.translate(centerX,centerY);
    ctx.rotate(Math.PI);
    ctx.drawImage(image,-stepx/2,-stepy/2,stepx,stepy);
    ctx.restore();
  }
  ctx.font="30px ktegaki";
  const name=[...piece.type.name];
  let height_sum=0;
  let width=0;
  name.forEach((c)=>{
    const metrics=ctx.measureText(c);
    const w=metrics.width;
    if (width < w){
      width=w;
    }
    const height=metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent;
    height_sum+=height;
  });
  ctx.fillStyle="black";
  ctx.fillText(piece.type.name,centerX-width/2,centerY+height_sum/2,width);
}
