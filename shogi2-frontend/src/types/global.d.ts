type pieceType={name:string,movable:{absolute:number[][],relative:number[][],func:string},jumpable:boolean};
type piece={player:"player1"|"player2",type:pieceType};
type square={piece:piece|null};
type board=square[][];
