import {WSContext} from "hono/ws";
import GameProcess from "../game/board";

//部屋の情報
export type room={ws1:WSContext|undefined,ws2?:WSContext,id:string,gamemode:"survival"|"creative",game:GameProcess};
