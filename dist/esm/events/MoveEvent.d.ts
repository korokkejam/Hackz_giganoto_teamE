import { Pos } from "..";
import { Event } from "../Event";
import { Piece } from "../Piece";
export declare class MoveEvent extends Event {
    type: string;
    piece: Piece;
    to: Pos;
    constructor(piece: Piece, to: Pos);
}
