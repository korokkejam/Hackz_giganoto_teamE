import { Board, Event } from "../index";
export declare class BoardEvent extends Event {
    type: string;
    board: Board;
    constructor(board: Board);
}
