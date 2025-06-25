import { Game } from "./types";
export declare abstract class ModConfig<T = undefined> {
    abstract config: T;
    protected game: Game;
    constructor(game: Game);
}
