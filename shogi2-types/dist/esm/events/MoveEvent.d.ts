import { Event } from "../Event";
import { Piece, Position } from "../types";
export interface MoveEventType {
    piece: Piece;
    before_pos: Position;
    after_pos: Position;
}
export declare class MoveEvent extends Event<MoveEventType> {
    data: MoveEventType;
    constructor(piece: Piece, before_pos: Position, after_pos: Position, id: string);
}
