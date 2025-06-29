import "./styles/Piece.css";
import pieceImg from "../../assets/piece.png";
import {boardAtom,playerAtom,turnAtom,focusedPieceAtom, putPieceAtom} from "../../state";
import {useAtomValue,useAtom, useSetAtom} from "jotai";
import {useMemo} from "react";

const eq=(v1:number[],v2:number[]|undefined)=>{
  if (!v2){
    return false;
  }
  return v1[0]===v2[0] && v1[1]===v2[1];
};

export default function Piece({pos}:{pos:number[]}){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const turn=useAtomValue(turnAtom);
  const [focusedPiece,setFocusedPiece]=useAtom(focusedPieceAtom);
  const piece=useMemo(()=>board[pos[1]][pos[0]].piece,board);
  const setPutPiece=useSetAtom(putPieceAtom);
  const onFocus=()=>{
    if (!piece){
      return;
    }
    if (turn===player && piece.owner===player){
      if (eq(pos,focusedPiece?.pos)){
        setFocusedPiece(null);
      }else{
        setFocusedPiece({pos,piece});
        setPutPiece(undefined);
      }
    }
  };
  return (
    <div className={`piece ${piece?.owner===player?"":"turn"} ${turn===player && piece?.owner===player?"movable":""} ${eq(pos,focusedPiece?.pos)?"focus":""}`} onClick={onFocus}>
      <img src={pieceImg}/>
      <p>{piece?.type.name}</p>
      <div className="cover"/>
    </div>
  );
}
