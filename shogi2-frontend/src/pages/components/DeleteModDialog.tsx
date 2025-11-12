import { Button, CSSProperties, Modal, Paper, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ModIdentifier, ModRequest } from "shogi2-types";
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

export default function DeleteModDialog({open,onClose}:{open:boolean,onClose:()=>void}){
  const [mods,setMods]=useState<ModIdentifier[]>([]);
  const nameRef=useRef<HTMLInputElement>(null);
  const msgRef=useRef<HTMLInputElement>(null);
  const send=()=>{
    const name=nameRef.current?.value;
    if (!name){
      return;
    }
    const mod=mods.find((mod)=>mod.name===name);
    if (!mod){
      return;
    }
    const msg=msgRef.current?.value;
    if (!msg){
      return;
    }
    const request:ModRequest={
      repo:mod.name,
      msg,
      id:crypto.randomUUID(),
      type:"delete"
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
  useEffect(()=>{
    fetch(`http://${ipaddress}:3000/mod/list`).then((d)=>{
      d.text().then((text)=>{
        const mod_list:ModIdentifier[]=JSON.parse(text);
        setMods(mod_list);
      });
    });
  },[]);
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        <TextField fullWidth inputRef={nameRef} variant="standard" label="MOD名" sx={{marginBottom:"10px"}}/>
        <TextField fullWidth inputRef={msgRef} multiline label="メッセージ"/>
        <div style={{display:"flex",justifyContent:"space-around"}}>
          <Button onClick={send}>送信</Button>
          <Button onClick={cancel}>キャンセル</Button>
        </div>
      </Paper>
    </Modal>
  );
}
