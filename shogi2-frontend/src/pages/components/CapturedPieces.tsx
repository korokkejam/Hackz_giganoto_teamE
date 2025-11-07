import { useAtomValue, useSetAtom } from "jotai";
import { gameDataAtom, openCapturedPieces, playerAtom, selectedPiece } from "../../state";
import { PieceType } from "shogi2-types";
import piece_src from "../../assets/piece.png";
import "./styles/CapturedPieces.css";

export default function CapturedPieces(){
  const setOpen=useSetAtom(openCapturedPieces);
  const data=useAtomValue(gameDataAtom);
  const player=useAtomValue(playerAtom);
  return (
    <div className="captured-pieces" onClick={()=>{setOpen(false)}}>
      {(player==="player1"?data.player1:data.player2).captured_pieces.map((piece)=><Piece piece={piece}/>)}
    </div>
  );
}

function Piece({piece}:{piece:PieceType}){
  const setPiece=useSetAtom(selectedPiece);
  return (
    <div className="piece">
      <img src={piece.image ?? piece_src} onClick={()=>setPiece(piece)}/>
      <p>{piece.name}</p>
    </div>
  );
}
