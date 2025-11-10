import { Player } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class EndRequest extends Request {
    type: RequestType;
    to: Player | "both";
    importance: Importance;
    winner: Player;
    constructor(to: Player | "both", importance: Importance, winner: Player);
}
