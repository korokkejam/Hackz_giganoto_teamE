import "./styles/Piece.css";
import pieceImg from "../../assets/piece.png";
import {boardAtom,playerAtom} from "../../state";
import {useAtomValue} from "jotai";
import {useMemo} from "react";

export default function Piece({pos}:{pos:number[]}){
  const board=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const piece=useMemo(()=>board[pos[0]][pos[1]],board);
  return (
    <div className={`piece ${piece.piece?.player===player?"":"turn"}`}>
      <img src={pieceImg}/>
      <p>{board[pos[0]][pos[1]].piece?.type.name}</p>
    </div>
  );
}
