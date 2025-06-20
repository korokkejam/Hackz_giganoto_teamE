import "./styles/Board.css";
import {boardAtom,playerAtom} from "../../state";
import {useAtomValue} from "jotai";
import Square from "./Square";

export default function Board(){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  return (
    <div className="board">
      {(player==="player1"?board:board.reverse()).map((row:square[],x:number)=>
        <div className="row">
          {(player==="player1"?row:row.reverse()).map((square:square,y:number)=><Square pos={[x,y]}/>)}
        </div>
      )}
    </div>
  );
}
