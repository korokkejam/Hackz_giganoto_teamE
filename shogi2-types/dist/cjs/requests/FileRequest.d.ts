import { Player } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class FileRequest extends Request {
    to: Player | "both";
    type: RequestType;
    importance: Importance;
    name: string;
    content: string;
    filetype: string;
    constructor(to: Player | "both", importance: Importance, name: string, content: string, filetype: string);
}
