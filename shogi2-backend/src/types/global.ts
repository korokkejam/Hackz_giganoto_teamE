import {WSContext} from "hono/ws";
import Data from "../game/board";

//部屋の情報
export type room={ws:WSContext[],id:string,gamemode:"survival"|"creative",data:Data};
