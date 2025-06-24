import "./styles/StoragePiece.css";
import pieceImg from "../../assets/piece.png";
import { useAtom } from "jotai";
import { putPieceAtom } from "../../state";
import {PieceType} from "shogi2-types";

export default function StoragePiece({piece,index}:{piece:PieceType,index:number}){
  const [putPiece,setPutPiece]=useAtom(putPieceAtom);
  const onFocus=()=>{
    setPutPiece(index);
  };
  console.log(piece);
  return (
    <div className={`storagepiece ${index===putPiece?"focus":""}`} onClick={onFocus}>
      <img src={pieceImg}/>
      <p>{piece?.name}</p>
      <div className="cover"/>
    </div>
  );
}
