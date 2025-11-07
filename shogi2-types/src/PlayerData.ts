import {Player,PieceType} from "./index";

export class PlayerData{
  player:Player;
  captured_pieces:PieceType[];
  constructor(player:Player){
    this.player=player;
    this.captured_pieces=[
      new PieceType( "王1", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王2", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王3", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王4", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王5", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王6", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王7", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王8", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
      new PieceType( "王9", { absolute:[], relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}] }, false),
    ];
  }
};
