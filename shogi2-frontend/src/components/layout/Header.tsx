import { IconButton } from "@mui/material";
import "./styles/Header.css";
import GridViewIcon from '@mui/icons-material/GridView';
import { useSetAtom } from "jotai";
import { openCapturedPieces } from "../../state";

export default function Header(){
  const setOpen=useSetAtom(openCapturedPieces);
  return (
    <div className="header">
      <div>
        <IconButton color="default" onClick={()=>setOpen((open)=>!open)}><GridViewIcon/></IconButton>
      </div>
    </div>
  );
}
