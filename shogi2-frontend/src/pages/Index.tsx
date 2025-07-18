import "./styles/Index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";
import {wsAtom,playerAtom,boardAtom, filesAtom, additionalUIAtom, turnAtom} from "../state";
import {useSetAtom} from "jotai";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ChangeBoardEvent, FileEvent, Game, Request, TurnEvent, UIEvent} from "shogi2-types";

const host="localhost:3000";
// const host="10.19.7.67:3000";

export default function Index(){
  const setFiles=useSetAtom(filesAtom);
  const [name,setName]=useState<string>("");
  const [error,setError]=useState<string>("");
  const setWs=useSetAtom(wsAtom);
  const setPlayer=useSetAtom(playerAtom);
  const setBoard=useSetAtom(boardAtom);
  const navigate=useNavigate();
  const setAdditionalUI=useSetAtom(additionalUIAtom);
  const [loading,setLoading]=useState<boolean>(false);
  const setTurn=useSetAtom(turnAtom);
  const checkRoomExists=()=>{
    if (!name){
      return;
    }
    fetch(`http://${host}/room/check/${name}`).then((d)=>{
      d.text().then((text)=>{
        if (text==="yes"){
          enterRoom();
        }else{
          setError("その部屋はありません");
        }
      });
    });
  };
  const enterRoom=()=>{
    if (!name){
      return;
    }
    const ws=new WebSocket(`ws://${host}/room/enter/${name}`);
    ws.onmessage=((e:MessageEvent)=>{
      const d:Request<any>=JSON.parse(e.data);
      if (d.head==="ready"){
        const game:Game=d.content;
        setBoard(game.boards);
        setWs(ws);
        setPlayer("player2");
        navigate("/game");
      }else{
        message(e);
      }
    });
  };
  const createRoom=()=>{
    if (!name){
      return;
    }
    const ws=new WebSocket(`ws://${host}/room/create/${name}`);
    ws.onmessage=((e:MessageEvent)=>{
      const d:Request<any>=JSON.parse(e.data);
      if (d.head==="ready"){
        const game:Game=d.content;
        setLoading(false);
        setBoard(game.boards);
        setWs(ws);
        navigate("/game");
      }else{
        message(e);
      }
    });
    ws.onopen=()=>{
      setPlayer("player1");
      setLoading(true);
      setWs(ws);
    }
  };
  const message=(e:MessageEvent)=>{
    const data=e.data;
    const d:Request<any>=JSON.parse(data);
    switch (d.head){
      case "event":
        const event:Event=d.content;
        switch (event.type){
          case "turn":
            {
              const data:Request<TurnEvent>=d;
              setTurn(data.content.data.player);
            }
            break;
          case "change_board":
            {
              const data:Request<ChangeBoardEvent>=d;
              setBoard(data.content.data.boards);
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
            }
            break;
          case "ui":
            {
              const data:Request<UIEvent>=d;
              setAdditionalUI(data.content.data);
            }
            break;
        }
        break;
    }
  };
  return (
    <div className="index">
      {loading
      ? <div className="match-box">
          <CircularProgress/>
          <h4>{name}で待機中...</h4>
        </div>
      : <div className="match-box">
          <TextField
            variant="standard"
            fullWidth
            label="部屋名"
            error={!!error}
            helperText={error}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <div className="match-box-buttons">
            <Button className="match-box-button" onClick={createRoom}>部屋を作る</Button>
            <Button className="match-box-button" onClick={checkRoomExists}>部屋に入る</Button>
          </div>
        </div>
      }
    </div>
  );
}
