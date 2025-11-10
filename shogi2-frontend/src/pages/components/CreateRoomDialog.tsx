import {useEffect, useRef, useState} from "react";
import {Modal,Paper,CSSProperties, List, ListItem} from "@mui/material";
import "./styles/CreateRoomDialog.css";
import {CreateRoomRequest, ModIdentifier} from "shogi2-types";
import ModListItem from "./ModListItem";
import { useSetAtom } from "jotai";
import { playerAtom, roomNameAtom } from "../../state";
import { useNavigate } from "react-router-dom";
import { ipaddress } from "../../ipaddress";

const dialogStyle:CSSProperties={
  position:"fixed",
  left:"50%",
  top:"15%",
  transform:"translateX(-50%)",
  outline:"none"
};

export default function CreateRoomDialog({open,onClose}:{open:boolean,onClose:()=>void}){
  const navigate=useNavigate();
  const [mods,setMods]=useState<ModIdentifier[]>([]);
  const [enableMods,setEnableMods]=useState<ModIdentifier[]>([]);
  const inputRef=useRef<HTMLInputElement>(null);
  const setRoomName=useSetAtom(roomNameAtom);
  const setPlayer=useSetAtom(playerAtom);
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
    const create_room_request:CreateRoomRequest={
      name,
      mods:enableMods
    };
    fetch(`http://${ipaddress}:3000/room/check/${name}`).then((res)=>{
      res.text().then((result)=>{
        if (result==="false"){
          fetch(`http://${ipaddress}:3000/room/create`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(create_room_request)
          }).then((res)=>{
            res.text().then((result)=>{
              if (result==="success"){
                setRoomName(name);
                setPlayer("player1");
                navigate("/game");
              }else{
              }
            })
          });
        }
      });
    });
  };
  const modAdd=(m:ModIdentifier)=>{
    setEnableMods([...enableMods,m]);
  };
  const modDelete=(m:ModIdentifier)=>{
    setEnableMods(enableMods.filter((mod)=>mod.id!==m.id));
  };
  useEffect(()=>{
    fetch(`http://${ipaddress}:3000/mod/list`).then((d)=>{
      d.text().then((text)=>{
        const mod_list:ModIdentifier[]=JSON.parse(text);
        setMods(mod_list);
      });
    });
  },[open]);
  useEffect(()=>{
    setEnableMods(mods);
  },[mods]);
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={dialogStyle}>
        <div className="create-room-dialog">
          <div>
            <button onClick={handle}>作成</button>
          </div>
          <div>
            <p>部屋の名前</p>
            <input ref={inputRef}/>
          </div>
          <div>
            <h1>導入するMod</h1>
            <List className="create-room-dialog-list">
              {mods.map((mod)=>
                <ListItem>
                  <ModListItem mod={mod} modAdd={modAdd} modDelete={modDelete}/>
                </ListItem>
              )}
            </List>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
