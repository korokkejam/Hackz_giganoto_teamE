import Piece from "../common/Piece";
import "./styles/Square.css";
import {boardAtom,focusedPieceAtom,playerAtom,wsAtom} from "../../state";
import {useAtom, useAtomValue} from "jotai";
import { useState } from "react";
import PromotionDialog from "./PromotionDialog";
import {Square} from "shogi2-types";

export default function Square({pos,square,dye}:{pos:number[],square:Square,dye?:boolean}){
  const [focusedPiece,_setFocusPiece]=useAtom(focusedPieceAtom);
  const [board,_setBoard]=useAtom(boardAtom);
  const player=useAtomValue(playerAtom);
  const ws=useAtomValue(wsAtom);
  const [open,setOpen]=useState<boolean>(false);
  const move=()=>{
    if (!ws){
      return;
    }
    if (dye && focusedPiece && player){
    }
  };
  return (
    <div className={`square ${dye?"dye":""}`} onClick={move} style={{width:`calc(100% / ${board[pos[1]].length})`}}>
      <PromotionDialog open={open} onClose={()=>{setOpen(false)}} pos={pos}/>
      {square.piece
        ? <Piece pos={pos}/>
        : null
      }
      {dye && <span className="move-indicator">●</span>}
    </div>
  );
}
