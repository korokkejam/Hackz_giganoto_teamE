import {Hono,Context,Next} from "hono";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";
import {boards} from "./config/board";
import {createNodeWebSocket} from "@hono/node-ws";
import {rooms, setRooms} from "./game/rooms";
import GameProcess from "./game/board";
import {Request,Square, StartEvent} from "shogi2-types";
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
  const data=new GameProcess(boards.map((board:Square[][])=>board.map((row)=>row.map((s)=>{return{...s}}))));
  return {
    onMessage(event,_ws){
      const room=rooms.find((room)=>room.id===id);
      if (!room || !room.ws1 || !room.ws2){
        return;
      }
      room.game.update(event,room.ws1,room.ws2);
    },
    onOpen(_event,ws){
      rooms.push({ws1:ws,id,gamemode:"survival",game:data});
    },
    onClose(_event){
      const room=rooms.find((room)=>room.id===id);
      if (!room){
        return;
      }
      const request:Request<any>={head:"close",content:""};
      room.ws1?.send(JSON.stringify(request));
      room.ws2?.send(JSON.stringify(request));
      setRooms(rooms.filter((r)=>r.id!==room.id));
      console.log(room);
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
      if (!room || !room.ws1 || !room.ws2){
        return;
      }
      room.game.update(event,room.ws1,room.ws2);
    },
    onOpen(_event,ws){
      if (!room || !room.ws1){
        return;
      }
      room.ws2=ws;
      const d:Request<any>={head:"ready",content:room.game.game};
      const event:Request<StartEvent>={head:"event",content:{type:"start",data:{},id:crypto.randomUUID()}};
      room.game.event(event,room.ws1,room.ws2);
      room.ws1.send(JSON.stringify(d));
      room.ws2.send(JSON.stringify(d));
    },
    onClose(_event){
      const room=rooms.find((room)=>room.id===id);
      if (!room){
        return;
      }
      const request:Request<any>={head:"close",content:""};
      room.ws1?.send(JSON.stringify(request));
      room.ws2?.send(JSON.stringify(request));
      setRooms(rooms.filter((r)=>r.id!==room.id));
      console.log(room);
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
      console.log(mods);
      console.log("Server is running on http://localhost:3000")
    });

    injectWebSocket(server);
  });
});
