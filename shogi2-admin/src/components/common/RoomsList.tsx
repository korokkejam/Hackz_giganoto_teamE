import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useAtomValue } from "jotai";
import { gamesAtom } from "../../state";

export default function RoomsList({onClick}:{onClick:(name:string)=>void}){
  const games=useAtomValue(gamesAtom);
  return (
    <div>
      <List>
        {games.map((game)=>{
          return (
            <ListItem>
              <ListItemButton onClick={()=>{onClick(game.name)}}>
                <ListItemText primary={game.name}/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
