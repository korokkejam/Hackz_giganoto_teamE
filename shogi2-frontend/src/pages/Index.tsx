import "./styles/Index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";
import {wsAtom,playerAtom,boardAtom, zAtom} from "../state";
import {useAtomValue, useSetAtom} from "jotai";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Game, Request} from "shogi2-types";

export default function Index(){
  const z=useAtomValue(zAtom);
  const [name,setName]=useState<string>("");
  const [error,setError]=useState<string>("");
  const setWs=useSetAtom(wsAtom);
  const setPlayer=useSetAtom(playerAtom);
  const setBoard=useSetAtom(boardAtom);
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
    ws.onmessage=((e:MessageEvent)=>{
      const d:Request<any>=JSON.parse(e.data);
      if (d.head==="ready"){
        const game:Game=d.content;
        const board=game.boards[z];
        setBoard(board);
        setWs(ws);
        setPlayer("player2");
        navigate("/game");
      }
    });
  };
  const createRoom=()=>{
    if (!name){
      return;
    }
    const ws=new WebSocket(`ws://localhost:3000/room/create/${name}`);
    ws.onmessage=((e:MessageEvent)=>{
      const d:Request<any>=JSON.parse(e.data);
      if (d.head==="ready"){
        const game:Game=d.content;
        setLoading(false);
        const board=game.boards[z];
        setBoard(board);
        setWs(ws);
        navigate("/game");
      }
    });
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
