import "./styles/Board.css";
import {boardAtom,playerAtom,focusedPieceAtom} from "../../state";
import {useAtomValue} from "jotai";
import Square from "./Square";
import {useMemo} from "react";

const convert=(board:board)=>{
  return board.map((row,i)=>{
    return {row:row.map((s,j)=>{
      return {square:s,index:j};
    }),index:i};
  });
};

const reverse_board=(v:{row:{square:square,index:number}[],index:number}[])=>{
  const index=v.map((_,i)=>i);
  index.reverse();
  return index.map((i)=>v[i]);
};

const reverse_row=(v:{square:square,index:number}[])=>{
  const index=v.map((_,i)=>i);
  index.reverse();
  return index.map((i)=>v[i]);
};

export default function Board(){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const focusedPiece=useAtomValue(focusedPieceAtom);
  const converted_board=useMemo(()=>convert(board),[board]);
  const move=useMemo(()=>{
    if (!focusedPiece){
      return;
    }
    const {pos,piece}=focusedPiece;
    const b=[...board];
    const absolute=piece.type.movable.absolute.filter((p)=>b[p[1]][p[0]].piece?.player!==player)
      .map((p)=>player==="player2"?[8-p[0],8-p[1]]:p);
    const positions=piece.type.movable.relative.map((p)=>[p[0],p[1]*(player==="player2"?-1:1)])
      .map((p)=>[pos[0]-p[0],pos[1]-p[1]])
      .filter((p)=>0<=p[1] && b.length>p[1] && 0<=p[0] && b[p[1]].length>p[0]);
    const over_enemy=positions
      .filter((p)=>b[p[1]][p[0]].piece)
      .filter((p)=>b[p[1]][p[0]].piece?.player!==player);
    const empty=positions
      .filter((p)=>!b[p[1]][p[0]].piece);
    const relative=[...empty,...over_enemy].filter((p)=>{
      if (piece.type.jumpable){
        return true;
      }
      const dx=p[0]-pos[0];
      const dy=p[1]-pos[1];
      const max=Math.abs(Math.abs(dy)<Math.abs(dx)?dx:dy);
      const step_x=dx==0?0:dx/Math.abs(dx);
      const step_y=dy==0?0:dy/Math.abs(dy);
      let count=0;
      for (let i=1;max>i;i++){
        const x=i*step_x+pos[0];
        const y=i*step_y+pos[1];
        if (x>=0 && 8>=x && y>=0 && 8>=y){
          if (b[y][x].piece && b[y][x].piece?.player!==player){
            count+=1;
          }
          if (b[y][x].piece?.player===player || (count>0 && b[y][x].piece?.player!==player)){
            return false;
          }
        }
      }
      return true;
    });
    let func_position:number[][]=[];
    const func:(()=>number[])|undefined=eval(piece.type.movable.func);
    if (func){
      let v:number[][]=[];
      [...Array(5)].forEach(()=>{
        const pos=func();
        v.push(pos);
      });
      func_position=v;
    }
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
            <Square
              pos={[s.index,r.index]}
              square={s.square}
              dye={move?move.includes(`${s.index},${r.index}`):false}
            />
          )}
        </div>
      )}
    </div>
  );
}
