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

export default function Board(){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const focusedPiece=useAtomValue(focusedPieceAtom);
  const converted_board=useMemo(()=>{
    return convert(board);
  },[board]);
  const move=useMemo(()=>{
    if (!focusedPiece){
      return;
    }
    const {pos,piece}=focusedPiece;
    const absolute=piece.type.movable.absolute.filter((p)=>board[p[1]][p[0]].piece?.player!==player);
    const positions=piece.type.movable.relative.map((p)=>[pos[0]-p[0],pos[1]-p[1]])
      .filter((p)=>0<=p[1] && board.length>p[1] && 0<=p[0] && board[p[1]].length>p[0]);
    const over_player=positions
      .filter((p)=>board[p[1]][p[0]].piece)
      .filter((p)=>board[p[1]][p[0]].piece?.player===player);
    const over_enemy=positions
      .filter((p)=>board[p[1]][p[0]].piece)
      .filter((p)=>board[p[1]][p[0]].piece?.player!==player);
    const empty=positions
      .filter((p)=>!board[p[1]][p[0]].piece);
    const relative=[...empty,...over_enemy].filter((p)=>{
      return true;
    });
    return [
      ...absolute,
      ...relative
    ].map((p)=>`${p[0]},${p[1]}`);
  },[focusedPiece]);
  return (
    <div className="board">
      {(player==="player1"?converted_board:converted_board.reverse()).map((r)=>
        <div className="row">
          {(player==="player1"?r.row:r.row.reverse()).map((s)=>
            <Square pos={[s.index,r.index]} dye={move?move.includes(`${s.index},${r.index}`):false}/>
          )}
        </div>
      )}
    </div>
  );
}
