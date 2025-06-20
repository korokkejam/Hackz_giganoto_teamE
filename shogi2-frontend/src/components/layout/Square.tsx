import Piece from "../common/Piece";
import "./styles/Square.css";
import {boardAtom} from "../../state";
import {useAtomValue} from "jotai";

export default function Square({pos}:{pos:number[]}){
  const board=useAtomValue(boardAtom);
  return (
    <div className="square">
      {board[pos[0]][pos[1]].piece
        ? <Piece pos={pos}/>
        : null
      }
    </div>
  );
}
