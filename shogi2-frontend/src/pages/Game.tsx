import "./styles/Game.css";
import Board from "../components/layout/Board";
import { useEffect, useState } from "react";
import { useSetAtom, useAtomValue} from "jotai";
import { boardAtom, pieceStorageAtom, turnAtom, wsAtom } from "../state";
import StoragePiece from "../components/common/StoragePiece";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { CSSProperties } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Request} from "shogi2-types";
import type {board} from "shogi2-types";

const style:CSSProperties={
  position:"absolute",
  width:"300px",
  textAlign:"center",
  height:"200px",
  left:"50%",
  top:"30%",
  transform:"translate(-50%,-50%)",
  textWrap:"wrap"
};

export default function Game(){
  const setBoard=useSetAtom(boardAtom);
  const navigate=useNavigate();
  const [text,setText]=useState<string|null>(null);
  const pieceStorage=useAtomValue(pieceStorageAtom);
  const ws=useAtomValue(wsAtom);
  const setTurn=useSetAtom(turnAtom);
  useEffect(()=>{
    if (!ws){
      return;
    }
    ws.onmessage=(e:MessageEvent)=>{
      const d:Request=JSON.parse(e.data);
      switch (d.head){
        case "move":
          {
            const data:{board:board,next:"player1"|"player2"}=d.content;
            setBoard(data.board);
            setTurn(data.next);
          }
          break;
        case "change":
          {
            const data:{next:"player1"|"player2"}=d.content;
            setTurn(data.next);
          }
          break;
        case "win":
          setText("あなたの勝ち！");
          break;
        case "lose":
          setText("あなたの負け！なんで負けたか明日までに考えといてレポートにして提出してください");
          break;
      }
    };
  },[ws]);
  return (
    <div className="game">
      <Modal open={!!text} onClose={()=>{setText(null)}}>
        <Paper sx={style}>
          <h4>{text}</h4>
          <Button onClick={()=>navigate("/")}>OK</Button>
        </Paper>
      </Modal>
      <Board/>
      <div>
        {
          pieceStorage.map((piece,i)=><StoragePiece piece={piece} index={i}/>)
        }
      </div>
    </div>
  );
}
