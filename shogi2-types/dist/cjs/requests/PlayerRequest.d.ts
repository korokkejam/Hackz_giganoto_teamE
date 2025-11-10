import { Player, PlayerData } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class PlayerRequest extends Request {
    type: RequestType;
    to: Player | "both";
    importance: Importance;
    data: PlayerData;
    constructor(to: Player | "both", importance: Importance, data: PlayerData);
}
