import { Player, Square } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class SquareRequest extends Request {
    type: RequestType;
    to: Player | "both";
    importance: Importance;
    square: Square;
    constructor(to: Player | "both", importance: Importance, square: Square);
}
