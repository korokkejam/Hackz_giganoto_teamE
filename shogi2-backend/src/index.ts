import {Hono,Context,Next} from "hono";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";
import {boards} from "./config/board";
import {createNodeWebSocket} from "@hono/node-ws";
import { WSContext } from "hono/ws";

const app=new Hono();

const clients=new Set<{ws:WSContext,id:String}>();

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

app.get("/match/:id",upgradeWebSocket((c:Context)=>{
  const id=c.req.param("id");
  return {
    onMessage(event,ws){
      console.log(event.data);
      clients.add({ws,id});
    },
    onOpen(event,ws){
      ws.send("hello");
    },
    onClose(event){
      console.log(event.code);
      console.log(event.reason);
    },
    onError(event){
      console.log(event);
    }
  };
}));

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Server is running on http://localhost:3000")
});
