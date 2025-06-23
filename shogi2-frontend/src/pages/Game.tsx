import "./styles/Game.css";
import Board from "../components/layout/Board";
import { useEffect, useState } from "react";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { boardAtom, pieceStorageAtom, pieceTypesAtom, playerAtom, turnAtom, wsAtom } from "../state";
import StoragePiece from "../components/common/StoragePiece";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { CSSProperties } from "@mui/material";
import {useNavigate} from "react-router-dom";

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
  const pieces=useAtomValue(pieceTypesAtom);
  const [board,setBoard]=useAtom(boardAtom);
  const player=useAtomValue(playerAtom);
  const [value,setValue]=useState<string>("");
  const navigate=useNavigate();
  const [text,setText]=useState<string|null>(null);
  const [pieceStorage,setPieceStorage]=useAtom(pieceStorageAtom);
  const ws=useAtomValue(wsAtom);
  const setTurn=useSetAtom(turnAtom);
  useEffect(()=>{
    if (!ws){
      return;
    }
    ws.onmessage=(e:MessageEvent)=>{
      const d:request=JSON.parse(e.data);
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
      <div style={{display:"flex"}}>
      <TextField fullWidth label="コマンド" value={value} onChange={(e)=>setValue(e.target.value)}/>
      <Button onClick={()=>{
        if (value==="kill"){
          const d:request={head:"kill",content:"",sender:player};
          ws?.send(JSON.stringify(d));
        }else if (value==="random"){
          let copy=board.map((row)=>row.map((s)=>{return{...s}}));
          for (let i=0;200>i;i++){
            const x1=Math.floor(Math.random()*9);
            const x2=Math.floor(Math.random()*9);
            const y1=Math.floor(Math.random()*9);
            const y2=Math.floor(Math.random()*9);
            const a={...copy[y1][x1]};
            const b={...copy[y2][x2]};
            copy[y1][x1]=b;
            copy[y2][x2]=a;
          }
          setBoard(copy);
          if (!ws){
            return;
          }
          const d:request={head:"random",content:copy,sender:player};
          ws.send(JSON.stringify(d));
        }else if (value.split(" ")[0]==="give"){
          const a=value.split(" ");
          const p=a[1];
          const piece=pieces.find((piece)=>piece.name===p);
          if (!piece){
            return;
          }
          const n=a[2]?Number(a[2]):1;
          let b=[];
          for (let i=0;n>i;i++){
            b.push(piece);
          }
          setPieceStorage([...pieceStorage,...b]);
        }
        setValue("");
      }}>送信</Button>
      </div>
      <div>
        {
          pieceStorage.map((piece,i)=><StoragePiece piece={piece} index={i}/>)
        }
      </div>
    </div>
  );
}
