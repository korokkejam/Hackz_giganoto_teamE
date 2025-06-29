import { useAtomValue } from "jotai";
import { pieceStorageAtom } from "../../state";
import StoragePiece from "../common/StoragePiece";
import "./styles/PieceStorage.css";

export default function PieceStorage(){
  const pieceStorage=useAtomValue(pieceStorageAtom);
  return (
    <div className="storage1">
      {
        pieceStorage.map((piece)=><StoragePiece piece={piece}/>)
      }
    </div>
  );
}
