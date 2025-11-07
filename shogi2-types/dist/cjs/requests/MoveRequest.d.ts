import { Player, Pos } from "..";
import { Piece } from "../Piece";
import { Importance, Request, RequestType } from "../Request";
export declare class MoveRequest extends Request {
    type: RequestType;
    to: Player | "both";
    importance: Importance;
    piece: Piece;
    position2: Pos;
    constructor(to: Player | "both", importance: Importance, piece: Piece, position2: Pos);
}
