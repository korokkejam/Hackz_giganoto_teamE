import { Event } from "../Event";
import { Piece, Position } from "../types";
export interface PromotionEventType {
    piece: Piece;
    pos: Position;
}
export declare class PromotionEvent extends Event<PromotionEventType> {
    data: PromotionEventType;
    constructor(piece: Piece, pos: Position, id: string);
}
