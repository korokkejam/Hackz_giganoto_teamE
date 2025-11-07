import {useRef} from "react";
import {Modal,Paper,CSSProperties} from "@mui/material";
import "./styles/CreateRoomDialog.css";
import { useSetAtom } from "jotai";
import { playerAtom, roomNameAtom } from "../../state";
import { useNavigate } from "react-router-dom";
import { ipaddress } from "../../ipaddress";

const dialogStyle:CSSProperties={
  position:"fixed",
  left:"50%",
  top:"30%",
  transform:"translate(-50%,-50%)",
  outline:"none"
};

export default function EnterRoomDialog({open,onClose}:{open:boolean,onClose:()=>void}){
  const inputRef=useRef<HTMLInputElement>(null);
  const setRoomName=useSetAtom(roomNameAtom);
  const setPlayer=useSetAtom(playerAtom);
  const navigate=useNavigate();
  const handle=()=>{
    if (!inputRef.current){
      return;
    }
    const room_name=inputRef.current.value;
    if (!room_name){
      return;
    }
    onClose();
    sendRequest(room_name);
  };
  const sendRequest=(name:string)=>{
    fetch(`http://${ipaddress}:3000/room/enter/${name}`).then((res)=>{
      res.text().then((result)=>{
        console.log(result);
        if (result==="success"){
          setRoomName(name);
          setPlayer((player)=>player?player:"player2");
          navigate("/game");
        }
      });
    });
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={dialogStyle}>
        <div className="create-room-dialog">
          <div>
            <button onClick={handle}>入室</button>
          </div>
          <div>
            <p>部屋の名前</p>
            <input ref={inputRef}/>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
