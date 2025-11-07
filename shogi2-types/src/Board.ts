import { Pos } from ".";
import {Piece} from "./Piece";

export interface Board{
  squares:Square[];
  size:{w:number,h:number};
};

export interface Square{
  position:Pos;
  piece:Piece|null;
  image:string|undefined;
};

export function createSquare(x:number,y:number):Square{
  return {
    position:{x,y},
    piece:null,
    image:undefined
  };
};

export function createBoard(w:number,h:number):Board{
  const squares:Square[]=[];
  for (let x=0;x < w;x++){
    for (let y=0;y < h;y++){
      const square=createSquare(x,y);
      squares.push(square);
    }
  }
  return {squares,size:{w,h}};
}
