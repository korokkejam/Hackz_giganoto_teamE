import { Event } from "../Event";
import { Piece } from "../Piece";
export declare class CaptureEvent extends Event {
    type: string;
    piece: Piece;
    constructor(piece: Piece);
}
