import Piece from "../common/Piece";
import "./styles/Square.css";
import {boardAtom,focusedPieceAtom,pieceStorageAtom,playerAtom,putPieceAtom,wsAtom, zAtom} from "../../state";
import {useAtom, useAtomValue} from "jotai";
import {DropEvent, MoveEvent, Request, Square} from "shogi2-types";

// dye:駒の移動先候補として色がついてる
// square:マスの情報
// pos:マスの座標
// focusedPiece:移動先候補を表示してる駒
export default function Square({pos,square,dye}:{pos:number[],square:Square,dye?:boolean}){
  const z=useAtomValue(zAtom);
  const [focusedPiece,setFocusedPiece]=useAtom(focusedPieceAtom);
  const [putPiece,setPutPiece]=useAtom(putPieceAtom);
  const storage1=useAtomValue(pieceStorageAtom);
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const ws=useAtomValue(wsAtom);
  const move=()=>{
    if (!ws){
      return;
    }
    if (putPiece){
      const piece=storage1.find((p)=>p.id===putPiece);
      if (piece && !square.piece){
        const data:Request<DropEvent>={head:"event",content:{id:crypto.randomUUID(),type:"drop",data:{piece,pos:{x:pos[0],y:pos[1],z}}}};
        ws.send(JSON.stringify(data));
        setPutPiece(undefined);
      }
    }else if (focusedPiece){
      const square=board[focusedPiece.pos[1]][focusedPiece.pos[0]];
      if (dye && player && square.piece){
        const event:MoveEvent={type:"move",data:{piece:square.piece,before_pos:[...focusedPiece.pos,0],after_pos:[...pos,z]},id:crypto.randomUUID()};
        const request:Request<MoveEvent>={head:"event",content:event,sender:player};
        ws.send(JSON.stringify(request));
        setFocusedPiece(null);
      }
    }
  };
  return (
    <div className={`square ${dye?"dye":""}`} onClick={move} style={{width:`calc(100% / ${board[pos[1]].length})`}}>
      {square.piece
        ? <Piece pos={pos}/>
        : null
      }
      {dye && <span className="move-indicator">●</span>}
    </div>
  );
}
