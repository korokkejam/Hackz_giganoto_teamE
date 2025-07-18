import Piece from "../common/Piece";
import "./styles/Square.css";
import {boardAtom,filesAtom,focusedPieceAtom,pieceStorageAtom,playerAtom,putPieceAtom,wsAtom, zAtom} from "../../state";
import {useAtom, useAtomValue} from "jotai";
import {DropEvent, MoveEvent, Position, Request, Square} from "shogi2-types";
import { useMemo } from "react";
import {generateUUID} from "../../features/uuid";

// dye:駒の移動先候補として色がついてる
// square:マスの情報
// pos:マスの座標
// focusedPiece:移動先候補を表示してる駒
export default function Square({pos,square,dye}:{pos:Position,square:Square,dye?:boolean}){
  const files=useAtomValue(filesAtom);
  const z=useAtomValue(zAtom);
  const [focusedPiece,setFocusedPiece]=useAtom(focusedPieceAtom);
  const [putPiece,setPutPiece]=useAtom(putPieceAtom);
  const storage1=useAtomValue(pieceStorageAtom);
  const boards=useAtomValue(boardAtom);
  const board=useMemo(()=>boards[z],[boards,z]);
  const player=useAtomValue(playerAtom);
  const ws=useAtomValue(wsAtom);
  const file=useMemo(()=>files.find((f)=>f.id===square.effect?.src),[files,square.effect?.src]);
  const move=()=>{
    if (!ws){
      return;
    }
    if (putPiece){
      const piece=storage1.find((p)=>p.id===putPiece);
      if (piece && !square.piece){
        const data:Request<DropEvent>={
          head:"event",
          content:{
            id:generateUUID(),
            type:"drop",
            data:{
              piece,
              pos:{...pos,z}
            }
          },
          sender:player
        };
        ws.send(JSON.stringify(data));
        setPutPiece(undefined);
      }
    }else if (focusedPiece){
      const square=board[focusedPiece.pos.y][focusedPiece.pos.x];
      if (dye && player && square.piece){
        const event:MoveEvent={
          type:"move",
          data:{
            piece:square.piece,
            before_pos:{...focusedPiece.pos,z},
            after_pos:{...pos,z}
          },
          id:generateUUID()
        };
        const request:Request<MoveEvent>={head:"event",content:event,sender:player};
        ws.send(JSON.stringify(request));
        setFocusedPiece(null);
      }
    }
  };
  return (
    <div className={`square ${dye?"dye":""}`} onClick={move} style={{width:`calc(100% / ${board[pos.y].length})`}}>
      {square.piece
        ? <Piece pos={pos}/>
        : null
      }
      {square.effect
        ? <img src={file?.url} style={{
          width:square.effect.width?square.effect.width:"100%",
          height:square.effect.height?square.effect.height:"100%",
          left:square.effect.x?`calc(50% + ${square.effect.x})`:"50%",
          top:square.effect.y?`calc(50% + ${square.effect.y})`:"50%",
        }} className="square-effect"/>
        : null
      }
      {dye && <span className="move-indicator">●</span>}
    </div>
  );
}
