import "./styles/Board.css";
import {boardAtom,playerAtom,focusedPieceAtom, zAtom} from "../../state";
import {useAtomValue} from "jotai";
import SquareComponent from "./Square";
import {useMemo} from "react";
import type {board, player, Position} from "shogi2-types";
import {Square} from "shogi2-types";

const convert=(board:board)=>{
  return board.map((row,i)=>{
    return {row:[...row].map((s,j)=>{
      return {square:s,index:j};
    }),index:i};
  });
};

const reverse_board=(v:{row:{square:Square,index:number}[],index:number}[])=>{
  const index=v.map((_,i)=>i);
  index.reverse();
  return index.map((i)=>v[i]);
};

const reverse_row=(v:{square:Square,index:number}[])=>{
  const index=v.map((_,i)=>i);
  index.reverse();
  return index.map((i)=>v[i]);
};

export default function Board(){
  const boards=useAtomValue(boardAtom);
  const z=useAtomValue(zAtom);
  const board=useMemo(()=>boards[z],[boards,z]);
  const player=useAtomValue(playerAtom);
  const focusedPiece=useAtomValue(focusedPieceAtom);
  const converted_board=useMemo(()=>{
    return convert(board);
  },[board]);
  const move=useMemo(()=>{
    if (!focusedPiece){
      return;
    }
    const {pos:position,piece}=focusedPiece;
    const b=[...board];
    const absolute=piece.type.movable.absolute.filter((p)=>b[p[1]][p[0]].piece?.owner!==player);
    const positions=piece.type.movable.relative.map((p)=>[p[0],p[1]*(player==="player2"?-1:1)])
      .map((p)=>[position.x-p[0],position.y-p[1]])
      .filter((p)=>0<=p[1] && b.length>p[1] && 0<=p[0] && b[p[1]].length>p[0]);
    const over_enemy=positions
      .filter((p)=>b[p[1]][p[0]].piece)
      .filter((p)=>b[p[1]][p[0]].piece?.owner!==player);
    const empty=positions
      .filter((p)=>!b[p[1]][p[0]].piece);

    const filter=(p:number[])=>{
      if (piece.type.jumpable){
        return true;
      }
      const dx=p[0]-position.x;
      const dy=p[1]-position.y;
      const max=Math.abs(Math.abs(dy)<Math.abs(dx)?dx:dy);
      const step_x=dx==0?0:dx/Math.abs(dx);
      const step_y=dy==0?0:dy/Math.abs(dy);
      let count=0;
      for (let i=1;max>i;i++){
        const x=i*step_x+position.x;
        const y=i*step_y+position.y;
        if (y>=0 && board.length>y && x>=0 && board[y].length>x){
          if (b[y][x].piece && b[y][x].piece?.owner!==player){
            count+=1;
          }
          if (b[y][x].piece?.owner===player || (count>0 && b[y][x].piece?.owner!==player)){
            return false;
          }
        }
      }
      return true;
    };
    const relative=[...empty,...over_enemy].filter(filter);
    let func_position:number[][]=[];
    const functions:(((p:Position,turn?:player,board?:board)=>number[][])|undefined)[]=piece.type.movable.func.map((f)=>eval(f));
    functions.forEach((func)=>{
      if (func){
        const pos=func(position,player,board);
        func_position=func_position.concat(pos);
      }
    });
    func_position=func_position.filter((pos)=>board[pos[1]]?.[pos[0]]?.piece?.owner!==player && filter(pos));
    return [
      ...absolute,
      ...relative,
      ...func_position
    ].map((p)=>`${p[0]},${p[1]}`);
  },[focusedPiece]);
  return (
    <div className="board">
      {(player==="player1"?converted_board:reverse_board(converted_board)).map((r)=>
        <div className="row" style={{height:`calc(100% / ${board.length})`}}>
          {(player==="player1"?r.row:reverse_row(r.row)).map((s)=>
            <SquareComponent
              pos={{x:s.index,y:r.index,z:0}}
              square={s.square}
              dye={move?move.includes(`${s.index},${r.index}`):false}
            />
          )}
        </div>
      )}
    </div>
  );
}
