import "./styles/StoragePiece.css";
import pieceImg from "../../assets/piece.png";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {focusedPieceAtom, playerAtom, putPieceAtom, turnAtom} from "../../state";
import {Piece} from "shogi2-types";

export default function StoragePiece({piece}:{piece:Piece}){
  const [putPiece,setPutPiece]=useAtom(putPieceAtom);
  const turn=useAtomValue(turnAtom);
  const player=useAtomValue(playerAtom);
  const setFocusedPiece=useSetAtom(focusedPieceAtom);
  const onFocus=()=>{
    if (piece.id===putPiece){
      setPutPiece(undefined);
    }else if (player===turn){
      setPutPiece(piece.id);
      setFocusedPiece(null);
    }
  };
  return (
    <div className={`storagepiece ${piece.id===putPiece?"focus":""}`} onClick={onFocus}>
      <img src={pieceImg}/>
      <p>{piece.type.name}</p>
      <div className="cover"/>
    </div>
  );
}
