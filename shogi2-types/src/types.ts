import { Event } from "./Event";

export type player="player1"|"player2";
export type board=Square[][];

//駒の種類
export interface PieceType{
  name:string;
  id:string;
  src:string|undefined;
  movable:{
    absolute:number[][];
    relative:number[][];
    func:string
  };
  jumpable:boolean;
  promotion:PieceType|undefined;
  promotion_callback:string;
  promotion_msg:string[];
  king:boolean;
};

//駒
export interface Piece{
  id: string;
  owner:player;
  type:PieceType;
};

//マス
export interface Square{
  piece:Piece|null;
};

//盤面
// export type board=Square[][];

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
  history: Move[]; //盤面の履歴
  player1_storage:PieceType[]; //持ち駒
  player2_storage:PieceType[]; //持ち駒
  pieces:PieceType[]; //使用可能な駒の一覧
};

//websocketで送受信するデータのフォーマット
export interface Request<T extends Event|any>{
  head:string;
  content:T;
  sender?:string;
};

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
