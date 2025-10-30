import { Board, PieceType, Player } from "./index";
export interface GameData {
    board: Board;
    piece_types: PieceType[];
    turn: Player;
}
export declare function createGameData(w: number, h: number): GameData;
