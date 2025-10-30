import { WSContext } from "hono/ws";

export type Client={ws1:WSContext|null,ws2:WSContext|null,room_name:string};
