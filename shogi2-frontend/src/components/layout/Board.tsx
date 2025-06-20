import "./styles/Board.css";
import {boardAtom} from "../../state";
import {useAtomValue} from "jotai";
import Square from "./Square";

export default function Board(){
  const board=useAtomValue(boardAtom);
  return (
    <div className="board">
      {board.map((row:square[],x:number)=>
        <div className="row">
          {row.map((square:square,y:number)=><Square pos={[x,y]}/>)}
        </div>
      )}
    </div>
  );
}
