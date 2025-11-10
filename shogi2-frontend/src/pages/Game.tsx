import { useAtom, useAtomValue } from "jotai";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { gameDataAtom, openCapturedPiecesAtom, playerAtom, roomNameAtom, selectedPieceAtom } from "../state";
import { AnswerEvent, BoardRequest, CaptureRequest, DropEvent, EndRequest, GameData, MoveEvent, MoveRequest, Piece, Player, PlayerRequest, Pos, QuestionRequest, Request, Square, SquareRequest, TurnRequest } from "shogi2-types";
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
import GameEnd from "./components/GameEnd";

const centerStyle:CSSProperties={
  position:"fixed",
  left:"50%",
  top:"50%",
  transform:"translate(-50%,-50%)"
};

export default function Game(){
  const open=useAtomValue(openCapturedPiecesAtom);
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
  const [winner,setWinner]=useState<Player|null>(null);
  const [selectedPiece,setSelectedPiece]=useAtom(selectedPieceAtom);
  const [sp,setSp]=useState<Piece|null>(null);
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
    if (!piece && selectedPiece){
      const piece:Piece={
        ...selectedPiece,
        position:{x,y},
        player
      };
      const square:Square={
        piece,
        position:{x,y},
        image:undefined
      };
      const event=new DropEvent(square);
      const ws=websocketRef.current;
      if (!ws){
        return;
      }
      ws.send(event.json());
      setSelectedPiece(null);
    }
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
    if (!player){
      return;
    }
    const rect=canvas.getBoundingClientRect();
    const x=e.clientX-rect.x;
    const y=e.clientY-rect.y;
    setMousePos({x,y});
    if (selectedPiece){
      const stepx=rect.width/gameData.board.size.w;
      const stepy=rect.height/gameData.board.size.h;
      const x2=Math.floor((x ?? 0)/stepx);
      const y2=Math.floor((y ?? 0)/stepy);
      const x3=player==="player1"?x2:gameData.board.size.w-x2-1;
      const y3=player==="player1"?y2:gameData.board.size.h-y2-1;
      const new_sp:Piece={
        ...selectedPiece,
        player,
        position:{x:x3,y:y3}
      };
      setSp(new_sp);
    }
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
      draw_board(canvas,ctx,gameData,player,mousePos,focusedPiece,sp);
    }
  });
  const board_request=(request:Request,data:GameData):GameData=>{
    const r=request as BoardRequest;
    const board=r.board;
    return {...data,board};
  };
  const turn_request=(request:Request,data:GameData):GameData=>{
    const r=request as TurnRequest;
    return {...data,turn:r.player};
  };
  const chat_request=(_request:Request,data:GameData):GameData=>{
    return data;
  };
  const file_request=(_request:Request,data:GameData):GameData=>{
    return data;
  };
  const audio_request=(_request:Request,data:GameData):GameData=>{
    return data;
  };
  const square_request=(request:Request,data:GameData):GameData=>{
    const r=request as SquareRequest;
    const square=r.square;
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
  };
  const end_request=(request:Request,data:GameData):GameData=>{
    const r=request as EndRequest;
    setWinner(r.winner);
    return data;
  };
  const player_request=(request:Request,data:GameData):GameData=>{
    const r=request as PlayerRequest;
    if (r.data.player==="player1"){
      return {...data,player1:r.data};
    }else{
      return {...data,player2:r.data};
    }
  };
  const ui_request=(_request:Request,data:GameData):GameData=>{
    return data;
  };
  const question_request=(request:Request,data:GameData):GameData=>{
    const r=request as QuestionRequest;
    const content=r.content;
    const choices=r.choices;
    const id=r.id;
    setQuestion({content,choices,id});
    return data;
  };
  const start_request=(_request:Request,data:GameData):GameData=>{
    setLoaded(true);
    return data;
  };
  const move_request=(request:Request,data:GameData):GameData=>{
    if (!player){
      return data;
    }
    const r=request as MoveRequest;
    const p1=r.piece.position;
    const p2=r.position2;
    const piece=r.piece;
    const canvas=canvasRef.current;
    if (!canvas){
      return data;
    }
    const ctx=canvas.getContext("2d");
    if (!ctx){
      return data;
    }
    const board={
      ...data.board,
      squares:data.board.squares.map((square)=>{
        if (square.position.x===p1.x && square.position.y===p1.y){
          return {...square,piece:null};
        }
        return square;
      })
    };
    const new_data={...data,board};
    animation(piece,p2,()=>{
      setGameData((data)=>({
        ...data,
        board:{
          ...board,
          squares:board.squares.map((square)=>{
            const {x:x2,y:y2}=square.position;
            if (p1.x===x2 && p1.y===y2){
              return {...square,piece:null};
            }else if (p2.x===x2 && p2.y===y2){
              return {...square,piece:{...piece,position:{x:x2,y:y2}}};
            }
            return square;
          })
        }
      }));
      setFocusedPiece(null);
    },ctx,canvas,new_data,player,mousePos);
    return new_data;
  };
  const capture_request=(request:Request,data:GameData):GameData=>{
    const r=request as CaptureRequest;
    const new_data={
      ...data,
      player1:{...data.player1,captured_pieces:r.player1_pieces},
      player2:{...data.player2,captured_pieces:r.player2_pieces}
    };
    return new_data;
  };
  const update=(request:Request,d:GameData)=>{
    let data={...d};
    request.then.forEach((r)=>{
      data=update(r,data);
    });
    switch (request.type){
      case "player":
        return player_request(request,data);
      case "ui":
        return ui_request(request,data);
      case "turn":
        return turn_request(request,data);
      case "end":
        return end_request(request,data);
      case "capture":
        return capture_request(request,data);
      case "chat":
        return chat_request(request,data);
      case "file":
        return file_request(request,data);
      case "board":
        return board_request(request,data);
      case "audio":
        return audio_request(request,data);
      case "square":
        return square_request(request,data);
      case "question":
        return question_request(request,data);
      case "start":
        return start_request(request,data);
      case "move":
        return move_request(request,data);
    }
  }
  useEffect(()=>{
    if (!player || !roomName){
      return;
    }
    const ws=new WebSocket(`ws://${ipaddress}:3000/room/connect/${roomName}/${player}`);
    websocketRef.current=ws;
    ws.onmessage=((e:MessageEvent)=>{
      const request:Request=JSON.parse(e.data);
      setGameData((data)=>{
        return update(request,data);
      });
    });
    ws.onclose=(e)=>{
      if (e.code===1008){
        navigate("/");
      }
    };
    return ()=>{
      if (websocketRef.current && websocketRef.current.readyState===WebSocket.OPEN){
        websocketRef.current.close(4000);
      }
    };
  },[player,roomName]);
  useEffect(()=>{
    console.log(gameData);
  },[gameData]);
  useEffect(()=>{
    setSp(null);
  },[selectedPiece]);
  return (
    <div>
      <Dialog question={question} send={sendAnswer} onClose={()=>{setQuestion(null)}}/>
      <Modal open={open}>
        <CapturedPieces/>
      </Modal>
      <Modal open={!!winner}>
        <GameEnd winner={winner}/>
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
