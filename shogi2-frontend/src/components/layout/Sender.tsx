import { useAtomValue } from "jotai";
import { useState } from "react";
import { playerAtom, wsAtom } from "../../state";
import {Request,ChatEvent} from "shogi2-types";
import TextField from "@mui/material/TextField";
import "./styles/Sender.css";
import InputAdornment from "@mui/material/InputAdornment";

export default function Sender(){
  const [value,setValue]=useState<string>("");
  const ws=useAtomValue(wsAtom);
  const player=useAtomValue(playerAtom);
  const send=()=>{
    if (!value || !ws || !player){
      return;
    }
    const request:Request<ChatEvent>={head:"event",content:new ChatEvent(value,player,crypto.randomUUID()),sender:player};
    ws.send(JSON.stringify(request));
    setValue("");
  };
  return (
    <div className="sender">
      <TextField
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        fullWidth
        label="メッセージ"
        variant="filled"
        InputProps={{
          endAdornment:
            <InputAdornment position="end">
              <button onClick={send} className="sender-button">送信</button>
            </InputAdornment>
        }}
      />
    </div>
  );
}
