import { Player } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class TurnRequest extends Request {
    to: Player | "both";
    type: RequestType;
    importance: Importance;
    player: Player;
    constructor(to: Player | "both", importance: Importance, player: Player);
}
