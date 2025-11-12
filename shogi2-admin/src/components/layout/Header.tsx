import { useAtom, useSetAtom } from "jotai";
import "./styles/Header.css";
import { gamesAtom, loginAtom, modRequestsAtom } from "../../state";
import { Button, CSSProperties, Modal, Paper, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { ipaddress } from "../../ipaddress";

const style:CSSProperties={
  position:"fixed",
  left:"50%",
  top:"50%",
  transform:"translate(-50%,-50%)",
};

export default function Header(){
  const [login,setLogin]=useAtom(loginAtom);
  const [openDialog,setOpenDialog]=useState<boolean>(false);
  const setGames=useSetAtom(gamesAtom);
  const setRequests=useSetAtom(modRequestsAtom);
  const passwordRef=useRef<HTMLInputElement>(null);
  const send_password=()=>{
    const password=passwordRef.current?.value;
    if (!password){
      return;
    }
    fetch(`http://${ipaddress}:3000/admin/login/${password}`).then((response)=>{
      response.text().then((result)=>{
      console.log(result);
        if (result==="success"){
          setLogin(true);
          setOpenDialog(false);
        }
      });
    });
  };
  const cancel=()=>{
    setOpenDialog(false);
  };
  const update=()=>{
    fetch(`http://${ipaddress}:3000/admin/games`).then((response)=>{
      response.json().then((result)=>{
        setGames(result);
      });
    });
    fetch(`http://${ipaddress}:3000/admin/mods`).then((response)=>{
      response.json().then((result)=>{
        setRequests(result);
      });
    });
  };
  return (
    <div className="header">
      <Modal open={openDialog} onClose={()=>{setOpenDialog(false)}}>
        <Paper sx={style}>
          <div className="login-dialog">
            <TextField variant="standard" label="パスワード" type="password" inputRef={passwordRef} fullWidth/>
            <div>
              <Button onClick={send_password}>ログイン</Button>
              <Button onClick={cancel}>キャンセル</Button>
            </div>
          </div>
        </Paper>
      </Modal>
      <Button onClick={()=>{setOpenDialog(true)}}>{login?"ログアウト":"ログイン"}</Button>
      {login?<Button onClick={update}>更新</Button>:null}
      {login?<Button onClick={()=>fetch(`http://${ipaddress}:3000/admin/server/stop`)}>サーバー停止</Button>:null}
    </div>
  );
}
