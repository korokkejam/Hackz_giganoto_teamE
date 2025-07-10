import { Event } from "./Event";
import { ChatEventType } from "./events/ChatEvent";
import { ReturnRequest } from "./ModBase";

export type player="player1"|"player2";
export type board=Square[][];

// ファイル
export interface File{
  content:string;
  mimetype:string;
  id:string;
};

//駒の種類
export interface PieceType{
  name:string;
  id:string;
  src?:string;
  color?:string;
  movable:{
    absolute:number[][];
    relative:number[][];
    func:string[] //(pos:number[],board:board)=>number[]
  };
  jumpable:boolean;
  promotion?:PieceType;
  promotion_callback:string;
  promotion_msg:string[];
  promotion_check?:boolean;
  king:boolean;
};

//駒
export interface Piece{
  id: string;
  owner:player;
  type:PieceType;
};

export interface Effect{
  src:string;
  x?:number|string;
  y?:number|string;
  width?:number|string;
  height?:number|string;
}

//マス
export interface Square{
  piece:Piece|null;
  effect?:Effect;
};

//ゲームのデータ
export interface Game{
  boards:Square[][][]; //今の盤面
  turn:player; //今のターン
  player1_current_board:number; //盤面の階層のインデックス
  player2_current_board:number; //盤面の階層のインデックス
  player1_point:number; //プレイヤー1のポイント
  player2_point:number; //プレイヤー2のポイント
  player1_redbull:number; //プレイヤー1のレッドブル
  player2_redbull:number; //プレイヤー2のレッドブル
  history: {boards:Square[][][],id:string}[]; //盤面の履歴
  boards_id:string;
  player1_storage:Piece[]; //持ち駒
  player2_storage:Piece[]; //持ち駒
  pieces:PieceType[]; //使用可能な駒の一覧
  messages:ChatEventType[];
  requests:ReturnRequest[];
};

//websocketで送受信するデータのフォーマット
export interface Request<T extends Event|any>{
  head:string;
  content:T;
  sender?:player;
};

// 駒の位置情報
export interface Position {
    x: number;
    y: number;
    z: number;
}

// 移動履歴
export interface Move {
    pieceId: string;
    from: Position | null;
    to: Position | null;
}
