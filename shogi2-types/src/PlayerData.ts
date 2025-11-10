import {Player,Piece} from "./index";

export class PlayerData{
  player:Player;
  captured_pieces:Piece[];
  constructor(player:Player){
    this.player=player;
    this.captured_pieces=[];
  }
};
