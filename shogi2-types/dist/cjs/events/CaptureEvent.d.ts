import { Event } from "../Event";
import { Piece, Position } from "../types";
export interface CaptureEventType {
    piece1: Piece;
    piece2: Piece;
    pos1: Position;
    pos2: Position;
}
export declare class CaptureEvent extends Event<CaptureEventType> {
    data: CaptureEventType;
    constructor(piece1: Piece, piece2: Piece, pos1: Position, pos2: Position, id: string);
}
