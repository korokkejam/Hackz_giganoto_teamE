import { Event } from "../Event";
import { Piece, Position } from "../types";
export interface DeleteEventType {
    piece1: Piece;
    piece2: Piece;
    pos1: Position;
    pos2: Position;
}
export declare class DeleteEvent extends Event<DeleteEventType> {
    data: DeleteEventType;
    constructor(piece1: Piece, piece2: Piece, pos1: Position, pos2: Position, id: string);
}
