import {Hono,Context,Next} from "hono";
import {cors} from "hono/cors";
import {createNodeWebSocket} from "@hono/node-ws";
import { accept_mod_request, admin_games, admin_login, check_room_name, connect, create_room, debug, enter_room, get_mod_requests, get_modlist, reject_mod_request, request_mod } from "./requests";
import { serve } from "@hono/node-server";
import { getLocalIpAddress } from "./utils";
import fs from "fs";
import {loadMods} from "./load";
import { setMods } from "./state";

const app=new Hono();
const {injectWebSocket,upgradeWebSocket}=createNodeWebSocket({app});

const logger=async (c:Context,next:Next)=>{
  console.log(c.req.url);
  await next();
};

app.use("*",logger);
app.use("*",cors());

app.get("/mod/list",get_modlist);
app.get("/room/check/:id",check_room_name);
app.get("/room/enter/:id",enter_room);
app.get("/room/connect/:id/:player",connect(upgradeWebSocket));
app.get("/debug/:id",debug);
app.get("/admin/login/:password",admin_login);
app.get("/admin/games",admin_games);
app.get("/admin/mods",get_mod_requests);
app.get("/admin/mods/accept/:id",accept_mod_request);
app.get("/admin/mods/reject/:id",reject_mod_request);
app.get("/admin/server/stop",(_c)=>process.exit());

app.post("/room/create",create_room);
app.post("/request/mods",request_mod);

fs.readdir("src/mods/",(_,d)=>{
  loadMods(d).then((mods)=>{
    setMods(mods);

    const ipAddress = getLocalIpAddress(true);
    const server=serve({ fetch: app.fetch, port: 3000 ,hostname:"0.0.0.0"}, () => {
      console.log(mods.map((mod)=>mod.identifier.id));
      console.log(`Server is running on http://${ipAddress}:3000`)
    });

    injectWebSocket(server);
  });
});
