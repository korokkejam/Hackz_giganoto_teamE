import { GameData, Piece, Player, Square } from "shogi2-types";
import piece_image from "../../assets/piece.png";

export const image=new Image();
image.src=piece_image;

export function draw_square(
  ctx:CanvasRenderingContext2D,
  square:Square,
  rect:DOMRect,
  data:GameData,
  player:Player,
  images:{content:HTMLImageElement,name:string}[]
){
  if (square.piece!==null){
    draw_piece(ctx,square.piece,rect,data,player);
  }
  if (square.image){
    const image=images.find(({name})=>name===square.image)?.content;
    if (!image){
      return;
    }
    const stepx=rect.width/data.board.size.w;
    const stepy=rect.height/data.board.size.h;
    const x=player==="player1"?square.position.x:data.board.size.w-square.position.x-1;
    const y=player==="player1"?square.position.y:data.board.size.h-square.position.y-1;
    ctx.drawImage(image,x*stepx,y*stepy,stepx,stepy);
  }
}

export function draw_piece(ctx:CanvasRenderingContext2D,piece:Piece,rect:DOMRect,data:GameData,player:Player){
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
  const name=[...piece.type.name].reverse();
  let height_sum=0;
  let width_max=0;
  let height_max=0;
  name.forEach((c)=>{
    const metrics=ctx.measureText(c);
    const w=metrics.width;
    const h=metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent;
    if (width_max < w){
      width_max=w;
    }
    if (height_max < h){
      height_max=h;
    }
    height_sum+=h;
  });
  ctx.fillStyle="black";
  for (let i=0;i < name.length;i++){
    ctx.fillText(
      name[i],
      centerX-width_max/2,
      centerY+height_sum/2-height_max*i
    );
  }
}
