import { Game, board } from "./types";
import { WSContext } from "hono/ws";
export declare abstract class Process {
    abstract game: Game;
    constructor(boards: board[]);
    event(_e: MessageEvent, _ws: WSContext[]): void;
}
