import "./styles/Game.css";
import Board from "../components/layout/Board";
import {useEffect,useState} from "react";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {boardAtom, focusedPieceAtom, menubarStateAtom, messagesAtom,pieceStorage2Atom,pieceStorageAtom,pieceTypesAtom,playerAtom,putPieceAtom,turnAtom,wsAtom, zAtom} from "../state";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import {ChangeBoardEvent,CaptureEvent, ChatEvent, DropEvent, EndEvent, MoveEvent, Piece, PromotionCheckEvent, PromotionEvent, Request, TurnEvent} from "shogi2-types";
import {CSSProperties} from "@mui/material";
import PieceStorage from "../components/layout/PieceStorage";
import Menu from "../components/layout/Menu";
import Chat from "../components/layout/Chat";
import PromotionDialog from "../components/layout/PromotionDialog";

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
  const z=useAtomValue(zAtom);
  const [player,setPlayer]=useAtom(playerAtom);
  const navigate=useNavigate();
  const setTurn=useSetAtom(turnAtom);
  const setStorage1=useSetAtom(pieceStorageAtom);
  const setStorage2=useSetAtom(pieceStorage2Atom);
  const [menubarState,setMenubarState]=useAtom(menubarStateAtom);
  const setMessages=useSetAtom(messagesAtom);
  const [text,setText]=useState<string|null>(null);
  const setBoard=useSetAtom(boardAtom);
  const [ws,setWs]=useAtom(wsAtom);
  const [promotionEvent,setPromotionEvent]=useState<PromotionCheckEvent|null>(null);
  const setFocusedPiece=useSetAtom(focusedPieceAtom);
  const setPutPiece=useSetAtom(putPieceAtom);
  const setPieceTypes=useSetAtom(pieceTypesAtom);
  useEffect(()=>{
    if (!ws){
      return;
    }
    ws.onmessage=(e:MessageEvent)=>{
      const data=e.data;
      const d:Request<any>=JSON.parse(data);
      switch (d.head){
        case "close":
          setText("接続が切れました");
          ws.close();
          break;
        case "event":
          const event:Event=d.content;
          switch (event.type){
            case "chat":
              {
                const data:Request<ChatEvent>=d;
                setMessages(prev=>[data.content.data,...prev]);
              }
              break;
            case "move":
              {
                const data:Request<MoveEvent>=d;
                const e=data.content.data;
                setBoard((board)=>board.map((row,y)=>row.map((s,x)=>{
                  if (e.before_pos[0]===x && e.before_pos[1]===y){
                    return {piece:null};
                  }else if (e.after_pos[0]===x && e.after_pos[1]===y){
                    return {piece:e.piece};
                  }else{
                    return s;
                  }
                })));
              }
              break;
            case "change_board":
              {
                const data:Request<ChangeBoardEvent>=d;
                setBoard(data.content.data.boards[z]);
              }
              break;
            case "turn":
              {
                const data:Request<TurnEvent>=d;
                setTurn(data.content.data.player);
              }
              break;
            case "promotion_check":
              {
                const data:Request<PromotionCheckEvent>=d;
                setPromotionEvent(data.content);
              }
              break;
            case "promotion":
              {
                const data:Request<PromotionEvent>=d;
                setBoard((board)=>board.map((row,y)=>row.map((s,x)=>{
                  if (x===data.content.data.pos.x && y===data.content.data.pos.y){
                    return {piece:data.content.data.piece};
                  }else{
                    return {...s};
                  }
                })));
              }
              break;
            case "capture":
              {
                const data:Request<CaptureEvent>=d;
                const piece1=data.content.data.piece1;
                const piece2=data.content.data.piece2;
                const piece:Piece={
                  id:piece2.id,
                  owner:piece1.owner,
                  type:piece2.type
                };
                if (data.content.data.piece1.owner===player){
                  setStorage1((pieces)=>[...pieces,piece]);
                }else{
                  setStorage2((pieces)=>[...pieces,piece]);
                }
              }
              break;
            case "drop":
              {
                const data:Request<DropEvent>=d;
                if (data.content.data.piece.owner===player){
                  setStorage1((storage1)=>storage1.filter((p)=>p.id===data.content.data.piece.id));
                  setBoard((board)=>board.map((row,y)=>row.map((s,x)=>{
                    if (x===data.content.data.pos.x && y===data.content.data.pos.y){
                      return {piece:data.content.data.piece};
                    }else{
                      return {...s};
                    }
                  })));
                }else{
                  setStorage2((storage2)=>storage2.filter((p)=>p.id===data.content.data.piece.id));
                  setBoard((board)=>board.map((row,y)=>row.map((s,x)=>{
                    if (x===data.content.data.pos.x && y===data.content.data.pos.y){
                      return {piece:data.content.data.piece};
                    }else{
                      return {...s};
                    }
                  })));
                }
              }
              break;
            case "end":
              {
                const data:Request<EndEvent>=d;
                if (data.content.data.winner===player){
                  setText("あなたの勝ち");
                }else{
                  setText("あなたの負け！なんで負けたか明日までに考えといてレポートにして提出してください");
                }
                if (!ws){
                  return;
                }
                ws.send(JSON.stringify(data));
              }
              break;
          }
          break;
      }
    };
  },[ws]);
  useEffect(()=>{
    return ()=>{
      ws?.close();
      setBoard([]);
      setTurn("player1");
      setPlayer("player1");
      setWs(null);
      setFocusedPiece(null);
      setStorage1([]);
      setStorage2([]);
      setPutPiece(undefined);
      setPieceTypes([]);
      setMessages([]);
      setMenubarState({chat:false,storage:false});
    };
  },[]);
  return (
    <div className="game">
      <Modal open={!!text} onClose={()=>{setText(null)}}>
        <Paper sx={style}>
          <h4>{text}</h4>
          <Button onClick={()=>navigate("/")}>OK</Button>
        </Paper>
      </Modal>
      <Modal open={menubarState.chat} onClose={()=>setMenubarState((s)=>{return {...s,chat:false}})}>
        <Chat/>
      </Modal>
      <Modal open={menubarState.storage} onClose={()=>setMenubarState((s)=>{return {...s,storage:false}})}>
        <PieceStorage/>
      </Modal>
      <PromotionDialog event={promotionEvent} onClose={()=>{setPromotionEvent(null)}}/>
      <Menu/>
      <Board/>
    </div>
  );
}
