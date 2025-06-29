import { Event } from "../Event";
import { board } from "../types";
export interface ChangeEventType {
    boards: board[];
}
export declare class ChangeEvent extends Event<ChangeEventType> {
    data: ChangeEventType;
    constructor(boards: board[]);
}
