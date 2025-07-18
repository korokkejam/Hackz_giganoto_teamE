import { useAtomValue } from "jotai";
import { useState } from "react";
import { playerAtom, wsAtom } from "../../state";
import {Request,ChatEvent, CommandEvent, CommandEventType} from "shogi2-types";
import TextField from "@mui/material/TextField";
import "./styles/Sender.css";
import InputAdornment from "@mui/material/InputAdornment";
import {generateUUID} from "../../features/uuid";

export default function Sender(){
  const [value,setValue]=useState<string>("");
  const ws=useAtomValue(wsAtom);
  const player=useAtomValue(playerAtom);
  const send=()=>{
    if (!value || !ws || !player){
      return;
    }
    if (value[0]==="/"){
      const args=value.split(" ");
      const e:CommandEventType={
        type:args[0].slice(1,args[0].length),
        option:args.slice(1,args.length),
        sender:player
      };
      const request:Request<CommandEvent>={
        head:"event",
        content:new CommandEvent(e,generateUUID()),
        sender:player
      };
      ws.send(JSON.stringify(request));
    }else{
      const request:Request<ChatEvent>={
        head:"event",
        content:new ChatEvent(value,player,generateUUID()),
        sender:player
      };
      ws.send(JSON.stringify(request));
    }
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
        onKeyDown={(e)=>{
          switch (e.key){
            case "Enter":
              send();
              break;
          }
        }}
      />
    </div>
  );
}
