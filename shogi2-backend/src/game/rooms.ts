import { WSContext } from "hono/ws";

let rooms:{ws:WSContext[],id:string,gamemode:"survival"|"creative"}[]=[];
const setRooms=(r:{ws:WSContext[],id:string,gamemode:"survival"|"creative"}[])=>{
  rooms=r;
};

export {rooms,setRooms};
