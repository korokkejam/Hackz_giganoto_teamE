import {Mod, ModRequest} from "shogi2-types";
import { Game } from "./game";

interface State{
  mods:Mod[];
  games:Game[];
  password:string;
  mod_requests:ModRequest[];
}

const state:State={
  mods:[],
  games:[],
  password:crypto.randomUUID(),
  mod_requests:[]
};

console.log(`admin password is: ${state.password}`);

export const auth=(password:string)=>password===state.password;
export const getMods=()=>state.mods;
export const setMods=(mods:Mod[])=>{state.mods=mods};
export const addMod=(mod:Mod)=>{state.mods=[...state.mods,mod];};
export const deleteMod=(mod:Mod)=>{state.mods=state.mods.filter((m)=>m.identifier.id!==mod.identifier.id);};
export const getRooms=()=>state.games.map((game)=>game.client.room_name);
export const addGame=(game:Game)=>{state.games=[...state.games,game];};
export const getGame=(room_name:string)=>state.games.find((game)=>game.client.room_name===room_name);
export const deleteGame=(game:Game)=>{state.games=state.games.filter((g)=>g.id!==game.id);};
export const getModRequests=()=>state.mod_requests;
export const deleteModRequest=(id:string)=>{state.mod_requests=state.mod_requests.filter((r)=>r.id!==id);};
export const addModRequest=(r:ModRequest)=>{state.mod_requests.push(r);};
export const getModRequest=(id:string)=>state.mod_requests.find((r)=>r.id===id);
