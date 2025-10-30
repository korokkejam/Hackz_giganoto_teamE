import { useAtom, useAtomValue } from "jotai";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { gameDataAtom, playerAtom, roomNameAtom } from "../state";
import { BoardRequest, Piece, Request } from "shogi2-types";
import { CircularProgress,CSSProperties } from "@mui/material";
import { useNavigate } from "react-router-dom";
import draw_board from "../features/board/draw_board";
import "./styles/Game.css";
import resize from "../features/resize";
import destination_candidate from "../features/board/destination_candidate";
import animation from "../features/board/animation";

const centerStyle:CSSProperties={
  position:"fixed",
  left:"50%",
  top:"50%",
  transform:"translate(-50%,-50%)"
};

export default function Game(){
  const navigate=useNavigate();
  const player=useAtomValue(playerAtom);
  const roomName=useAtomValue(roomNameAtom);
  const [loaded,setLoaded]=useState<boolean>(false);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const websocketRef=useRef<WebSocket|null>(null);
  const [gameData,setGameData]=useAtom(gameDataAtom);
  const [mousePos,setMousePos]=useState<{x:number,y:number}|null>(null);
  const [focusedPiece,setFocusedPiece]=useState<Piece|null>(null);
  const handleClick=(e:MouseEvent)=>{
    const canvas=canvasRef.current;
    if (!canvas || !player){
      return;
    }
    const rect=canvas.getBoundingClientRect();
    const mouseX=e.clientX-rect.x;
    const mouseY=e.clientY-rect.y;
    const x=Math.floor(mouseX/(rect.width/gameData.board.size.w));
    const y=Math.floor(mouseY/(rect.height/gameData.board.size.h));
    const square=gameData.board.squares.find((square)=>square.position.x===x && square.position.y===y);
    const piece=square?.piece;
    if (focusedPiece){
      const candidate=destination_candidate(focusedPiece,player,gameData);
      const flag=candidate.some((pos)=>focusedPiece.position.x+pos.x===x && focusedPiece.position.y+pos.y===y);
      if (flag){
        const ctx=canvas.getContext("2d");
        if (!ctx){
          return;
        }
        const new_data={
          ...gameData,
          board:{
            ...gameData.board,
            squares:gameData.board.squares.filter((square)=>{
              return square.position.x!==focusedPiece.position.x || square.position.y!==focusedPiece.position.y;
            })
          }
        };
        animation(focusedPiece,{x,y},()=>{
          const {x:x1,y:y1}=focusedPiece.position;
          setGameData((data)=>{
            return {
              ...data,
              board:{
                ...data.board,
                squares:data.board.squares.map((square)=>{
                  const {x:x2,y:y2}=square.position;
                  if (x1===x2 && y1===y2){
                    square.piece=null;
                  }else if (x===x2 && y===y2){
                    square.piece={...focusedPiece,position:{x:x2,y:y2}};
                  }
                  return square;
                })
              }
            };
          });
          setFocusedPiece(null);
        },ctx,canvas,new_data,player,mousePos);
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
    const ws=new WebSocket(`ws://localhost:3000/room/connect/${roomName}/${player}`);
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
          break;
        case "chat":
          break;
        case "file":
          break;
        case "board":
          const r=request as BoardRequest;
          const board=r.board;
          setGameData((data)=>{
            return {...data,board};
          });
          break;
        case "audio":
          break;
        case "square":
          break;
        case "question":
          break;
        case "start":
          setLoaded(true);
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
      {loaded?
        <div>
          <div className="header">
          </div>
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
