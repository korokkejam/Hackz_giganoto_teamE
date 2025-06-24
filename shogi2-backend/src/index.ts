import {Hono,Context,Next} from "hono";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";
import {boards} from "./config/board";
import {createNodeWebSocket} from "@hono/node-ws";
import {rooms} from "./game/rooms";
import Data from "./game/board";
import {Request,Square} from "shogi2-types";
import fs from "fs";
import {setMods,loadMods} from "./load";

const app=new Hono();

const {injectWebSocket,upgradeWebSocket}=createNodeWebSocket({app});

const logger=async (c:Context,next:Next)=>{
  console.log(c.req.url);
  await next();
};

app.use("*",logger);
app.use("*",cors());

app.get("/test",(c:Context)=>{
  return c.text("hello");
});

app.get("/room/check/:id",(c:Context)=>{
  const id=c.req.param("id");
  return c.text(rooms.map((room)=>room.id).includes(id)?"yes":"no");
});

app.get("/room/create/:id",upgradeWebSocket((c:Context)=>{
  const id=c.req.param("id");
  let data=new Data(boards.map((board:Square[][])=>board.map((row)=>row.map((s)=>{return{...s}}))));
  return {
    onMessage(event,_ws){
      const room=rooms.find((room)=>room.id===id);
      if (!room){
        return;
      }
      room.data.change();
      room.data.update(event,room.ws);
    },
    onOpen(_event,ws){
      rooms.push({ws:[ws],id,gamemode:"survival",data});
    },
    onClose(event){
      console.log(event);
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
    onMessage(event,_ws){
      if (!room){
        return;
      }
      room.data.change();
      room.data.update(event,room.ws);
    },
    onOpen(_event,ws){
      if (!room){
        return;
      }
      const d:Request={head:"ready",content:room.data.data};
      room.ws[0].send(JSON.stringify(d));
      ws.send(JSON.stringify(d));
      room.ws.push(ws);
    },
    onClose(event){
      console.log(event);
    },
    onError(event){
      console.log(event);
    }
  };
}));

fs.readdir("src/mods/",(_,d)=>{
  loadMods(d).then((mods)=>{
    setMods(mods);

    const server=serve({ fetch: app.fetch, port: 3000 }, () => {
      console.log("Server is running on http://localhost:3000")
    });

    injectWebSocket(server);
  });
});
