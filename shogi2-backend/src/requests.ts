import { Context } from "hono";
import { addGame, getMods, getRooms, getGame, auth, addModRequest, getModRequests, getModRequest, addMod, deleteModRequest, deleteMod } from "./state";
import { CreateRoomRequest, ModRequest, Player, Mod, ModBaseClass } from "shogi2-types";
import { Client } from "./type";
import { UpgradeWebSocket } from "hono/ws";
import { accept_player, close_room, update } from "./handle_websocket";
import { Game } from "./game";
import git_clone from "git-clone";

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

export function admin_login(c:Context){
  const password=c.req.param("password");
  if (auth(password)){
    return c.text("success");
  }else{
    return c.text("rejected");
  }
}

export function admin_games(c:Context){
  const games=getRooms().map((room)=>{
    const game=getGame(room);
    if (!game){
      return;
    }
    return {name:room,data:game.data};
  }).filter((game)=>!!game);
  return c.json(games);
}

export async function request_mod(c:Context){
  const req=await c.req.json<ModRequest>();
  addModRequest(req);
  return c.text("ok");
}

export function get_mod_requests(c:Context){
  const requests=getModRequests();
  return c.json(requests);
}

export async function accept_mod_request(c:Context){
  const id=c.req.param("id");
  const request=getModRequest(id);
  deleteModRequest(id);
  if (!request){
    return c.text("cancel");
  }
  if (request.type==="add"){
    const dir=request.repo.split("/")[1];
    git_clone(`https://github.com/${request.repo}`,`./src/mods/${dir}`);
    const mod_class=await import(`./mods/${dir}/src/index`);
    const info=await import(`./mods/${dir}/info`);
    const mod:Mod={
      class:mod_class.default as ModBaseClass,
      identifier:{name:dir,id:info.id as string}
    };
    addMod(mod);
  }else{
    const mods=getMods();
    const mod=mods.find((mod)=>mod.identifier.name===request.repo);
    if (mod){
      deleteMod(mod);
    }
  }
  return c.text("ok");
}

export function reject_mod_request(c:Context){
  const id=c.req.param("id");
  deleteModRequest(id);
  return c.text("ok");
}
