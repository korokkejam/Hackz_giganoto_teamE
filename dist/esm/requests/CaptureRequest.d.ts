import { Piece, Player } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class CaptureRequest extends Request {
    type: RequestType;
    to: Player | "both";
    importance: Importance;
    player1_pieces: Piece[];
    player2_pieces: Piece[];
    constructor(to: Player | "both", importance: Importance, player1_pieces: Piece[], player2_pieces: Piece[]);
}
