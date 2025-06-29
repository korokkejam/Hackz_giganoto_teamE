import "./styles/Menu.css";
import ChatIcon from '@mui/icons-material/Chat';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {menubarStateAtom} from "../../state";
import {useSetAtom} from "jotai";
import GridViewIcon from '@mui/icons-material/GridView';

export default function Menu(){
  const setMenubarState=useSetAtom(menubarStateAtom);
  const onChangeChat=()=>{
    setMenubarState((menubarState)=>{
      return {...menubarState,chat:true};
    });
  };
  const onChangeStorage=()=>{
    setMenubarState((menubarState)=>{
      return {...menubarState,storage:true};
    });
  };
  return (
    <div style={{textAlign:"center"}} className="menubar">
      <Tooltip title="持ち駒"><Button onClick={onChangeStorage}><GridViewIcon/></Button></Tooltip>
      <Tooltip title="チャット"><Button onClick={onChangeChat}><ChatIcon/></Button></Tooltip>
    </div>
  );
}
