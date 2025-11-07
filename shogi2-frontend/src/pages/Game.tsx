import { useAtom, useAtomValue } from "jotai";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { gameDataAtom, openCapturedPieces, playerAtom, roomNameAtom } from "../state";
import { AnswerEvent, BoardRequest, MoveEvent, MoveRequest, Piece, Pos, QuestionRequest, Request, SquareRequest, TurnRequest } from "shogi2-types";
import { CircularProgress,CSSProperties, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import draw_board from "../features/board/draw_board";
import "./styles/Game.css";
import resize from "../features/resize";
import destination_candidate from "../features/board/destination_candidate";
import animation from "../features/board/animation";
import Dialog from "./components/Dialog";
import Header from "../components/layout/Header";
import CapturedPieces from "./components/CapturedPieces";
import { ipaddress } from "../ipaddress";

const centerStyle:CSSProperties={
  position:"fixed",
  left:"50%",
  top:"50%",
  transform:"translate(-50%,-50%)"
};

export default function Game(){
  const open=useAtomValue(openCapturedPieces);
  const navigate=useNavigate();
  const player=useAtomValue(playerAtom);
  const roomName=useAtomValue(roomNameAtom);
  const [loaded,setLoaded]=useState<boolean>(false);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const websocketRef=useRef<WebSocket|null>(null);
  const [gameData,setGameData]=useAtom(gameDataAtom);
  const [mousePos,setMousePos]=useState<Pos|null>(null);
  const [focusedPiece,setFocusedPiece]=useState<Piece|null>(null);
  const [question,setQuestion]=useState<{content:string,choices:{display:string,key:string}[],id:string}|null>(null);
  const sendAnswer=(key:string,id:string)=>{
    const event=new AnswerEvent(id,key);
    const ws=websocketRef.current;
    if (!ws){
      return;
    }
    ws.send(event.json());
  };
  const handleClick=(e:MouseEvent)=>{
    const canvas=canvasRef.current;
    if (!canvas || !player){
      return;
    }
    if (player!==gameData.turn){
      return;
    }
    const rect=canvas.getBoundingClientRect();
    const mouseX=e.clientX-rect.x;
    const mouseY=e.clientY-rect.y;
    const X=Math.floor(mouseX/(rect.width/gameData.board.size.w));
    const Y=Math.floor(mouseY/(rect.height/gameData.board.size.h));
    const x=player==="player1"?X:gameData.board.size.w-X-1;
    const y=player==="player1"?Y:gameData.board.size.h-Y-1;
    const square=gameData.board.squares.find((square)=>square.position.x===x && square.position.y===y);
    const piece=square?.piece;
    if (focusedPiece){
      const candidate=destination_candidate(focusedPiece,player,gameData);
      const flag=candidate.some((pos)=>focusedPiece.position.x+pos.x===x && focusedPiece.position.y+pos.y===y);
      if (flag){
        const event=new MoveEvent(focusedPiece,{x,y});
        const ws=websocketRef.current;
        if (!ws){
          return;
        }
        ws.send(event.json());
      }
    }
    if (!piece){
      return;
    }
    if (piece.player!==player){
      return;
    }
    setFocusedPiece((p)=>{
      if (p?.id===piece.id){
        return null;
      }
      return piece
    });
  };
  const mouseMove=(e:MouseEvent)=>{
    const canvas=canvasRef.current;
    if (!canvas){
      return;
    }
    const rect=canvas.getBoundingClientRect();
    const x=e.clientX-rect.x;
    const y=e.clientY-rect.y;
    setMousePos({x,y});
  };
  useEffect(()=>{
    if (loaded){
      const canvas=canvasRef.current;
      if (!canvas){
        return;
      }
      const ctx=canvas.getContext("2d");
      if (!ctx){
        return;
      }
      resize(canvas,ctx);
      if (!player){
        return;
      }
      draw_board(canvas,ctx,gameData,player,mousePos,focusedPiece);
    }
  });
  useEffect(()=>{
    if (!player || !roomName){
      return;
    }
    const ws=new WebSocket(`ws://${ipaddress}:3000/room/connect/${roomName}/${player}`);
    websocketRef.current=ws;
    ws.onmessage=((e:MessageEvent)=>{
      const request:Request=JSON.parse(e.data);
      switch (request.type){
        case "player":
          break;
        case "ui":
          break;
        case "end":
          break;
        case "turn":
          {
            const r=request as TurnRequest;
            setTimeout(()=>{
              setGameData((data)=>({...data,turn:r.player}));
            },r.seconds*5000);
          }
          break;
        case "chat":
          break;
        case "file":
          break;
        case "board":
          {
            const r=request as BoardRequest;
            const board=r.board;
            setGameData((data)=>{
              return {...data,board};
            });
          }
          break;
        case "audio":
          break;
        case "square":
          {
            const r=request as SquareRequest;
            const square=r.square;
            console.log(square);
            setGameData((data)=>{
              return {
                ...data,
                board:{
                  ...data.board,
                  squares:data.board.squares.map((s)=>{
                    const {x,y}=s.position;
                    if (x===square.position.x && y===square.position.y){
                      return square;
                    }
                    return s;
                  })
                }
              };
            });
          }
          break;
        case "question":
          {
            const r=request as QuestionRequest;
            const content=r.content;
            const choices=r.choices;
            const id=r.id;
            setQuestion({content,choices,id});
          }
          break;
        case "start":
          setLoaded(true);
          break;
        case "move":
          {
            const r=request as MoveRequest;
            const p1=r.piece.position;
            const p2=r.position2;
            const piece=r.piece;
            const canvas=canvasRef.current;
            if (!canvas){
              return;
            }
            const ctx=canvas.getContext("2d");
            if (!ctx){
              return;
            }
            setGameData((old_data)=>{
              const new_data={
                ...old_data,
                board:{
                  ...old_data.board,
                  squares:old_data.board.squares.map((square)=>{
                    if (square.position.x===p1.x && square.position.y===p1.y){
                      square.piece=null;
                    }
                    return square;
                  })
                }
              };
              animation(piece,p2,()=>{
                setGameData({
                  ...new_data,
                  board:{
                    ...new_data.board,
                    squares:new_data.board.squares.map((square)=>{
                      const {x:x2,y:y2}=square.position;
                      if (p1.x===x2 && p1.y===y2){
                        square.piece=null;
                      }else if (p2.x===x2 && p2.y===y2){
                        square.piece={...piece,position:{x:x2,y:y2}};
                      }
                      return square;
                    })
                  }
                });
                setFocusedPiece(null);
              },ctx,canvas,new_data,player,mousePos);
              return new_data;
            });
          }
          break;
      }
    });
    ws.onclose=(e)=>{
      console.log("close");
      if (e.code===1008){
        console.log("reject");
        navigate("/");
      }
    };
    return ()=>{
      if (websocketRef.current && websocketRef.current.readyState===WebSocket.OPEN){
        websocketRef.current.close(4000);
      }
    };
  },[player,roomName]);
  return (
    <div>
      <Dialog question={question} send={sendAnswer} onClose={()=>{setQuestion(null)}}/>
      <Modal open={open}>
        <CapturedPieces/>
      </Modal>
      {loaded?
        <div>
          <Header/>
          <canvas ref={canvasRef} onClick={handleClick} onMouseMove={mouseMove}/>
        </div>:
        <div style={centerStyle}>
          <CircularProgress size={300} sx={{color:"#6ec7ff"}}/>
          <p style={{textAlign:"center",fontFamily:"ktegaki"}}>対戦相手を待っています...</p>
        </div>
      }
    </div>
  );
}
