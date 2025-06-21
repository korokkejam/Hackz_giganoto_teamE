import "./styles/Board.css";
import {boardAtom,playerAtom,focusedPieceAtom} from "../../state";
import {useAtomValue} from "jotai";
import Square from "./Square";
import {useMemo} from "react";

export default function Board(){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const focusedPiece=useAtomValue(focusedPieceAtom);
  const move=useMemo(()=>{
    if (!focusedPiece){
      return;
    }
    const {pos,piece}=focusedPiece;
    const absolute=piece.type.movable.absolute.filter((p)=>board[p[1]][p[0]].piece?.player!==player);
    const relative=
      piece.type.movable.relative.map((p)=>[pos[0]-p[0],pos[1]-p[1]])
    .filter((p)=>0<=p[1] && board.length>p[1] && 0<=p[0] && board[p[1]].length>p[0] && board[p[1]][p[0]].piece?.player!==player)
    return [
      ...absolute,
      ...relative
    ].map((p)=>`${p[0]},${p[1]}`);
  },[focusedPiece]);
  return (
    <div className="board">
      {(player==="player1"?board:board.reverse()).map((row:square[],y:number)=>
        <div className="row">
          {(player==="player1"?row:row.reverse()).map((_,x:number)=>
            <Square pos={[x,y]} dye={move?move.includes(`${x},${y}`):false}/>
          )}
        </div>
      )}
    </div>
  );
}
