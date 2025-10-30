import { Board, PieceType, Player, createBoard } from "./index";

export interface GameData{
  board:Board;
  piece_types:PieceType[];
  turn:Player;
};

export function createGameData(w:number,h:number):GameData{
  return {
    board:createBoard(w,h),
    piece_types:[],
    turn:"player1"
  };
}
