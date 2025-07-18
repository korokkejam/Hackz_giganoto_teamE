import "./styles/Game.css";
import Board from "../components/layout/Board";
import {useEffect,useRef,useState} from "react";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {additionalUIAtom, boardAtom, filesAtom, focusedPieceAtom, menubarStateAtom, messagesAtom,pieceStorage2Atom,pieceStorageAtom,pieceTypesAtom,playerAtom,putPieceAtom,turnAtom,wsAtom, zAtom} from "../state";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import {AudioEvent, CaptureEvent, ChangeBoardEvent, ChatEvent, DropEvent, EndEvent, FileEvent, Game, MoveEvent, Piece, PromotionCheckEvent, PromotionEvent, Request, ReturnEvent, TurnEvent, UIEvent, WarpEvent} from "shogi2-types";
import {CSSProperties} from "@mui/material";
import PieceStorage from "../components/layout/PieceStorage";
import Menu from "../components/layout/Menu";
import Chat from "../components/layout/Chat";
import PromotionDialog from "../components/layout/PromotionDialog";
import { ReservationEvent } from "shogi2-types/dist/esm/events/ReservationEvent";
import { CustomUI } from "../components/layout/CustomUI";
import {generateUUID} from "../features/uuid";

const style:CSSProperties={
  position:"absolute",
  width:"300px",
  textAlign:"center",
  left:"50%",
  top:"30%",
  transform:"translate(-50%,-50%)",
  textWrap:"wrap"
};

export default function Game(){
  const files=useAtomValue(filesAtom);
  const setZ=useSetAtom(zAtom);
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
  const setFiles=useSetAtom(filesAtom);
  const setPutPiece=useSetAtom(putPieceAtom);
  const [additionalUI,setAdditionalUI]=useAtom(additionalUIAtom);
  const setPieceTypes=useSetAtom(pieceTypesAtom);
  const filesRef=useRef<{id:string,url:string}[]>([]);
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
        case "ready":
          {
            const game:Game=d.content;
            setBoard(game.boards);
            setTurn(game.turn);
            if (player==="player1"){
              setZ(game.player1_current_board)
              setStorage1(game.player1_storage);
              setStorage2(game.player2_storage);
              // setAdditionalUI(game.ui1);
            }else{
              setZ(game.player2_current_board)
              setStorage1(game.player2_storage);
              setStorage2(game.player1_storage);
              // setAdditionalUI(game.ui2);
            }
            setPieceTypes(game.pieces);
            setMessages(game.messages);
          }
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
            case "ui":
              {
                const data:Request<UIEvent>=d;
                setAdditionalUI(data.content.data);
              }
              break;
            case "reservation":
              {
                const data:Request<ReservationEvent>=d;
                setTimeout(()=>{
                  const req:Request<ReservationEvent>={
                    head:"event",
                    content:new ReservationEvent(generateUUID(),{...data.content.data}),
                    sender:player
                  };
                  ws.send(JSON.stringify(req));
                },data.content.data.millis);
              }
              break;
            case "warp":
              {
                const data:Request<WarpEvent>=d;
                setZ(data.content.data.z);
              }
              break;
            case "change_board":
              {
                const data:Request<ChangeBoardEvent>=d;
                setBoard(data.content.data.boards);
              }
              break;
            case "move":
              {
                const data:Request<MoveEvent>=d;
                const e=data.content.data;
                setBoard((boards)=>boards.map((board,pz)=>board.map((row,py)=>row.map((s,px)=>{
                  if (e.before_pos.x===px && e.before_pos.y===py && e.before_pos.z===pz){
                    return {...s,piece:null};
                  }else if (e.after_pos.x===px && e.after_pos.y===py && e.after_pos.z===pz){
                    return {...s,piece:e.piece};
                  }else{
                    return {...s};
                  }
                }))));
              }
              break;
            case "turn":
              {
                const data:Request<TurnEvent>=d;
                setTurn(data.content.data.player);
                console.log(data.content.data.player);
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
                setBoard((boards)=>boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>{
                  if (x===data.content.data.pos.x && y===data.content.data.pos.y && z===data.content.data.pos.z){
                    return {piece:data.content.data.piece};
                  }else{
                    return {...s};
                  }
                }))));
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
                  setStorage1((storage1)=>storage1.filter((p)=>p.id!==data.content.data.piece.id));
                  setBoard((boards)=>boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>{
                    if (x===data.content.data.pos.x && y===data.content.data.pos.y && z===data.content.data.pos.z){
                      return {...s,piece:data.content.data.piece};
                    }else{
                      return {...s};
                    }
                  }))));
                }else{
                  setStorage2((storage2)=>storage2.filter((p)=>p.id!==data.content.data.piece.id));
                  setBoard((boards)=>boards.map((board,z)=>board.map((row,y)=>row.map((s,x)=>{
                    if (x===data.content.data.pos.x && y===data.content.data.pos.y && z===data.content.data.pos.z){
                      return {...s,piece:data.content.data.piece};
                    }else{
                      return {...s};
                    }
                  }))));
                }
              }
              break;
            case "file":
              {
                const data:Request<FileEvent>=d;
                const bin=atob(data.content.data.content);
                const byte=new Uint8Array([...bin].map((char)=>char.charCodeAt(0)));
                const blob=new Blob([byte],{type:data.content.data.mimetype});
                const url = URL.createObjectURL(blob);
                const id=data.content.data.id;
                setFiles((files)=>[...files,{id,url}]);
                console.log({id,url});
              }
              break;
            case "return":
              {
                const data:Request<ReturnEvent>=d;
                const {request,millis}=data.content.data;
                setTimeout(()=>{
                  ws.send(JSON.stringify(request));
                },millis);
              }
              break;
            case "audio":
              {
                const data:Request<AudioEvent>=d;
                const file=filesRef.current.find((f)=>f.id===data.content.data.id);
                if (file){
                  const audio=new Audio(file.url);
                  audio.play();
                }
                console.log(filesRef.current);
                console.log(file);
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
      setZ(0);
      setFiles([]);
      setAdditionalUI({menu1:[],menu2:[]});
    };
  },[]);
  useEffect(()=>{
    filesRef.current=files;
  },[files]);
  return (
    <div className="game">
      <div className="container">
        {additionalUI.background?<CustomUI ui={additionalUI.background}/>:null}
      </div>
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
      <div className="container">
        {additionalUI.foreground?<CustomUI ui={additionalUI.foreground}/>:null}
      </div>
    </div>
  );
}
