import Piece from "../common/Piece";
import "./styles/Square.css";
import {boardAtom,focusedPieceAtom, pieceStorageAtom, playerAtom,putPieceAtom,wsAtom} from "../../state";
import {useAtom, useAtomValue} from "jotai";
import { useState } from "react";
import PromotionDialog from "./PromotionDialog";
import {Square,Request} from "shogi2-types";

export default function Square({pos,square,dye}:{pos:number[],square:Square,dye?:boolean}){
  const [putPiece,setPutPiece]=useAtom(putPieceAtom);
  const [focusedPiece,setFocusPiece]=useAtom(focusedPieceAtom);
  const [board,setBoard]=useAtom(boardAtom);
  const player=useAtomValue(playerAtom);
  const ws=useAtomValue(wsAtom);
  const [open,setOpen]=useState<boolean>(false);
  const [pieceStorage,setPieceStorage]=useAtom(pieceStorageAtom);
  const move=()=>{
    if (!ws){
      return;
    }
    if (putPiece!==undefined){
      if (!player){
        return;
      }
      let copy=pieceStorage.map((piece)=>{return{...piece}});
      const pieceType={...copy[putPiece]};
      delete copy[putPiece];
      setPieceStorage(copy);
      setPutPiece(undefined);
      let board_copied=board.map((r)=>r.map((s)=>{return {...s}}));
      board_copied[pos[1]][pos[0]]={piece:{type:pieceType,owner:player,id:""}};
      setBoard(board_copied);
      if (!ws){
        return;
      }
      const d:Request={head:"move",content:board_copied,sender:player};
      ws.send(JSON.stringify(d));
    }else if (dye && focusedPiece && player){
      let board_copied=board.map((r)=>r.map((s)=>{return {...s}}));
      const s=board_copied[pos[1]][pos[0]];
      if (s.piece?.owner && s.piece.owner!==player){
        if (s.piece.type.king){
          const data:Request={head:"kill",content:"",sender:player};
          ws.send(JSON.stringify(data));
        }
        setPieceStorage([...pieceStorage,s.piece.type]);
      }
      board_copied[pos[1]][pos[0]]={piece:focusedPiece.piece};
      board_copied[focusedPiece.pos[1]][focusedPiece.pos[0]]={piece:null};
      setBoard(board_copied);
      setFocusPiece(null);
      const d:Request={head:"move",content:board_copied,sender:player};
      ws.send(JSON.stringify(d));
      if (((player==="player1" && 0<=pos[1] && pos[1]<=2)
        || (player==="player2" && 6<=pos[1] && pos[1]<=8)) && focusedPiece.piece.type.promotion){
        setOpen(true);
      }
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
