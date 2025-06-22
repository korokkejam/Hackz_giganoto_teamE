import {WSContext} from "hono/ws";
import Data from "../game/board";

//部屋の情報
export type room={ws:WSContext[],id:string,gamemode:"survival"|"creative",data:Data};
//駒の種類
export type pieceType={
  name:string,
  src:string|undefined,
  movable:{
    absolute:number[][],
    relative:number[][],
    func:string
  },
  jumpable:boolean,
  promotion:pieceType|undefined,
  promotion_callback:string,
  promotion_msg:string[],
  king:boolean
};

//駒
export type piece={
  id: string,
  owner: "player1" | "player2",
  type:pieceType,
};

//マス
export type square={piece:piece|null};

//盤面
export type board=square[][];

//ゲームのデータ
export type GameState={
  boards:board[],
  turn:"player1"|"player2",
  player1_current_board:number,
  player2_current_board:number,
  player1_point:number,
  player2_point:number,
  player1_redbull:number,
  player2_redbull:number,
  history: Move[],
  player1_storage:pieceType[],
  player2_storage:pieceType[]
};

//websocketで送受信するデータのフォーマット
export type request={head:string,content:any,sender?:string};


// 駒の位置情報
export interface Position {
    x: number;
    y: number;
}

// 移動履歴
export interface Move {
    pieceId: string;
    from: Position | null;
    to: Position | null;
}

// 各コマンドの返り値定義
export interface CommandResult<T = undefined> {
    data?: T;
}
