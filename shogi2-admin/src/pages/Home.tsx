import LeftPanel from "../components/layout/LeftPanel";
import { List, ListItem, ListItemButton, ListItemText, Modal, Paper } from "@mui/material";
import "./styles/Home.css";
import RoomsList from "../components/common/RoomsList";
import CenterPanel from "../components/layout/CenterPanel";
import { useAtom, useAtomValue } from "jotai";
import { gamesAtom, modRequestsAtom } from "../state";
import { useState } from "react";
import { GameData, ModRequest } from "shogi2-types";
import ReactJson from "react-json-view";
import RightPanel from "../components/layout/RightPanel";
import ModRequestDialog from "../components/common/ModRequestDialog";

export default function Home(){
  const games=useAtomValue(gamesAtom);
  const [game,setGame]=useState<{name:string,data:GameData}|null>(null);
  const [request,setRequest]=useState<ModRequest|null>(null);
  const [requests,setRequests]=useAtom(modRequestsAtom);
  const openGame=(name:string)=>{
    const game=games.find((game)=>game.name===name);
    if (!game){
      return;
    }
    setGame(game);
  };
  return (
    <div className="home">
      <Modal open={!!request} onClose={()=>{setRequest(null)}}>
        <ModRequestDialog request={request} onClose={()=>{setRequest(null);setRequests((rs)=>rs.filter((r)=>r.id!==request?.id))}}/>
      </Modal>
      <LeftPanel>
        <h2 style={{margin:0,textAlign:"center",width:"290px",height:"50px"}}>部屋一覧</h2>
        <Paper sx={{width:"290px",height:"calc(100vh - 140px)"}} elevation={24}>
          <RoomsList onClick={openGame}/>
        </Paper>
      </LeftPanel>
      <CenterPanel>
        {game?<ReactJson src={game.data} theme="monokai" collapsed={true}/>:null}
      </CenterPanel>
      <RightPanel>
        <h2 style={{margin:0,textAlign:"center",width:"290px",height:"50px"}}>MOD追加リクエスト</h2>
        <Paper sx={{width:"290px",height:"calc(100vh - 140px)"}} elevation={24}>
          <List>
            {requests.map((request)=>{
              return (
                <ListItem>
                  <ListItemButton onClick={()=>{setRequest(request)}}>
                    <ListItemText primary={request.msg}/>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </RightPanel>
    </div>
  );
}
