import "./styles/Index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";
import {wsAtom,playerAtom} from "../state";
import {useSetAtom} from "jotai";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Index(){
  const [name,setName]=useState<string>("");
  const [error,setError]=useState<string>("");
  const setWs=useSetAtom(wsAtom);
  const setPlayer=useSetAtom(playerAtom);
  const navigate=useNavigate();
  const [loading,setLoading]=useState<boolean>(false);
  const checkRoomExists=()=>{
    if (!name){
      return;
    }
    fetch(`http://localhost:3000/room/check/${name}`).then((d)=>{
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
    const ws=new WebSocket(`ws://localhost:3000/room/enter/${name}`);
    setWs(ws);
    setPlayer("player2");
    navigate("/game");
  };
  const createRoom=()=>{
    if (!name){
      return;
    }
    const ws=new WebSocket(`ws://localhost:3000/room/create/${name}`);
    ws.onmessage=(e:MessageEvent)=>{
      switch (e.data){
        case "ready":
          setLoading(false);
          navigate("/game");
          break;
        case "disconnected":
          navigate("/");
          break;
      }
    };
    ws.onopen=()=>{
      setPlayer("player1");
      setLoading(true);
      setWs(ws);
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
