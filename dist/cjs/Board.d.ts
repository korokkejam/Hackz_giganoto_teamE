import { Pos } from ".";
import { Piece } from "./Piece";
export interface Board {
    squares: Square[];
    size: {
        w: number;
        h: number;
    };
}
export interface Square {
    position: Pos;
    piece: Piece | null;
    image: string | undefined;
}
export declare function createSquare(x: number, y: number): Square;
export declare function createBoard(w: number, h: number): Board;
