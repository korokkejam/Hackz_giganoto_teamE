import { Player } from "..";
import { Importance, Request, RequestType } from "../Request";
export declare class QuestionRequest extends Request {
    to: Player | "both";
    type: RequestType;
    importance: Importance;
    content: string;
    id: string;
    choices: {
        display: string;
        key: string;
    }[];
    constructor(to: Player | "both", importance: Importance, content: string, choices: {
        display: string;
        key: string;
    }[]);
}
