import {Hono,Context,Next} from "hono";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";
import {boards} from "./config/board";
import {createNodeWebSocket} from "@hono/node-ws";
import {rooms,setRooms} from "./game/rooms";
import Data from "./game/board";

const app=new Hono();

const {injectWebSocket,upgradeWebSocket}=createNodeWebSocket({app});

const logger=async (c:Context,next:Next)=>{
  console.log(c.req.url);
  await next();
};

app.use("*",logger);
app.use("*",cors());

app.get("/board",(c:Context)=>{
  return c.json(boards[0]);
});

app.get("/room/check/:id",(c:Context)=>{
  const id=c.req.param("id");
  return c.text(rooms.map((room)=>room.id).includes(id)?"yes":"no");
});

app.get("/room/create/:id",upgradeWebSocket((c:Context)=>{
  const id=c.req.param("id");
  console.log(id);
  const data=new Data(boards);
  return {
    onMessage(event,ws){
      console.log(event.data);
    },
    onOpen(event,ws){
      rooms.push({ws:[ws],id,gamemode:"survival",data});
    },
    onClose(event){
      const room=rooms.find((room)=>room.id===id);
      room?.ws.map((ws)=>ws.send("disconnected"));
      setRooms(rooms.filter((room)=>room.id!==id));
      console.log(event.code);
      console.log(event.reason);
    },
    onError(event){
      console.log(event);
    }
  };
}));

app.get("/room/enter/:id",upgradeWebSocket((c:Context)=>{
  const id=c.req.param("id");
  const room=rooms.find((room)=>room.id===id);
  return {
    onMessage(event,ws){
    },
    onOpen(event,ws){
      room?.ws[0].send("ready");
      room?.ws.push(ws);
    },
    onClose(event){
      const room=rooms.find((room)=>room.id===id);
      room?.ws.map((ws)=>ws.send("disconnected"));
      setRooms(rooms.filter((room)=>room.id!==id));
      console.log(event.code);
      console.log(event.reason);
    },
    onError(event){
      console.log(event);
    }
  };
}));

const server=serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Server is running on http://localhost:3000")
});

injectWebSocket(server);
