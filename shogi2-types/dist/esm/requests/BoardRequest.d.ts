import { Board, Player } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class BoardRequest extends Request {
    type: RequestType;
    to: Player | "both";
    board: Board;
    importance: Importance;
    constructor(to: Player | "both", board: Board, importance: Importance);
}
