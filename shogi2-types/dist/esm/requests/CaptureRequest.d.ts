import { Piece, Player } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class CaptureRequest extends Request {
    type: RequestType;
    to: Player | "both";
    importance: Importance;
    piece1: Piece;
    piece2: Piece;
    constructor(to: Player | "both", importance: Importance, piece1: Piece, piece2: Piece);
}
