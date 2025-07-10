import "./styles/Menu.css";
import ChatIcon from '@mui/icons-material/Chat';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {additionalUIAtom, menubarStateAtom} from "../../state";
import {useAtomValue, useSetAtom} from "jotai";
import GridViewIcon from '@mui/icons-material/GridView';
import { CustomUI } from "./CustomUI";

export default function Menu(){
  const setMenubarState=useSetAtom(menubarStateAtom);
  const additionalUI=useAtomValue(additionalUIAtom);
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
    <div className="menubar">
      {additionalUI.menu1.map((ui)=><CustomUI ui={ui}/>)}
      <Tooltip title="持ち駒"><Button onClick={onChangeStorage}><GridViewIcon/></Button></Tooltip>
      <Tooltip title="チャット"><Button onClick={onChangeChat}><ChatIcon/></Button></Tooltip>
      {additionalUI.menu2.map((ui)=><CustomUI ui={ui}/>)}
    </div>
  );
}
