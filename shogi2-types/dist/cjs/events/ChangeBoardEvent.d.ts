import { Event } from "../Event";
import { board } from "../types";
export interface ChangeBoardEventType {
    boards: board[];
}
export declare class ChangeBoardEvent extends Event<ChangeBoardEventType> {
    data: ChangeBoardEventType;
    constructor(boards: board[], id: string);
}
