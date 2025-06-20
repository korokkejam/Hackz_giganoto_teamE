import "./styles/Piece.css";
import pieceImg from "../../assets/piece.png";
import {boardAtom,playerAtom,turnAtom} from "../../state";
import {useAtomValue} from "jotai";
import {useMemo} from "react";

export default function Piece({pos}:{pos:number[]}){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const turn=useAtomValue(turnAtom);
  const piece=useMemo(()=>board[pos[0]][pos[1]].piece,board);
  const onFocus=()=>{
  };
  return (
    <div className={`piece ${piece?.player===player?"":"turn"} ${turn===player && piece?.player===player?"movable":""}`} onClick={onFocus}>
      <img src={pieceImg}/>
      <p>{piece?.type.name}</p>
    </div>
  );
}
