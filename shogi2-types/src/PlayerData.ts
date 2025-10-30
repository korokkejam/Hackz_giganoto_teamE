import {Player,PieceType} from "./index";

export class PlayerData{
  player:Player;
  captured_pieces:PieceType[];
  constructor(player:Player){
    this.player=player;
    this.captured_pieces=[];
  }
};
