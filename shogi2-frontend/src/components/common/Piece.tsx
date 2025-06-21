import "./styles/Piece.css";
import pieceImg from "../../assets/piece.png";
import {boardAtom,playerAtom,turnAtom,focusedPieceAtom} from "../../state";
import {useAtomValue,useAtom} from "jotai";
import {useMemo} from "react";

export default function Piece({pos}:{pos:number[]}){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const turn=useAtomValue(turnAtom);
  const [focusedPiece,setFocusedPiece]=useAtom(focusedPieceAtom);
  const piece=useMemo(()=>board[pos[0]][pos[1]].piece,board);
  const onFocus=()=>{
    if (!piece){
      return;
    }
    if (turn===player && piece.player===player){
      setFocusedPiece({pos,piece});
    }
  };
  return (
    <div className={`piece ${piece?.player===player?"":"turn"} ${turn===player && piece?.player===player?"movable":""} ${pos===focusedPiece?.pos?"focus":""}`} onClick={onFocus}>
      <img src={pieceImg}/>
      <p>{piece?.type.name}</p>
      <div className="cover"/>
    </div>
  );
}
