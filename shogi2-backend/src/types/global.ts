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
  promotion:pieceType|undefined,
  promotion_callback:string,
  promotion_msg:string[]
};
type piece={player:"player1"|"player2",type:pieceType};
type square={piece:piece|null};
type board=square[][];
type boardData={
  boards:board[],
  turn:"player1"|"player2",
  player1_current_board:number,
  player2_current_board:number,
  player1_point:number,
  player2_point:number,
  player1_redbull:number,
  player2_redbull:number,
};
type request={head:string,content:any,sender?:string};

export {board,pieceType,piece,square,room,boardData,request};
