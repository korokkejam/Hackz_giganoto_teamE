import { Importance, Player, Request, RequestType } from "../index";
export declare class StartRequest extends Request {
    type: RequestType;
    to: Player | "both";
    importance: Importance;
    constructor(to: Player | "both", importance: Importance);
}
