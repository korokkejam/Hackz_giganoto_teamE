import Messages from "../common/Messages";
import Sender from "./Sender";
import "./styles/Chat.css";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import { useSetAtom } from "jotai";
import { menubarStateAtom } from "../../state";

export default function Chat(){
  const setMenubarState=useSetAtom(menubarStateAtom);
  return (
    <div className="chat">
      <Sender/>
      <Messages/>
      <div>
        <Button color="info" onClick={()=>setMenubarState((s)=>{return {...s,chat:false}})}><BackIcon/></Button>
      </div>
    </div>
  );
}
