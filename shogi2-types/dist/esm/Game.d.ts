import { Board, PieceType, Player, PlayerData } from "./index";
export interface GameData {
    board: Board;
    piece_types: PieceType[];
    turn: Player;
    promotion_line: number;
    player1: PlayerData;
    player2: PlayerData;
}
export declare function createGameData(w: number, h: number): GameData;
