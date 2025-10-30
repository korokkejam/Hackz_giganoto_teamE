import {Mod} from "shogi2-types";
import { Game } from "./game";

interface State{
  mods:Mod[];
  games:Game[];
}

const state:State={
  mods:[],
  games:[]
};

export const getMods=()=>state.mods;
export const setMods=(mods:Mod[])=>{state.mods=mods};
export const addMod=(mod:Mod)=>{state.mods=[...state.mods,mod];};
export const deleteMod=(mod:Mod)=>{state.mods=state.mods.filter((m)=>m.identifier.id===mod.identifier.id);};
export const getRooms=()=>state.games.map((game)=>game.client.room_name);
export const addGame=(game:Game)=>{state.games=[...state.games,game];};
export const getGame=(room_name:string)=>state.games.find((game)=>game.client.room_name===room_name);
export const deleteGame=(game:Game)=>{state.games=state.games.filter((g)=>g.id!==game.id);};
