import { Event } from "./Event";
import { ChatEventType } from "./events/ChatEvent";
import { UIEventType } from "./events/UIEvent";
import { ReturnRequest } from "./ModBase";
export type player = "player1" | "player2";
export type board = Square[][];
export interface File {
    content: string;
    mimetype: string;
    id: string;
}
export interface PieceType {
    name: string;
    id: string;
    src?: string;
    color?: string;
    movable: {
        absolute: number[][];
        relative: number[][];
        func: string[];
    };
    jumpable: boolean;
    promotion?: PieceType;
    promotion_callback: string;
    promotion_msg: string[];
    promotion_check?: boolean;
    king: boolean;
}
export interface Piece {
    id: string;
    owner: player;
    type: PieceType;
}
export interface Effect {
    src: string;
    x?: number | string;
    y?: number | string;
    width?: number | string;
    height?: number | string;
}
export interface Square {
    piece: Piece | null;
    effect?: Effect;
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
    history: {
        boards: Square[][][];
        id: string;
    }[];
    boards_id: string;
    player1_storage: Piece[];
    player2_storage: Piece[];
    pieces: PieceType[];
    messages: ChatEventType[];
    requests: ReturnRequest[];
    ui1: UIEventType;
    ui2: UIEventType;
    mods: {
        name: string;
        load: boolean;
    }[];
}
export interface Request<T extends Event | any> {
    head: string;
    content: T;
    sender?: player;
}
export interface Position {
    x: number;
    y: number;
    z: number;
}
export interface Move {
    pieceId: string;
    from: Position | null;
    to: Position | null;
}
