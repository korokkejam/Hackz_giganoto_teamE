import { Event } from "../Event";
import { Piece } from "../types";
export interface MoveEventType {
    piece: Piece;
    before_pos: number[];
    after_pos: number[];
}
export declare class MoveEvent extends Event<MoveEventType> {
    data: MoveEventType;
    constructor(piece: Piece, before_pos: number[], after_pos: number[], id: string);
}
