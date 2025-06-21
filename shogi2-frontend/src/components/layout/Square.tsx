import Piece from "../common/Piece";
import "./styles/Square.css";
import {boardAtom,focusedPieceAtom} from "../../state";
import {useAtomValue,useSetAtom} from "jotai";

export default function Square({pos,dye}:{pos:number[],dye?:boolean}){
  const board=useAtomValue(boardAtom);
  const focusedPiece=useAtomValue(focusedPieceAtom);
  const setFocusPiece=useSetAtom(focusedPieceAtom);
  const setBoard=useSetAtom(boardAtom);
  const move=()=>{
    if (dye && focusedPiece){
      let board_copied=[...board];
      board_copied[pos[1]][pos[0]]={piece:focusedPiece.piece};
      board_copied[focusedPiece.pos[1]][focusedPiece.pos[0]]={piece:null};
      setFocusPiece(null);
    }
  };
  return (
    <div className={`square ${dye?"dye":""}`} onClick={move} style={{width:`calc(100% / ${board[pos[1]].length})`}}>
      {board[pos[1]][pos[0]].piece
        ? <Piece pos={pos}/>
        : null
      }
      {dye && <span className="move-indicator">●</span>}
    </div>
  );
}
