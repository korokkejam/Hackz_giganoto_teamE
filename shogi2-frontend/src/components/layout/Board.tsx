import "./styles/Board.css";
import {boardAtom,playerAtom,focusedPieceAtom} from "../../state";
import {useAtomValue} from "jotai";
import Square from "./Square";
import {useMemo} from "react";

export default function Board(){
  // 位相がズレておりますわ〜
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const focusedPiece=useAtomValue(focusedPieceAtom);
  const move=useMemo(()=>{
    if (!focusedPiece){
      return;
    }
    const {pos,piece}=focusedPiece;
    return [...piece.type.movable.absolute,...piece.type.movable.relative.map((p)=>`${p[0]+pos[0]},${p[1]+pos[1]}`)];
  },[focusedPiece]);
  return (
    <div className="board">
      {(player==="player1"?board:board.reverse()).map((row:square[],x:number)=>
        <div className="row">
          {(player==="player1"?row:row.reverse()).map((_,y:number)=>
            <Square pos={[x,y]} dye={move?move.includes(`${x},${y}`):false}/>
          )}
        </div>
      )}
    </div>
  );
}
