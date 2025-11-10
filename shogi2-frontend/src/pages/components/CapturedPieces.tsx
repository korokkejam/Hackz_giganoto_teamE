import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { gameDataAtom, openCapturedPiecesAtom, playerAtom, selectedPieceAtom } from "../../state";
import { Piece } from "shogi2-types";
import piece_src from "../../assets/piece.png";
import "./styles/CapturedPieces.css";

export default function CapturedPieces(){
  const setOpen=useSetAtom(openCapturedPiecesAtom);
  const data=useAtomValue(gameDataAtom);
  const player=useAtomValue(playerAtom);
  return (
    <div className="captured-pieces" onClick={()=>{setOpen(false)}}>
      {(player==="player1"?data.player1:data.player2).captured_pieces.map((piece)=><Piece piece={piece}/>)}
    </div>
  );
}

function Piece({piece}:{piece:Piece}){
  const [selectedPiece,setSelectedPiece]=useAtom(selectedPieceAtom);
  const handleSwitch=()=>{
    if (piece.id===selectedPiece?.id){
      setSelectedPiece(null);
    }else{
      setSelectedPiece(piece);
    }
  };
  return (
    <div className="piece" onClick={handleSwitch}>
      <img src={piece.type.image ?? piece_src}/>
      <p>{piece.type.name}</p>
      <div style={{
        background:"#00000077",
        width:"100%",
        height:"100%",
        position:"absolute",
        zIndex:50,
        left:0,
        top:0,
        display:piece.id===selectedPiece?.id?"":"none"
      }}/>
    </div>
  );
}
