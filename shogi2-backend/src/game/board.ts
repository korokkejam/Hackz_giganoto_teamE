import "./rooms";
import { WSContext } from "hono/ws";
import {Game,Request,board} from "shogi2-types";
import { Event } from "shogi2-types/dist/Event";
import { pieces } from "../config/piece";

class GameProcess{
  game:Game;
  constructor(boards:board[]){
    this.game={
      boards,
      turn:"player1",
      player1_current_board:0,
      player2_current_board:0,
      player1_point:0,
      player2_point:0,
      player1_redbull:0,
      player2_redbull:0,
      history:[],
      player1_storage:[],
      player2_storage:[],
      pieces:[...pieces]
    };
  }
  update(e:MessageEvent,_ws1:WSContext,_ws2:WSContext){
    const d:Request<Event>=JSON.parse(e.data);
    switch (d.head){
    }
  }
}

export default GameProcess;
