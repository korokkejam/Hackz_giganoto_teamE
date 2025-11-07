import { Board, PieceType, Player, PlayerData, createBoard } from "./index";

export interface GameData{
  board:Board;
  piece_types:PieceType[];
  turn:Player;
  promotion_line:number;
  player1:PlayerData;
  player2:PlayerData;
};

export function createGameData(w:number,h:number):GameData{
  return {
    board:createBoard(w,h),
    piece_types:[],
    turn:"player1",
    promotion_line:3,
    player1:new PlayerData("player1"),
    player2:new PlayerData("player2")
  };
}
