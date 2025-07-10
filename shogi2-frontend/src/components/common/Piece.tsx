import "./styles/Piece.css";
import pieceImg from "../../assets/piece.png";
import {boardAtom,playerAtom,turnAtom,focusedPieceAtom, putPieceAtom, filesAtom, zAtom} from "../../state";
import {useAtomValue,useAtom, useSetAtom} from "jotai";
import {useMemo} from "react";
import { Position } from "shogi2-types";

const eq=(v1:Position,v2:Position|undefined)=>{
  if (!v2){
    return false;
  }
  return v1.x===v2.x && v1.y===v2.y;
};

export default function Piece({pos}:{pos:Position}){
  const files=useAtomValue(filesAtom);
  const z=useAtomValue(zAtom);
  const boards=useAtomValue(boardAtom);
  const board=useMemo(()=>boards[z],[boards,z]);
  const player=useAtomValue(playerAtom);
  const turn=useAtomValue(turnAtom);
  const [focusedPiece,setFocusedPiece]=useAtom(focusedPieceAtom);
  const piece=useMemo(()=>board[pos.y][pos.x].piece,board);
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
      <img src={piece?.type.src?files.find((file)=>file.id===piece.type.src)?.url:pieceImg}/>
      <p style={{color:piece?.type.color?piece?.type.color:"black"}}>{piece?.type.name}</p>
      <div className="cover"/>
    </div>
  );
}
