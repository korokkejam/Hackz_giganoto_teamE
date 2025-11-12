import { Button, CSSProperties, Modal, Paper, TextField } from "@mui/material";
import { useRef } from "react";
import { ModRequest } from "shogi2-types";
import { ipaddress } from "../../ipaddress";

const style:CSSProperties={
  position:"fixed",
  left:"50%",
  top:"30%",
  transform:"translate(-50%,-50%)",
  width:"300px",
  padding:"10px",
  outline:"none"
};

export default function AddModDialog({open,onClose}:{open:boolean,onClose:()=>void}){
  const repoRef=useRef<HTMLInputElement>(null);
  const msgRef=useRef<HTMLInputElement>(null);
  const send=()=>{
    const repo=repoRef.current?.value;
    if (!repo){
      return;
    }
    const msg=msgRef.current?.value;
    if (!msg){
      return;
    }
    const request:ModRequest={
      repo,
      msg,
      id:crypto.randomUUID(),
      type:"add"
    };
    fetch(`http://${ipaddress}:3000/request/mods`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(request)
    });
    onClose();
  };
  const cancel=()=>{
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        <TextField fullWidth inputRef={repoRef} variant="standard" label="リポジトリ" sx={{marginBottom:"10px"}}/>
        <TextField fullWidth inputRef={msgRef} multiline label="メッセージ"/>
        <div style={{display:"flex",justifyContent:"space-around"}}>
          <Button onClick={send}>送信</Button>
          <Button onClick={cancel}>キャンセル</Button>
        </div>
      </Paper>
    </Modal>
  );
}
