import { Event } from "../Event";
import { Piece, Position } from "../types";
export interface PromotionCheckEventType {
    piece: Piece;
    pos: Position;
    answer: boolean;
}
export declare class PromotionCheckEvent extends Event<PromotionCheckEventType> {
    data: PromotionCheckEventType;
    constructor(piece: Piece, pos: Position, answer: boolean, id: string);
}
