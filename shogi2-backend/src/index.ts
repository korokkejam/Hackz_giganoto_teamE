import {Hono,Context,Next} from "hono";
import {serve} from "@hono/node-server";
import {cors} from "hono/cors";
import {boards} from "./config/board";

const app=new Hono();

const logger=async (c:Context,next:Next)=>{
  console.log(c.req.url);
  await next();
};

app.use("*",logger);
app.use("*",cors());

app.get("/board",(c:Context)=>{
  return c.json(boards[0]);
});

// app.get("/",(c:Context)=>{
//   return c.text("hello");
// });

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log("Server is running on http://localhost:3000")
})
