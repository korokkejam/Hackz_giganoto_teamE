import { CSSProperties } from "@mui/material";
import "./styles/PromotionDialog.css";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useAtomValue} from "jotai";
import {playerAtom, wsAtom } from "../../state";
import { useMemo } from "react";
import {Request, PromotionCheckEvent} from "shogi2-types";

const style:CSSProperties={
  position:"absolute",
  width:"200px",
  height:"100px",
  left:"50%",
  top:"30%",
  transform:"translate(-50%,-50%)"
};

export default function PromotionDialog({event,onClose}:{event:PromotionCheckEvent|null,onClose:()=>void}){
  const player=useAtomValue(playerAtom);
  const ws=useAtomValue(wsAtom);
  const piece=useMemo(()=>event?.data.piece,[event]);
  const promotion=()=>{
    if (!event || !ws){
      return;
    }
    const data:Request<PromotionCheckEvent>={head:"event",content:{
      ...event,
      data:{
        ...event.data,
        answer:true
      }
    },sender:player};
    ws.send(JSON.stringify(data));
    onClose();
  };
  const cancel=()=>{
    if (!ws || !event){
      return;
    }
    const data:Request<PromotionCheckEvent>={head:"event",content:{
      ...event,
      data:{
        ...event.data,
        answer:false
      }
    },sender:player};
    ws.send(JSON.stringify(data));
    onClose();
  };
  return (
    <Modal open={!!event} onClose={cancel}>
      <Paper sx={style}>
        <div className="promotiondialog">
          <h4>{piece?.type.promotion_msg[0]?piece.type.promotion_msg[0]:"成る？"}</h4>
          <div>
            <Button onClick={promotion}>{piece?.type.promotion_msg[1]?piece.type.promotion_msg[1]:"成る"}</Button>
            <Button onClick={cancel}>{piece?.type.promotion_msg[2]?piece.type.promotion_msg[2]:"成らない"}</Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
