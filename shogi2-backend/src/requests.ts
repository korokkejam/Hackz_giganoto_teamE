import { Context } from "hono";
import { addGame, getMods, getRooms, getGame } from "./state";
import { CreateRoomRequest, Player } from "shogi2-types";
import { Client } from "./type";
import { UpgradeWebSocket } from "hono/ws";
import { accept_player, close_room, update } from "./handle_websocket";
import { Game } from "./game";

export function get_modlist(c:Context){
  const mod_list=getMods().map((mod)=>mod.identifier);
  return c.text(JSON.stringify(mod_list));
};

export function check_room_name(c:Context){
  const id=c.req.param("id");
  const rooms=getRooms();
  console.log(rooms.includes(id)?"exist":"not exist");
  return c.text(rooms.includes(id)?"true":"false");
}

export async function create_room(c:Context){
  const req=await c.req.json<CreateRoomRequest>();
  const enable_mods=req.mods.map((identifier)=>identifier.id);
  const room_name=req.name;
  const mods=getMods().filter((mod)=>enable_mods.includes(mod.identifier.id));
  const client:Client={ws1:null,ws2:null,room_name};
  const game=new Game(client,mods);
  addGame(game);
  return c.text("success");
}

export async function enter_room(c:Context){
  const id=c.req.param("id");
  const rooms=getRooms();
  if (rooms.includes(id)){
    return c.text("success");
  }else{
    return c.text("failed");
  }
}

export function connect(upgradeWebSocket:UpgradeWebSocket){
  return upgradeWebSocket((c:Context)=>{
    const room_id=c.req.param("id");
    const player=c.req.param("player") as Player;
    const game=getGame(room_id);
    return {
      onMessage:update(game,player),
      onOpen:accept_player(game,player),
      onClose:close_room(game,player),
      onError(_event){}
    };
  })
};

export function debug(c:Context){
  const id=c.req.param("id");
  const game=getGame(id);
  if (game){
    return c.json(game.data);
  }else{
    return c.text("not found");
  }
}
