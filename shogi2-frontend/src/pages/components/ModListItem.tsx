import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ModIdentifier } from "shogi2-types";
import "./styles/ModListItem.css";
import { useState } from "react";

export default function ModListItem({mod,modAdd,modDelete}:{mod:ModIdentifier,modAdd:(m:ModIdentifier)=>void,modDelete:(m:ModIdentifier)=>void}){
  const [checked,setChecked]=useState<boolean>(true);
  const handleCheck=()=>{
    if (checked){
      modDelete(mod);
    }else{
      modAdd(mod);
    }
    setChecked(!checked);
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleCheck}>
        <ListItemText primary={<div style={{fontFamily:"ktegaki"}}>{mod.name}</div>}/>
        <ListItemIcon>
          <Checkbox checked={checked}/>
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
