import {Hono,Context,Next} from "hono";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";
import {boards} from "./config/board";
import {createNodeWebSocket} from "@hono/node-ws";
import {rooms,setRooms} from "./game/rooms";
import Data from "./game/board";
import {request} from "./types/global";

const app=new Hono();

const {injectWebSocket,upgradeWebSocket}=createNodeWebSocket({app});

const logger=async (c:Context,next:Next)=>{
  console.log(c.req.url);
  await next();
};

app.use("*",logger);
app.use("*",cors());

app.get("/room/check/:id",(c:Context)=>{
  const id=c.req.param("id");
  return c.text(rooms.map((room)=>room.id).includes(id)?"yes":"no");
});

app.get("/room/create/:id",upgradeWebSocket((c:Context)=>{
  const id=c.req.param("id");
  console.log(id);
  const data=new Data(boards.map((board)=>board.map((row)=>row.map((s)=>{return{...s}}))));
  return {
    onMessage(event,ws){
      const room=rooms.find((room)=>room.id===id);
      if (!room){
        return;
      }
      room.data.change();
      room.data.update(event,room.ws);
    },
    onOpen(event,ws){
      rooms.push({ws:[ws],id,gamemode:"survival",data});
      console.log(rooms);
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
      if (!room){
        return;
      }
      room.data.change();
      room.data.update(event,room.ws);
    },
    onOpen(event,ws){
      if (!room){
        return;
      }
      const d:request={head:"ready",content:room.data.data};
      room.ws[0].send(JSON.stringify(d));
      ws.send(JSON.stringify(d));
      room.ws.push(ws);
      console.log(rooms);
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
