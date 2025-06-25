import { Game, Request } from "./types";
import { Event } from "./Event";
export declare abstract class ModBase {
    protected game: Game;
    constructor(game: Game);
    event(request: Request<Event>): void;
}
