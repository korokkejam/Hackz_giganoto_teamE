type pieceType={
  name:string,
  movable:{
    absolute:number[][],
    relative:number[][],
    func:string
  },
  jumpable:boolean,
  promotion:pieceType|undefined,
  promotion_callback:string
};
type piece={player:"player1"|"player2",type:pieceType};
type square={piece:piece|null};
type board=square[][];
type request={head:string,content:any,sender?:string};
type boardData={boards:board[],turn:"player1"|"player2"};
