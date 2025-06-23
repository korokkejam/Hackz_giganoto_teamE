type piece={
  id: string,
  owner: "player1" | "player2",
  type:pieceType,
};
type square={piece:piece|null};
type board=square[][];
type request={head:string,content:any,sender?:string};
type boardData={
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
type pieceType={
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
