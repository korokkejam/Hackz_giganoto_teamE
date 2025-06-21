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
type boardData={boards:board[],turn:"player1"|"player2",player1_current_board:number,player2_current_board:number};
type request={head:string,content:any,sender?:string};

export {board,pieceType,piece,square,room,boardData,request};
