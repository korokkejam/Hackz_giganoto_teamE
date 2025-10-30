import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import "./styles/Home.css";
import CreateRoomDialog from "./components/CreateRoomDialog";
import EnterRoomDialog from "./components/EnterRoomDialog";
import { useSetAtom } from "jotai";
import { playerAtom, roomNameAtom } from "../state";

export default function Home(){
  const [openCreateDialog,setOpenCreateDialog]=useState<boolean>(false);
  const [openEnterDialog,setOpenEnterDialog]=useState<boolean>(false);
  const setPlayer=useSetAtom(playerAtom);
  const setRoomName=useSetAtom(roomNameAtom);
  useEffect(()=>{
    setPlayer(null);
    setRoomName(null);
  },[]);
  return (
    <div className="home">
      <CreateRoomDialog open={openCreateDialog} onClose={()=>{setOpenCreateDialog(false)}}/>
      <EnterRoomDialog open={openEnterDialog} onClose={()=>{setOpenEnterDialog(false)}}/>
      <div>
        <Button variant="contained" onClick={()=>{setOpenCreateDialog(true)}}>部屋を作成</Button>
        <Button variant="contained" onClick={()=>{setOpenEnterDialog(true)}}>部屋に入る</Button>
      </div>
    </div>
  );
}
