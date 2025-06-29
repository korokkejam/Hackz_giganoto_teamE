import { Event } from "../Event";
import { Piece, Position } from "../types";
export interface DropEventType {
    piece: Piece;
    pos: Position;
}
export declare class DropEvent extends Event<DropEventType> {
    data: DropEventType;
    constructor(piece: Piece, pos: Position, id: string);
}
