import { Event } from "../Event";
export declare class AnswerEvent extends Event {
    type: string;
    key: string;
    id: string;
    constructor(id: string, key: string);
}
