import { Event as Shogi2Event, Player, StartRequest, StartEvent } from "shogi2-types";
import { WSContext } from "hono/ws";
import { deleteGame } from "./state";
import { Game } from "./game";

export function update(game:Game|undefined,player:Player){
  return (event:MessageEvent,_ws:WSContext)=>{
    if (!game){
      return;
    }
    const request:Shogi2Event=JSON.parse(event.data);
    game.update(request,player);
  };
}

export function accept_player(game:Game|undefined,player:Player){
  const request=(new StartRequest("both","exclude")).json();
  return (_event:Event,ws:WSContext)=>{
    if (!game){
      ws.close(1008);
      return;
    }
    if (player==="player1"){
      if (game.client.ws1){
        ws.close(1008);
        return;
      }
      game.client.ws1=ws;
    }else{
      if (game.client.ws2){
        ws.close(1008);
        return;
      }
      game.client.ws2=ws;
    }
    if (game.client.ws1 && game.client.ws2){
      game.client.ws1.send(request);
      game.client.ws2.send(request);
      const event=new StartEvent();
      game.update(event,"player1");
      console.log(`game start at ${game.client.room_name}`);
      console.log(`mods being used is ${game.mods.map((mod)=>mod.identifier.id)}`);
    }
  };
};

export function close_room(game:Game|undefined,player:Player){
  return (_event:CloseEvent)=>{
    if (!game){
      return;
    }
    if (player==="player1"){
      game.client.ws1=null;
    }else if (player==="player2"){
      game.client.ws2=null;
    }
    if (!game.client.ws1 && !game.client.ws2){
      deleteGame(game);
    }
  };
};
