import { Event } from "./Event";
export type player = "player1" | "player2";
export type board = Square[][];
export interface PieceType {
    name: string;
    src: string | undefined;
    movable: {
        absolute: number[][];
        relative: number[][];
        func: string;
    };
    jumpable: boolean;
    promotion: PieceType | undefined;
    promotion_callback: string;
    promotion_msg: string[];
    king: boolean;
}
export interface Piece {
    id: string;
    owner: player;
    type: PieceType;
}
export interface Square {
    piece: Piece | null;
}
export interface Game {
    boards: Square[][][];
    turn: player;
    player1_current_board: number;
    player2_current_board: number;
    player1_point: number;
    player2_point: number;
    player1_redbull: number;
    player2_redbull: number;
    history: Move[];
    player1_storage: PieceType[];
    player2_storage: PieceType[];
    pieces: PieceType[];
}
export interface Request<T extends Event | any> {
    head: string;
    content: T;
    sender?: string;
}
export interface Position {
    x: number;
    y: number;
}
export interface Move {
    pieceId: string;
    from: Position | null;
    to: Position | null;
}
export interface CommandResult<T = undefined> {
    data?: T;
}
