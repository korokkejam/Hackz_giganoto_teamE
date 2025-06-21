import {WSContext} from "hono/ws";
import Data from "../game/board";

type room={ws:WSContext[],id:string,gamemode:"survival"|"creative",data:Data};
type pieceType={
  name:string,
  movable:{
    absolute:number[][],
    relative:number[][],
    func:string
  },
  jumpable:boolean,
};
type piece={player:"player1"|"player2",type:pieceType};
type square={piece:piece|null};
type board=square[][];
type boardData={boards:board[],turn:"player1"|"player2"};

export {board,pieceType,piece,square,room,boardData};
