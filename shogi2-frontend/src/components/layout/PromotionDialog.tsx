import { CSSProperties } from "@mui/material";
import "./styles/PromotionDialog.css";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useAtom, useAtomValue} from "jotai";
import { boardAtom, playerAtom, wsAtom } from "../../state";
import { useMemo } from "react";
import {Piece,Square,Request} from "shogi2-types";

const style:CSSProperties={
  position:"absolute",
  width:"200px",
  height:"100px",
  left:"50%",
  top:"30%",
  transform:"translate(-50%,-50%)"
};

export default function PromotionDialog({open,onClose,pos}:{open:boolean,onClose:()=>void,pos:number[]}){
  const [board,setBoard]=useAtom(boardAtom);
  const player=useAtomValue(playerAtom);
  const ws=useAtomValue(wsAtom);
  const piece=useMemo(()=>board[pos[1]][pos[0]].piece,[board]);
  const promotion=()=>{
    if (!piece || !player || !piece.type.promotion){
      return;
    }
    const bb=board.map((row,y)=>row.map((s,x)=>{
      if (x===pos[0] && y===pos[1] && player && piece.type.promotion){
        const a:Piece={type:piece.type.promotion,owner:player,id:""};
        const b:Square={piece:a};
        return b;
      }else{
        return {...s};
      }
    }));
    setBoard(bb);
    if (!ws){
      return;
    }
    const data:Request={head:"promotion",content:bb,sender:player};
    ws.send(JSON.stringify(data));
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        <div className="promotiondialog">
          <h4>{piece?.type.promotion_msg[0]?piece.type.promotion_msg[0]:"成る？"}</h4>
          <div>
            <Button onClick={promotion}>{piece?.type.promotion_msg[1]?piece.type.promotion_msg[1]:"成る"}</Button>
            <Button onClick={onClose}>{piece?.type.promotion_msg[2]?piece.type.promotion_msg[2]:"成らない"}</Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
